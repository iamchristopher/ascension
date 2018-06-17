export default function (G, ctx, id) {
    return {
        ...G,
        players: {
            ...G.players,
            [id]: {
                ...G.players[id],
                currentHealth: players[id].maxHealth
            }
        }
    };
}
