import * as MOVES from '../constants/moves';
import * as PHASES from '../constants/phases';
import {
    findActivePawn,
    modifyPawn
} from '../util';

export default {
    allowedMoves: [ MOVES.TAG ],
    onPhaseBegin (G, ctx) {
        const pawnId = findActivePawn(G.pawns);

        return modifyPawn(G, pawnId, {
            actions: 1
        });
    },
    onMove (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        return modifyPawn(G, pawnId, {
            actions: pawn.actions - 1
        });
    },
    endPhaseIf (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        if (pawn.actions <= 0) {
            return {
                next: PHASES.ACTIVATION,
            };
        }
    },
    onPhaseEnd (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        return modifyPawn(G, pawnId, {
            actions: 0,
            activations: pawn.actions === 1
                ?   pawn.activations - 1
                :   pawn.activations
        });
    },
};
