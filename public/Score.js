import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  currentStage = 1000; // 현재 스테이지 초기값 설정

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.01;

    // 스코어가 100의 배수일 때, stageChange가 true인 경우 이벤트 전송
    if (Math.floor(this.score) % 100 === 0 && this.stageChange) {
      this.stageChange = false; // 중복 전송 방지
      sendEvent(11, { currentStage: this.currentStage, targetStage: this.currentStage + 1 });
      this.currentStage += 1; // 스테이지 업데이트
    }

    // 스코어가 100을 초과하고 stageChange가 false일 때 다시 true로 설정
    if (Math.floor(this.score) % 100 !== 0) {
      this.stageChange = true; // 다음 스테이지 이벤트를 가능하게 함
    }
  }

  getItem(itemId) {
    this.score += 10;
  }

  reset() {
    this.score = 0;
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
