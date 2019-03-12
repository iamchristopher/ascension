import * as PHASES from '../constants/phases';
import {
    findActivePawn,
    modifyPawn
} from '../util';

const MAX_ACTIVATIONS = 2;

export default {
    allowedMoves: [],
    onPhaseBegin (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        if (!pawn) {
            return G;
        }

        return modifyPawn(G, pawnId, {
            exhausted: pawn.activations >= MAX_ACTIVATIONS
        });
    },
    onPhaseEnd (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];
        const activations = pawn.activations + 1;

        return modifyPawn(G, pawnId, {
            activations,
            active: activations <= MAX_ACTIVATIONS,
        });
    },
    endPhaseIf (G, ctx) {
        const pawnId = findActivePawn(G.pawns);
        const pawn = G.pawns[pawnId];

        if (!pawn) {
            return;
        }

        if (pawn.exhausted) {
            return {
                next: PHASES.RESTORATION,
            };
        }
    },
};
