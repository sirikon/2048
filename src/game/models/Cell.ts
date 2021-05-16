export interface BaseCell {
    value: number
}

export interface Cell extends BaseCell {
    transitions?: {
        appear?: { progress: number };
        fromPosition?: { position: number, progress: number };
        fromValue?: { value: number, progress: number };
    }
}
