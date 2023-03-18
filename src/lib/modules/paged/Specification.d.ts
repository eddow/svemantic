declare global {
	namespace SveMantic {
		export type TabSide = 'top' | 'bottom';
		export interface PageSpecification {
			part: ConstructorOfATypedSvelteComponent;
		}
		export interface TabSpecification extends PageSpecification {
			side: TabSide;
			inverted: boolean;
		}
	}
}

export {};