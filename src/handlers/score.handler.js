import { getGameAssets } from '../init/assets.js';
import { getUsers } from '../models/user.model.js';

export const getItem = (uuid, payload) => {
  const {} = getGameAssets();
  //   const itemId = payload.itemId;

  try {
    // 유저 목록에서 uuid로 유저 찾기
    const user = getUsers().find((user) => user.uuid === uuid);

    // 유저가 존재하는지 확인
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }

    //=========== 스테이지 별 아이템 생성 검증 ===========
    const unlockData = itemUnlocks.data.find((data) => data.stage_id === currentStage);
    if (!unlockData) {
      return { status: 'error', message: 'Invalid stage' };
    }
    console.log(unlockData.item_id);
    console.log(typeof unlockData.item_id[0]);

    if (!unlockData.item_id.includes(itemId)) {
      return {
        status: 'error',
        message: `${currentStage} 스테이지에서 획득할 수 있는 아이템이 아닙니다. ITEMID: ${itemId} `,
      };
    }

    //=========== 아이템 별 획득 점수 검증 ============
    const itemData = items.data.find((item) => item.id === itemId);
    if (!itemData) {
      return { status: 'error', message: '아이템이 존재하지 않습니다.' };
    }

    if (itemData.score !== itemPoint) {
      return {
        status: 'error',
        message: `전송된 점수 ${itemPoint}와 아이템의 점수 ${itemData.score}가 일치하지 않습니다.`,
      };
    }

    // 아이템 추가 처리
    addUserItems(user.socketId, itemId); // 아이템 수를 증가시킴

    return { status: 'success', message: `${itemId}번 아이템을 획득하였습니다.` };
  } catch (error) {
    console.error('Error in getItem handler:', error);
    return { status: 'error', message: '오류 발생' };
  }
};
