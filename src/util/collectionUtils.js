export const dict2arr = dict => {
    const res = [];
    for (let name in dict) {
        if (!dict.hasOwnProperty(name)) {
            continue;
        }
        res.push({
            name: name,
            value: dict[name],
        });
    }
    return res;
};
