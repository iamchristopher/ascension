import * as MOVES from '../constants/moves';

import activate from './activate';
import attack from './attack';
import heal from './heal';
import move from './move';
import search from './search';

export default {
    [MOVES.ACTIVATE]: activate,
    [MOVES.ATTACK]: attack,
    [MOVES.HEAL]: heal,
    [MOVES.MOVE]: move,
    [MOVES.SEARCH]: search,
};
