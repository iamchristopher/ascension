import * as MOVES from '../constants/moves';
import * as PHASES from '../constants/phases';
import {
    findActivePawn,
    modifyPawn
} from '../util';

export default {
    allowedMoves: [ MOVES.MOVE, MOVES.CANCEL ],
    onPhaseBegin (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        return modifyPawn(G, pawnId, {
            actions: pawn.speed
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
            activations: pawn.actions < pawn.speed
                ?   pawn.activations
                :   pawn.activations - 1
        });
    },
};
