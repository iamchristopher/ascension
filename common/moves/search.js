import {
    findActivePawn,
    modifyPawn,
} from '../util';

import {
    INVALID_MOVE
} from 'boardgame.io/core';
import Trekker from 'trekker';
import {
    LootTable,
} from 'lootastic';

const lootTable = new LootTable([
    { chance: -1, result: 0 },
    { chance: 10, result: 2 },
    { chance: 20, result: 1 },
]);

export default function (G, ctx, pos) {
    const pawnId = findActivePawn(G.pawns);
    const pawn = G.pawns[pawnId];
    const pathToTarget = new Trekker(G.map)
        .setDiagonalMode(Trekker.DIAGONAL_MODE.ALWAYS)
        .search(
            pawn.position.x / 50,
            pawn.position.y / 50,
            pos.x / 50,
            pos.y / 50
        );

    if (pathToTarget.length > 1) {
        return INVALID_MOVE;
    }

    const loot = lootTable
        .chooseWithReplacement(1)
        .reduce((haul, id) => ({
            ...haul,
            [id]: (pawn.inventory[id] || 0) + 1,
        }), {});

    return modifyPawn(G, pawnId, {
        inventory: {
            ...pawn.inventory,
            ...loot,
        }
    });
}
