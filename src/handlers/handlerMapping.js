import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart } from './game.handler.js';
import { getItem } from './item.handler.js';

const handlerMappings = {
  2: gameStart,
  3: gameEnd,
  4: getItem,
  11: moveStageHandler,
};

export default handlerMappings;
