import {
    modifyPawn
} from '../util';

export default function (G, ctx, id, position) {
    const tileX = Math.floor(position.x / 50);
    const tileY = Math.floor(position.y / 50);
    const roomId = G.map.rooms.findIndex(({ height, width, x, y, }) => (
        x <= tileX &&
        y <= tileY &&
        x + width >= tileX &&
        y + height >= tileY
    ));
    const room = G.map.rooms[roomId];
    const {
        tiles: {
            [tileY - room.y]: {
                [tileX - room.x]: {
                    tags = [],
                } = [],
            } = [],
        } = [],
    } = room;

    if (tags.length > 0) {
        ctx.events.endPhase();

        return modifyPawn(G, id, {
            position,
            triggered: true, // TODO: Do something with this
        });
    }

    return modifyPawn(G, id, {
        position
    });
}
