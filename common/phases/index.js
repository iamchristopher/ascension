import * as PHASES from '../constants/phases';

import hero from './hero';
import activation from './activation';
import attack from './attack';
import movement from './movement';
import overlord from './overlord';
import restoration from './restoration';
import search from './search';
import tag from './tag';

export default {

    // Hero phases
    [PHASES.HERO]: hero,
    [PHASES.ATTACK]: attack,
    [PHASES.ACTIVATION]: activation,
    [PHASES.MOVEMENT]: movement,
    [PHASES.RESTORATION]: restoration,
    [PHASES.SEARCH]: search,
    [PHASES.TAG]: tag,

    // Overlord phases
    [PHASES.OVERLORD]: overlord,
};
