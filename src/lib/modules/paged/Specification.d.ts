declare global {
	namespace Paged {
		export type Side = 'top' | 'bottom';
		export interface Specification {
			part: ConstructorOfATypedSvelteComponent;
		}
		export interface TabSpecification extends Specification {
			side: Side;
			inverted: boolean;
		}
	}
}

export {};