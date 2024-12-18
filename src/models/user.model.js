// src/models/user.model.js
const users = [];

/*
users = [
 { uuid: 1; socketId: 1; items: {1: 10, 2: 3, 3: 4} },
 { uuid: 2; socketId: 2; },
 { uuid: 3; socketId: 3; },
]
*/

// 서버 메모리에 유저의 세션(소켓ID)을 저장
// 이때 유저는 객체 형태로 저장
// { uuid: string; socketId: string; };
export const addUser = (user) => {
  users.push(user);
};

export const addUserItems = (socketId, itemId) => {
  // 1. 배열에서 socketId의 객체를 찾아야한다.
  const index = users.findIndex((user) => {
    return user.socketId === socketId;
  });

  // 2. 아이템 id - 즉 key가 있는지 확인하고 없으면 1을 넣고
  // 키가 이미 있다면 +1을한다.
  if (!(itemId in users[index].items)) {
    users[index].items[itemId] = 1;
  } else {
    console.log('test:', users[index].items[itemId]);
    users[index].items[itemId] += 1;
  }

  console.log('users: ', users);
};

// 전체 유저 조회
export const getUsers = () => {
  return users;
};

export const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
