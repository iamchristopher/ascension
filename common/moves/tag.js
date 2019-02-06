export default function (G, ctx, { x = 0, y = 0 }) {
    const tagX = Math.floor(x / 50);
    const tagY = Math.floor(y / 50);
    const roomId = G.map.rooms.findIndex(({ height, width, x, y, }) => (
        x <= tagX &&
        y <= tagY &&
        x + width >= tagX &&
        y + height >= tagY
    ));
    const room = G.map.rooms[roomId];
    const xOffset = tagX - room.x;
    const yOffset = tagY - room.y;
    const tile = room.tiles[yOffset][xOffset];

    const tag = {
        type: 'EFFECT_CARD',
        owner: ctx.currentPlayer,
    };

    const rooms = [
        ...G.map.rooms.slice(0, roomId),
        {
            ...room,
            tiles: room.tiles.map((row, i) =>
                row.map((tile, j) => ({
                    ...tile,
                    tags: [
                        ...tile.tags,
                        ...( i === yOffset && j === xOffset ? [ tag ]: [] ),
                    ],
                }))
            )
        },
        ...G.map.rooms.slice(roomId + 1),
    ];

    return {
        ...G,
        map: {
            ...G.map,
            rooms,
        }
    };
}
