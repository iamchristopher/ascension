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
    moves: {
        movePawn: (G, ctx, id, position) => {
            const currentPlayer = G.players[ctx.currentPlayer];

            return {
                ...G,
                players: {
                    ...G.players,
                    [ctx.currentPlayer]: {
                        ...currentPlayer,
                        actions: currentPlayer.actions - 1,
                        position
                    }
                }
            };
        },
        attack (G, ctx, attackerID, defenderID) {
            const defender = G.players[defenderID];
            const newHealth = defender.currentHealth - 10 <= 0
                ?   0
                :   defender.currentHealth - 10;

            return {
                ...G,
                players: {
                    ...G.players,
                    [defenderID]: {
                        ...defender,
                        currentHealth: newHealth
                    }
                }
            };
        }
    },
    flow: {
        movesPerTurn: 2,
        phases: [
            {
                name: 'Action',
                allowedMoves: [ 'movePawn', 'attack' ],
                onPhaseBegin (G, ctx) {
                    console.log('begin action');
                    return G;
                },
                onPhaseEnd (G, ctx) {
                    console.log('end action');
                    return G;
                },
                endPhaseIf () {
                    console.log('end?');
                    return true;
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
