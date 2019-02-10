import * as PHASES from '../constants/phases';

import activation from './activation';
import attack from './attack';
import movement from './movement';
import restoration from './restoration';
import search from './search';
import tag from './tag';

export default {
    [PHASES.ATTACK]: attack,
    [PHASES.ACTIVATION]: activation,
    [PHASES.MOVEMENT]: movement,
    [PHASES.RESTORATION]: restoration,
    [PHASES.SEARCH]: search,
    [PHASES.TAG]: tag,
};
