import moves from './moves';
console.log(moves);
const players = {
    736657283125056: {
        name: 'One',
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 50,
            y: 50
        }
    },
    2097982960243625: {
        name: 'Two',
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 100,
            y: 50
        }
    }
};

export default {
    name: 'ascension',
    setup: () => ({
        players
    }),
    moves,
    flow: {
        movesPerTurn: 2,
        phases: [
            // {
            //     name: 'Activation',
            //     allowedMoves: [ 'heal' ],
            //     onPhaseBegin (G, ctx) {
            //         console.log('begin activation');
            //         return G;
            //     },
            //     onPhaseEnd (G, ctx) {
            //         console.log('end activation');
            //         return G;
            //     },
            //     endPhaseIf () {
            //         console.log('end?');
            //         return true;
            //     },
            //     onMove (G) {
            //     console.log(G);
            //         return G;
            //     }
            // },
            {
                name: 'Action',
                allowedMoves: [ 'movePawn', 'attack' ],
                onPhaseBegin (G, ctx) {
                    console.log('begin action??x');
                    return G;
                },
                onPhaseEnd (G, ctx) {
                    console.log('end action');
                    return G;
                },
                endPhaseIf () {
                    console.log('end?');
                    // return true;
                }
            }
        ],
        onTurnBegin (G, ctx) {
            const currentPlayer = G.players[ctx.currentPlayer];

            return {
                ...G,
                players: {
                    ...G.players,
                    [ctx.currentPlayer]: {
                        ...currentPlayer,
                        actions: 99
                    }
                }
            };
        },
        endTurnIf (G, ctx) {
            const currentPlayer = G.players[ctx.currentPlayer];

            return currentPlayer.actions <= 0;
        },
        playOrder: Object.keys(players)
    }
};
