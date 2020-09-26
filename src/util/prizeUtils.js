const DISPLAY_PRIZES = 8;

export const normalizePrizes = prizes => {
    const top = [], bottom = [];
    let tmpId = -1;
    while (prizes.length < DISPLAY_PRIZES) {
        const prize = {
            name: '谢谢惠顾',
            image: '',
            appId: -1,
            id: tmpId--,
        };
        const index = (Math.random() * prizes.length).toFixed(0);
        prizes.splice(index, 0, prize);
    }
    for (let i = 0; i < 3; i++) {
        top.push(prizes[i]);
    }
    const left = prizes[3];
    const right = prizes[4];
    for (let i = 5; i < DISPLAY_PRIZES; i++) {
        bottom.push(prizes[i]);
    }
    return {prizesTop: top, prizeLeft: left, prizeRight: right, prizesBottom: bottom};
};