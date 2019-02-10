import * as MOVES from '../constants/moves';
import * as PHASES from '../constants/phases';

export default {
    allowedMoves: [ MOVES.ACTIVATE ],
    endPhaseIf (G, ctx) {
        const activePawn = Object
            .values(G.pawns)
            .some(({ active }) => active);

        if (activePawn) {
            return {
                next: PHASES.ACTIVATION,
            };
        }
    },
    endTurnIf (G, ctx) {
        return !Object
            .values(G.pawns)
            .filter(({ owner }) => owner == ctx.currentPlayer)
            .some(({ exhausted }) => !exhausted);
    },
};
