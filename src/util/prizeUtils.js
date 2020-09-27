import not_winning from '../image/not_winning.png'

const DISPLAY_PRIZES = 8;

export const normalizePrizes = prizes => {
    const top = [], bottom = [];
    let tmpId = -1;
    while (prizes.length < DISPLAY_PRIZES) {
        const prize = {
            name: '谢谢惠顾',
            image: not_winning,
            appId: -1,
            id: tmpId--,
        };
        const index = (Math.random() * prizes.length).toFixed(0);
        prizes.splice(index, 0, prize);
    }
    for (let i = 0; i < 3; i++) {
        const p = prizes[i];
        p.key = i;
        top.push(p);
    }
    const left = prizes[3];
    const right = prizes[4];
    left.key = 7;
    right.key = 3;
    for (let i = DISPLAY_PRIZES - 1; i >= 5; i--) {
        const p = prizes[i];
        p.key = i - 1;
        bottom.push(p);
    }
    return {prizesTop: top, prizeLeft: left, prizeRight: right, prizesBottom: bottom};
};
