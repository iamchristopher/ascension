import {
    findActivePawn,
    modifyPawn
} from '../util';

export default function (G, ctx, target) {
    const pawnId = findActivePawn(G.pawns);
    console.log(pawnId, target);

    const defender = G.pawns[target];
    const newHealth = defender.currentHealth - 10 <= 0
        ?   0
        :   defender.currentHealth - 10;

    return modifyPawn(G, target, {
        currentHealth: newHealth,
    });
}
