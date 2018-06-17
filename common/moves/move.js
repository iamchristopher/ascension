export default function (G, ctx, id, position) {
    const currentPlayer = G.players[ctx.currentPlayer];

    return {
        ...G,
        players: {
            ...G.players,
            [ctx.currentPlayer]: {
                ...currentPlayer,
                actions: currentPlayer.actions - 1,
                position
            }
        }
    };
}
