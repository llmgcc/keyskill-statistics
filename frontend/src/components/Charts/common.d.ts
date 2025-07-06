export interface Bin {
  bin: number;
  count: number;
}

export interface BinExtended extends Bin {
  from: number;
  to: number;
}

export interface Chart {
  data: Bin[];
  from: number;
  to: number;
}

export interface ChartTooltip {
  active?: boolean;
  payload?: {
    payload: BinExtended;
    value: number;
  }[];
  label?: string;
}
