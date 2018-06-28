import {
    modifyPawn
} from '../util';

export default function (G, ctx, attackerID, defenderID) {
    const defender = G.pawns[defenderID];
    const newHealth = defender.currentHealth - 10 <= 0
        ?   0
        :   defender.currentHealth - 10;


    return modifyPawn(G, defenderID, {
        currentHealth: newHealth
    });
}
