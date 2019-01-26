import moves from './moves';
import {
    findActivePawn,
    modifyPawn,
    restorePawns
} from './util';

const PHASES = {
    ACTIVATION: 'Activation',
    ATTACK: 'Attack',
    MOVEMENT: 'Movement',
    RESTORATION: 'Restoration',
    SEARCH: 'Search',
}

const players = {
    0: {
        name: 'One'
    },
    1: {
        name: 'Two'
    }
};

const pawns = {
    1: {
        owner: 0,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 700,
            y: 700
        },
        speed: 1,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
    2: {
        owner: 1,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 700,
            y: 800
        },
        speed: 4,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
    3: {
        owner: 0,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 800,
            y: 700
        },
        speed: 20,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
    4: {
        owner: 1,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 800,
            y: 800
        },
        speed: 4,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
};

export default ({
    map = [],
    blocked = [],
    interactions = []
} = {}) => ({
    name: 'ascension',
    setup: () => ({
        players,
        pawns,
        map,
        blocked,
        interactions
    }),
    moves,
    flow: {
        endGameIf (G, ctx) {
            const validPlayerIds = Object.keys(G.players)
                .filter(playerId =>
                    Object.keys(G.pawns)
                        .map(pawnId => G.pawns[pawnId])
                        .filter(pawn => pawn.owner == playerId)
                        .filter(pawn => pawn.currentHealth > 0)
                        .length > 0
                );

            if (validPlayerIds.length > 1) {
                return;
            }

            return {
                winner: validPlayerIds[0]
            };
        },
        onTurnBegin (G, ctx) {
            return {
                ...G,
                pawns: restorePawns(ctx.currentPlayer, G.pawns)
            };
        },
        startingPhase: PHASES.RESTORATION,
        phases: {
            [PHASES.RESTORATION]: {
                allowedMoves: [ 'activatePawn' ],
                endPhaseIf (G, ctx) {
                    const activePawn = Object
                        .values(G.pawns)
                        .some(({ active }) => active);

                    if (activePawn) {
                        return {
                            next: PHASES.ACTIVATION,
                        };
                    }
                },
                endTurnIf (G, ctx) {
                    return !Object
                        .values(G.pawns)
                        .filter(({ owner }) => owner == ctx.currentPlayer)
                        .some(({ exhausted }) => !exhausted);
                },
            },
            [PHASES.ACTIVATION]: {
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

                    if (pawn.exhausted) {
                        return {
                            next: PHASES.RESTORATION,
                        };
                    }
                },
            },
            [PHASES.MOVEMENT]: {
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
                        activations: pawn.actions === pawn.speed
                            ?   pawn.activations - 1
                            :   pawn.activations
                    });
                },
            },
            [PHASES.ATTACK]: {
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
                },
                next: PHASES.ACTIVATION,
            },
            [PHASES.SEARCH]: {
                name: 'Search',
                allowedMoves: [ 'searchSpace' ],
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
                },
                next: PHASES.ACTIVATION,
            },
        },
        optimisticUpdate: () => false
    }
});
