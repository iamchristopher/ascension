import * as MOVES from './constants/moves';
import * as PHASES from './constants/phases';
import * as ROLES from './constants/roles';
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
        name: 'One',
        role: ROLES.OVERLORD,
        cards: [
            1,
            2,
        ],
    },
    1: {
        name: 'Two',
        role: ROLES.HERO,
    }
};

const pawns = {
    a: {
        owner: 0,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 700,
            y: 700
        },
        speed: 6,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
    b: {
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
    c: {
        owner: 0,
        maxHealth: 50,
        currentHealth: 50,
        position: {
            x: 800,
            y: 700
        },
        speed: 6,
        activations: 0,
        active: false,
        exhausted: false,
        inventory: {},
    },
    d: {
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
            const {
                players: {
                    [ctx.currentPlayer]: {
                        role,
                    },
                }
            } = G;

            let next = PHASES.OVERLORD;
            if (role === ROLES.HERO) {
                next = PHASES.HERO;
            }

            ctx.events.endPhase({
                next,
            });

            return {
                ...G,
                pawns: restorePawns(ctx.currentPlayer, G.pawns)
            };
        },
        phases,
        optimisticUpdate: () => false
    }
});
