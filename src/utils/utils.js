export function getFontColorForBackfround(color) {
    try {
        let r = parseInt(color.substr(1, 2), 16);
        let g = parseInt(color.substr(3, 2), 16);
        let b = parseInt(color.substr(5, 2), 16);
        let yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        return (yiq >= 128) ? '#101' : '#fff';
    } catch (e) {
        console.log(e);
        return '#101';
    }
}