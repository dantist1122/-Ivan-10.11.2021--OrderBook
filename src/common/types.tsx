
export interface OrderType {
    feed: string;
    product_id: string;
    numLevels?: number;
    bids: number[][];
    asks: number[][];
}
export interface DeltaType {
    feed: string;
    product_id: string;
    bids: number[][];
    asks: number[][];
}

export interface OrderStructure {
    [index: number]: number;
}