import { argued, oneOf, type ClassDescr } from "$lib/classes";

type LoadingSpec = 'slow'|'fast'|'elastic'|'double'|'slow elastic'|'fast elastic'|'slow double'|'fast double';

export interface LoadingStyle {
	slow?: boolean;
	fast?: boolean;
	
	double?: boolean;
	elastic?: boolean;
}

export function loadingStyle({slow, fast, double, elastic}: Loading): ClassDescr[] {
	return [oneOf({slow, fast}), oneOf({double, elastic})];
}

export interface Loading extends LoadingStyle {
	loading?: boolean|LoadingSpec;
}

export function loading({loading, ...style}: Loading): ClassDescr {
	return loading === true ? ['loading', ...loadingStyle(style)] : [argued({loading: <LoadingSpec>loading})];
}