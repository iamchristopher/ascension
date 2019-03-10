import * as MOVES from '../constants/moves';
import * as PHASES from '../constants/phases';
import {
    modifyPlayer,
} from '../util';

export default {
    allowedMoves: [ MOVES.TAG ],
    onPhaseBegin (G, ctx) {
        return modifyPlayer(G, ctx.currentPlayer, {
            actions: 1,
        });
    },
    onMove (G, ctx) {
        return modifyPlayer(G, ctx.currentPlayer, {
            actions: 0,
        });
    },
    endPhaseIf (G, ctx) {
        const {
            players: {
                [ctx.currentPlayer]: {
                    actions,
                },
            },
        } = G;

        if (actions) {
            return;
        }

        return {
            next: PHASES.OVERLORD,
        };
    },
};
