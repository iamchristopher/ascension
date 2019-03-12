import * as PHASES from '../constants/phases';

export default {
    onPhaseBegin (G, ctx) {
        return G;
    },
    endTurnIf (G, ctx) {
        const {
            players: {
                [ctx.currentPlayer]: {
                    cards: playerHand = [],
                }
            }
        } = G;

        console.log(G.players[ctx.currentPlayer])

        return playerHand.length === 0;
    },
};
