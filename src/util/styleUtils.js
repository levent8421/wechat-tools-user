const pxStr2Num = pxStr => {
    return parseFloat(pxStr.replace('px', ''));
};

export const asSquare = ele => {
    if (!ele) {
        return;
    }

    if (ele.tagName.toLowerCase() === 'img') {
        const {width, height} = ele;
        const size = Math.min(width, height);
        ele.height = size;
        ele.width = size;
    }
    const style = window.getComputedStyle(ele, null);
    const {width, height} = style;
    const w = pxStr2Num(width);
    const h = pxStr2Num(height);
    const size = Math.max(w, h);
    ele.style.width = `${size}px`;
    ele.style.height = `${size}px`;
};