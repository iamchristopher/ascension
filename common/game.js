import moves from './moves';

const players = {
    736657283125056: {
        name: 'One',
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 50,
            y: 50
        },
        speed: 5
    },
    2097982960243625: {
        name: 'Two',
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 100,
            y: 50
        },
        speed: 5
    }
};

export default {
    name: 'ascension',
    setup: () => ({
        players
    }),
    moves,
    flow: {
        phases: [
            {
                name: 'Movement',
                allowedMoves: [ 'movePawn' ],
                onPhaseBegin (G, ctx) {
                    const currentPlayer = G.players[ctx.currentPlayer];

                    return modifyPlayer(G, ctx.currentPlayer, {
                        actions: currentPlayer.speed
                    });
                },
                onMove (G, ctx) {
                    const currentPlayer = G.players[ctx.currentPlayer];

                    return modifyPlayer(G, ctx.currentPlayer, {
                        actions: currentPlayer.actions - 1
                    });
                },
                endPhaseIf (G, ctx) {
                    const currentPlayer = G.players[ctx.currentPlayer];

                    return currentPlayer.actions <= 0 && 'Activation';
                },
                onPhaseEnd (G, ctx) {
                    return modifyPlayer(G, ctx.currentPlayer, {
                        actions: 0
                    });
                }
            },
            {
                name: 'Activation',
                allowedMoves: [],
                onPhaseBegin (G, ctx) {
                    console.log('Activation');
                    return G;
                }
            }
        ],
        playOrder: Object.keys(players)
    }
};

const modifyPlayer = (G, id, props) => ({
    ...G,
    players: {
        ...G.players,
        [id]: {
            ...G.players[id],
            ...props
        }
    }
});
