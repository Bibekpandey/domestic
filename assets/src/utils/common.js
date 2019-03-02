export const objectToUrlParams = (obj) => {
    const params = Object.keys(obj).map(x => `${x}=${encodeURI(obj[x])}`);
    return params.join('&');
};

export const urlParamsToObject = (paramsString) => {
    let trimmed = paramsString.trim();
    if (trimmed === '') {
        return {};
    }
    if (trimmed.charAt(0) === '#') {
        trimmed = trimmed.substr(1);
    }
    const splitted = trimmed.split('&');
    return splitted.reduce((a, x) => {
        const xSplitted = x.split('=');
        return {
            ...a,
            // TODO: url decode
            [xSplitted[0]]: xSplitted[1],
        };
    }, {});
};
