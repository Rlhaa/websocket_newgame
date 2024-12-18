const scores = {};
// uuid를 통해 특정 사용자의 점수 저장
export const saveScore = (uuid, score) => {
  scores[uuid] = score; // uuid를 키로 사용하여 점수를 저장
};

export const getScore = (uuid) => {
  return scores[uuid]; // uuid에 해당하는 점수를 반환
};
// uuid를 통해 기존 점수 삭제 > 게임 다시 시작할 때 쓸수 있는데
// 이미 웹에서 되고 있긴 한데
export const removeScore = (uuid) => {
  delete scores[uuid]; // uuid에 해당하는 점수를 삭제
};

// export const getAllScores = () => {
//   return Object.entries(scores); // scores 객체의 키-값 쌍을 배열로 반환
// };
