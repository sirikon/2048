export function interpolate(easingFunction: (n: number) => number, from: number, to: number, progress: number): number {
	return from + ((to-from) * easingFunction(progress))
}

export function linear(n: number): number {
	return n;
}

export function easeInQuad(x: number): number {
	return x * x;
}

export function easeOutBack(x: number): number {
	const c1 = 1.70158;
	const c3 = c1 + 1;
	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function easeOutElastic(x: number): number {
	const c4 = (2 * Math.PI) / 3;
	return x === 0
		? 0
		: x === 1
			? 1
			: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}
