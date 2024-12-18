import { getGameAssets } from '../init/assets.js';
import { getUsers, addUserItems } from '../models/user.model.js';

export const getItem = (uuid, payload) => {
  const { items } = getGameAssets();
  const itemId = payload.itemId;

  console.log(`Received itemId: ${itemId}`);
  try {
    // 유저 목록에서 uuid로 유저 찾기
    const user = getUsers().find((user) => user.uuid === uuid);

    // 유저가 존재하는지 확인
    if (!user) {
      return { status: 'error', message: 'User not found' };
    }

    // 들어온 아이템 id가 에셋에 있는지 확인
    let existItem = false; // 아이템 존재 여부 플래그 초기화
    for (let i = 0; i < items.data.length; i++) {
      if (items.data[i].id === itemId) {
        existItem = true; // 아이템이 존재하면 플래그를 true로 설정
        break; // 아이템을 찾았으므로 루프 종료
      }
    }

    // 아이템 추가 처리
    addUserItems(user.socketId, itemId); // 아이템 수를 증가시킴

    return { status: 'success', message: `${itemId}번 아이템을 획득하였습니다.` };
  } catch (error) {
    console.error('Error in getItem handler:', error);
    return { status: 'error', message: '오류 발생' };
  }
};
