export function sortIndex(a, b) {
    try {
        if (a.rank == b.rank) return 0;
        return a.rank > b.rank ? 1 : -1;
    } catch (err) {
        console.error(err);
    }
}
export function guid() {
    try {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    } catch (err) {
        bugsnag.notify(err);
    }
}
export function translatePointToGrid(width, x) {
    let mult = x / 100;
    let val = (width * mult) - 15;

    return val >= width ? width : val;
}
export function translatePointToData(width, x) {
    let mult = 100 / width;
    let val = (x * mult) + 2;

    return val >= 100 ? 100 : val;
}
export function matchStateToTerm(state, value) {
    return (
        state.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
}