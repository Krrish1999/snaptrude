export function getRandomValueInRange(min: number = 1500.00,
    max: number = 25100.00, step: number = 1): number {
    const range = max - min;
    const numberOfSteps = range / step;
    const randomStep = Math.floor(Math.random() * (numberOfSteps + 1));
    const randomValue = min + randomStep * step;
    return randomValue;
}


