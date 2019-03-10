import * as PHASES from '../constants/phases';

export default {
    onPhaseBegin (G, ctx) {
        ctx.events.endPhase({
            next: PHASES.RESTORATION,
        });
    }
};
