import Item from './Item.js';

class ItemController {
  INTERVAL_MIN = 5000;
  INTERVAL_MAX = 12000;

  nextInterval = null;
  items = [];

  unlockItem = {
    name: 'item_unlock',
    version: '1.0.0',
    data: [
      { id: 101, stage_id: 1000, item_id: [1, 2] },
      { id: 201, stage_id: 1001, item_id: [1, 2] },
      { id: 301, stage_id: 1002, item_id: [1, 2] },
      { id: 401, stage_id: 1003, item_id: [1, 2, 3] },
      { id: 501, stage_id: 1004, item_id: [2, 3] },
      { id: 601, stage_id: 1005, item_id: [2, 3] },
      { id: 701, stage_id: 1006, item_id: [2, 3, 4] },
      { id: 801, stage_id: 1007, item_id: [2, 3, 4] },
      { id: 901, stage_id: 1008, item_id: [3, 4] },
    ],
  };
  constructor(ctx, itemImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.itemImages = itemImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextItemTime();
  }

  setNextItemTime() {
    this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN, this.INTERVAL_MAX);
    console.log('Next Item Time Set:', this.nextInterval); // 디버깅 로그
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // currentStage를 매개변수로 받도록 수정
  createItem(currentStage) {
    // unlockItem.data 에서 currentStage의 대한 아이템 언락 정보 찾기
    const unlockInfo = this.unlockItem.data.find(
      (unlockInfo) => unlockInfo.stage_id === currentStage,
    );

    if (!unlockInfo) {
      console.log('정보를 불러올 수 없습닏다.', currentStage); // 확인용
      return;
    }
    // 불러온 unlockInfo의 item_id베열을 itemIds로 선언
    const itemIds = unlockInfo.item_id;
    // 배열에서 랜덤으로 선택
    const index = this.getRandomNumber(0, itemIds.length - 1);
    const selectedItemId = itemIds[index];

    console.log('Selected Item ID:', selectedItemId); // 확인용

    // 선택된 아이템 정보 가져오기
    const itemInfo = this.itemImages[selectedItemId - 1]; // 아이템 ID가 1부터 시작한다고 가정
    const x = this.canvas.width * 1.5;
    const y = this.getRandomNumber(10, this.canvas.height - itemInfo.height);

    const item = new Item(
      this.ctx,
      itemInfo.id,
      x,
      y,
      itemInfo.width,
      itemInfo.height,
      itemInfo.image,
    );
    // 생성된 아이템 배열에 추가
    this.items.push(item);
  }

  update(gameSpeed, deltaTime, currentStage) {
    if (this.nextInterval <= 0) {
      this.createItem(currentStage); // currentStage를 인자로 전달
      this.setNextItemTime();
    }

    this.nextInterval -= deltaTime;

    this.items.forEach((item) => {
      item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
    });

    this.items = this.items.filter((item) => item.x > -item.width);
  }

  draw() {
    this.items.forEach((item) => item.draw());
  }

  collideWith(sprite) {
    const collidedItem = this.items.find((item) => item.collideWith(sprite));
    if (collidedItem) {
      this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height);
      return {
        itemId: collidedItem.id,
      };
    }
  }

  reset() {
    this.items = [];
  }
}

export default ItemController;
