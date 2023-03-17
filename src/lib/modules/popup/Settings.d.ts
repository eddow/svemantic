// c/p from semantic-ui.d.ts
declare global {
	namespace Popup {
		export interface Settings {
			exclusive?: boolean;
			movePopup?: boolean;
			observeChanges?: boolean;
			boundary?: HTMLElement;
			context?: HTMLElement;
			scrollContext?: HTMLElement;
			jitter?: number;
			position?: string;
			inline?: boolean;
			preserve?: boolean;
			prefer?: 'adjacent' | 'opposite';
			lastResort?: boolean | string;
			on?: 'focus' | 'click' | 'hover' | 'manual';
			delay?: Popup.DelaySettings;
			transition?: string;
			duration?: number;
			setFluidWidth?: boolean;
			hoverable?: boolean;
			closable?: boolean;
			addTouchEvents?: boolean;
			hideOnScroll?: 'auto' | false;
			target?: false | HTMLElement;
			distanceAway?: number;
			offset?: number;
			maxSearchDepth?: number;
		}
		
	}
}

export {};