import {
    modifyPawn
} from '../util';

export default function (G, ctx, id, position) {
    return modifyPawn(G, id, {
        position
    });
}
