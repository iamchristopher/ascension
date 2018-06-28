import {
    modifyPawn
} from '../util';

export default function (G, ctx, id) {
    return modifyPawn(G, id, {
        active: true
    });
}
