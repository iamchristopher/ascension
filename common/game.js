import moves from './moves';
import {
    findActivePawn,
    modifyPawn,
    modifyPlayer,
    restorePawns
} from './util';

const players = {
    736657283125056: {
        name: 'One'
    },
    2097982960243625: {
        name: 'Two'
    }
};

const pawns = {
    1: {
        owner: 736657283125056,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 200,
            y: 200
        },
        speed: 12,
        activations: 0,
        active: false,
        exhausted: false
    },
    2: {
        owner: 2097982960243625,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 350,
            y: 50
        },
        speed: 4,
        activations: 0,
        active: false,
        exhausted: false
    },
};

export default {
    name: 'ascension',
    setup: () => ({
        players,
        pawns
    }),
    moves,
    flow: {
        onTurnBegin (G, ctx) {
            return {
                ...G,
                pawns: restorePawns(ctx.currentPlayer, G.pawns)
            };
        },
        phases: [
            {
                name: 'Restoration',
                allowedMoves: [ 'activatePawn' ],
                endPhaseIf (G, ctx) {
                    return Object
                        .values(G.pawns)
                        .some(({ active }) => active) && 'Activation';
                },
                endTurnIf (G, ctx) {
                    return !Object
                        .values(G.pawns)
                        .filter(({ owner }) => owner == ctx.currentPlayer)
                        .some(({ exhausted }) => !exhausted);
                }
            },
            {
                name: 'Activation',
                allowedMoves: [],
                onPhaseBegin (G, ctx) {
                    const pawnId = findActivePawn(G.pawns);
                    const pawn = G.pawns[pawnId];

                    return modifyPawn(G, pawnId, {
                        exhausted: pawn.activations >= 2
                    });
                },
                onPhaseEnd (G, ctx) {
                    const pawnId = findActivePawn(G.pawns);
                    const pawn = G.pawns[pawnId];
                    const activations = pawn.activations + 1;

                    return modifyPawn(G, pawnId, {
                        activations,
                        active: activations <= 2
                    });
                },
                endPhaseIf (G, ctx) {
                    const pawnId = findActivePawn(G.pawns);
                    const pawn = G.pawns[pawnId];

                    return pawn.exhausted && 'Restoration';
                }
            },
            {
                name: 'Movement',
                allowedMoves: [ 'movePawn' ],
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

                    return pawn.actions <= 0 && 'Activation';
                },
                onPhaseEnd (G, ctx) {
                    const pawnId = findActivePawn(G.pawns);
                    const pawn = G.pawns[pawnId];

                    return modifyPawn(G, pawnId, {
                        actions: 0,
                        activations: pawn.actions === pawn.speed
                            ?   pawn.activations - 1
                            :   pawn.activations
                    });
                }
            },
            {
                name: 'Attack',
                allowedMoves: [ 'attackPawn' ],
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

                    return pawn.actions <= 0 && 'Activation';
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
                }
            },
            {
                name: 'Search',
                allowedMoves: [],
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

                    return pawn.actions <= 0 && 'Activation';
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
                }
            }
        ],
        playOrder: Object.keys(players)
    }
};
