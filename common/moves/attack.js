export default function (G, ctx, attackerID, defenderID) {
    const defender = G.players[defenderID];
    const newHealth = defender.currentHealth - 10 <= 0
        ?   0
        :   defender.currentHealth - 10;

    return {
        ...G,
        players: {
            ...G.players,
            [defenderID]: {
                ...defender,
                currentHealth: newHealth
            }
        }
    };
}
