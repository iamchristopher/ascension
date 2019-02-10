import * as MOVES from './constants/moves';
import * as PHASES from './constants/phases';
import moves from './moves';
import phases from './phases';
import {
    findActivePawn,
    modifyPawn,
    restorePawns
} from './util';

const MAX_ACTIVATIONS = 2;

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
        phases,
        optimisticUpdate: () => false
    }
});
