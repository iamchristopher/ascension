export const modifyPlayer = (G, id, props) => ({
    ...G,
    players: {
        ...G.players,
        [id]: {
            ...G.players[id],
            ...props
        }
    }
});

export const modifyPawn = (G, id, props) => ({
    ...G,
    pawns: {
        ...G.pawns,
        [id]: {
            ...G.pawns[id],
            ...props
        }
    }
});

export const findActivePawn = pawns => Object
    .entries(pawns)
    .map(([ id, pawn ]) => pawn.active && id)
    .find(id => id);

export const restorePawns = (playerId, pawns) => Object
    .entries(pawns)
    .reduce((cache, [ id, pawn ]) => ({
        ...cache,
        [id]: {
            ...pawn,
            exhausted: playerId == pawn.owner
                ?   false
                :   pawn.exhausted,
            activations: playerId == pawn.owner
                ?   0
                :   pawn.activations
        }
    }), {});
