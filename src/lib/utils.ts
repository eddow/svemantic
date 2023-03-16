export type Multiple = 'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine'|'ten'|'eleven'|'twelve';

export function epurate<T extends Record<string, any>>(source: T, keys: string[]): T {
	const rv: Record<string, any> = {};
	for(const key of keys) rv[key] = source[key];
	return <T>rv;
}
