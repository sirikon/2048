export default interface Config {
    boardSize: { w: number, h: number },
    newCellPossibleValues: { value: number, chances: number }[]
    newCellsAtStart: number
}
