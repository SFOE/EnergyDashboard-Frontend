export interface Threshold {
    value: number;
    color: string;
}

export function calcThresholds(
    min: number,
    max: number,
    colors: string[]
): Threshold[] {
    var steps = colors.length;
    const diff = max - min;
    const step = diff / steps;
    const thresholdValues: number[] = [];

    for (let i = 1; i <= steps; i++) {
        var next = i * step;
        var val = +min + +next;

        const rounded = +(Math.round(val * 100) / 100).toFixed(2);
        thresholdValues.push(rounded);
    }

    return thresholdValues.map((val, i) => {
        return { value: val, color: colors[i] };
    });
}
