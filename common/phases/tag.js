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
    onMove (G, ctx, { args: [ cardId ] }) {
        const {
            players: {
                [ctx.currentPlayer]: {
                    cards: playerHand,
                }
            }
        } = G;
        const {
            [playerHand.indexOf(cardId)]: e,
            ...cards
        } = playerHand;

        return modifyPlayer(G, ctx.currentPlayer, {
            actions: 0,
            cards: Object.values(cards),
        });
    },
    endPhaseIf (G, ctx) {
        const {
            players: {
                [ctx.currentPlayer]: {
                    actions,
                    cards,
                },
            },
        } = G;

        if (actions && cards.length > 0) {
            return;
        }

        return {
            next: PHASES.OVERLORD,
        };
    },
};
