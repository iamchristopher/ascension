import * as MOVES from '../constants/moves';

import activate from './activate';
import attack from './attack';
import heal from './heal';
import move from './move';
import search from './search';
import tag from './tag';

export default {
    [MOVES.ACTIVATE]: activate,
    [MOVES.ATTACK]: attack,
    [MOVES.HEAL]: heal,
    [MOVES.MOVE]: move,
    [MOVES.SEARCH]: search,
    [MOVES.TAG]: tag,
};
