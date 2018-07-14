import {
    findActivePawn
} from '../util';

import Trekker from 'trekker';

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

    return G;
}
