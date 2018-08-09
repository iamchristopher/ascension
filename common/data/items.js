const items = {
    1: {
        name: 'Shield'
    },
    2: {
        name: 'Candle'
    }
};

export const get = id => ({
    ...items[id],
    id
});

export default items;
