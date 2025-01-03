import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStage = 1000; // 현재 스테이지 초기값 설정

  stageAsset = {
    name: 'stage',
    version: '1.0.0',
    data: [
      { id: 1000, score: 0, scorePerSecond: 1 },
      { id: 1001, score: 200, scorePerSecond: 2 },
      { id: 1002, score: 400, scorePerSecond: 4 },
      { id: 1003, score: 600, scorePerSecond: 4 },
      { id: 1004, score: 800, scorePerSecond: 6 },
      { id: 1005, score: 1000, scorePerSecond: 6 },
      { id: 1006, score: 1200, scorePerSecond: 8 },
      { id: 1007, score: 1400, scorePerSecond: 8 },
      { id: 1008, score: 1600, scorePerSecond: 10 },
    ],
  };

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    //
    const currentStageData = this.stageAsset.data.find((stage) => stage.id === this.currentStage);
    const scorePerSecond = currentStageData ? currentStageData.scorePerSecond : 0;
    const goalScore = currentStageData ? currentStageData.score : 0;

    // 점수 증가
    this.score += scorePerSecond * (deltaTime / 2000); // deltaTime을 초 단위로 변환하여 점수 증가

    // 스코어가 현재 스테이지의 도달 점수를 초과할 때 이벤트 전송
    if (Math.floor(this.score) >= goalScore && this.stageChange) {
      this.stageChange = false; // 중복 전송 방지
      console.log('Current Stage before sending:', this.currentStage);
      sendEvent(11, { currentStage: this.currentStage, targetStage: this.currentStage + 1 });
      this.currentStage += 1;
    }

    // 스코어가 도달 점수를 초과하면 stageChange를 true로 설정
    if (Math.floor(this.score) < goalScore) {
      this.stageChange = true; // 다음 스테이지 이벤트를 가능하게 함
    }
  }
  getItem(itemId) {
    let points = 0; // 아이템에 따른 점수를 저장할 변수

    // 아이템 ID에 따라 점수를 설정
    switch (itemId) {
      case 1:
        points = 10; // 아이템 1의 점수
        break;
      case 2:
        points = 20; // 아이템 2의 점수
        break;
      case 3:
        points = 30; // 아이템 3의 점수
        break;
      case 4:
        points = 40; // 아이템 4의 점수
        break;
      default:
        console.log('알 수 없는 아이템입니다.');
        return; // 알 수 없는 아이템일 경우 함수 종료
    }

    // 현재 점수에 획득한 점수를 추가
    this.score += points;

    sendEvent(4, { itemId, itemPoint: points, currentStage: this.currentStage - 1 });
  }

  reset() {
    this.score = 0;
    this.currentStage = 1000;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
