// gameAssets.js
import fs from 'fs'; // 파일 시스템과 상호작용하기 위한 Node.js의 내장모듈
import path from 'path'; // 파일 및  디렉토리 경로를 다루기 위한 Node.js 내장모듈
import { fileURLToPath } from 'url'; // url 문장열을 파일시스템 경로로 변환하는 함수

// import.meta.url은 현재 모듈의 URL을 나타내는 문자열
// fileURLToPath을 사용해서 URL 문자열을 파일 시스템의 절대경로로 변환, __filename 변수에 저장
const __filename = fileURLToPath(import.meta.url);
// 주어진 파일경로인 __filename에서 디렉토리 경로만 추출, __dirname 변수에 저장
const __dirname = path.dirname(__filename);
// path.join()을 사용해 __dirname과 '../../assets를 결합, 기본경로 설정
// 현재 assets 디렉토리를 가맄키고  있음
// >> 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../../assets');

// 디렉토리? - 파일이나 다른 디렉토리를 포함할 수 있는 단위 > 걍 폴더임
// 모듈 URL? - import.meta.url을 사용하면 현재 모듈의 URL을 가져온다
// >> 이 URL을 파일의 절대경로로 변환하여 모듈의 위치를 참조할 수 있게된다.
// 절대경로? - 특정 파일, 폴더의 위치를 최상위 부터 시작항여 전체경로로 나타낸 것
// 항상 동일한 위치를 가르키기 위해 사용?

// gameAssets 를 전역변수로 선언
let gameAssets = {};

// 파일 읽는 함수
// 비동기 병렬로 파일을 읽는다 >> 한번에 여러개 읽는다
const readFileAsync = (filename) => {
  //비동기 병렬 처리를 위해  fs 메서드에 Promise를 적용
  // 매개변수 filename과 basePath 결
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // 에러 없다면 데이터를  json형태로 변환 후 리턴\
      resolve(JSON.parse(data));
    });
  });
};

// assets 을 로드하는 역할의 함수 정의
export const loadGameAssets = async () => {
  try {
    //  Promise.all 메서드를 사용하여 여러 비동기 작업을 동시에 실행
    // 3개의 에셋 불러오는 작업을 병렬로 진행
    const [stages, items, itemUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);
    // 불러온 에셋을 객체에 저장
    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch (error) {
    throw new Error('Failed to load game assets: ' + error.message);
  }
};
// 게임에셋에 접근할 수 있도록 get 함수 생성
export const getGameAssets = () => {
  return gameAssets;
};
