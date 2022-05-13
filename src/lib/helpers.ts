export function sortItems(items, sortBy, isDesc) {
    return isDesc ?
        items.sort((x, y) => y[sortBy] - x[sortBy])
        : items.sort((x, y) => x[sortBy] - y[sortBy]);
}
