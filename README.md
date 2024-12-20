ItemSimulator Project
개발 기간
24/12/16~24/11/20 (5일)

코드 구조
assets/: 프로젝트에서 에셋 파일들이 저장되는 폴더입니다.

public/: 클라이언트 측 파일들이 위치한 폴더로, 사용자에게 제공되는 정적 리소스들을 포함합니다.

src/: 서버 측 파일들이 들어 있는 폴더로, 주로 비즈니스 로직과 데이터 검증을 담당합니다.
>>
handlers/
handlers 폴더에는 클라이언트에서 전송하는 핸들러 ID에 따라 처리하는 함수들이 포함되어 있습니다. 각 함수는 클라이언트의 요청을 적절히 처리하여 응답을 반환합니다.

model/
model 폴더는 데이터 모델을 정의하는 파일들이 포함되어 있습니다. 여기에는 stage.model.js, score.model.js, user.model.js와 같은 파일들이 있습니다.


사용 라이브러리
express, socket.io, uuid, nodemon, prettier

핵심기능
클라이언트 요청 처리: handlers 폴더 내의 함수들은 클라이언트에서 전송하는 요청을 처리하고, 해당 요청에 대한 적절한 응답을 반환합니다. 이를 통해 클라이언트와 서버 간의 원활한 데이터 통신을 지원합니다.
데이터 모델링 : 데이터를 관리하는 기능을 구현하여, 게임의 점수 및 사용자 정보, 스테이지 정보를 처리합니다.
실시간 통신:socket.io를 활용하여 클라이언트와 서버 간의 실시간 데이터 전송을 구현하며, 게임의 상태 업데이트, 사용자 행동 반영 등을 즉각적으로 처리합니다.