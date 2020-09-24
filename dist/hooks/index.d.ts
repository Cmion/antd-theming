interface UseDimension {
    height: number;
    width: number;
}
declare const useDimension: (type?: 'window' | 'element', elementId?: string) => UseDimension;
declare const toPercentage: (size?: number, expectedRatio?: number, sub?: number, add?: number) => number;
export { toPercentage, useDimension };
