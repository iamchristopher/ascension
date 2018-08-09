import {
    findActivePawn,
    modifyPawn
} from '../util';
import {
    get as getItem
} from '../data/items';

import Trekker from 'trekker';
import {
    LootTable
} from 'lootastic';

const lootTable = new LootTable([
    { chance: 1, result: getItem(1) },
    { chance: 1, result: getItem(2) },
]);

export default function (G, ctx, pos) {
    const pawnId = findActivePawn(G.pawns);
    const pawn = G.pawns[pawnId];
    const path = new Trekker(G.map)
        .search(
            pawn.position.x / 50,
            pawn.position.y / 50,
            pos.x / 50,
            pos.y / 50
        );

    if (path.length > 1) {
        return;
    }

    const [{
        id
    }] = lootTable.chooseWithReplacement(1);
    const {
        inventory: {
            [id]: currentItemQuantity = 0,
            ...inventory
        } = {}
    } = pawn;

    return modifyPawn(G, pawnId, {
        inventory: {
            ...inventory,
            [id]: currentItemQuantity + 1
        }
    });
}
