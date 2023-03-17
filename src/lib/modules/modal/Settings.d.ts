// c/p from semantic-ui.d.ts
declare global {
	namespace Modal {
		export interface Settings {

            /**
             * If set to false will prevent the modal from being moved to inside the dimmer
             *
             * @default true
             */
            detachable: boolean;
            /**
             * When true, the first form input inside the modal will receive focus when shown. Set this to false to prevent this behavior.
             *
             * @default true
             */
            autofocus: boolean;
            /**
             * Whether any change in modal DOM should automatically refresh cached positions
             *
             * @default false
             */
            observeChanges: boolean;
            /**
             * If set to true will not close other visible modals when opening a new one
             *
             * @default false
             */
            allowMultiple: boolean;
            /**
             * Whether to automatically bind keyboard shortcuts
             *
             * @default true
             */
            keyboardShortcuts: boolean;
            /**
             * A vertical offset to allow for content outside of modal, for example a close button, to be centered.
             *
             * @default 0
             */
            offset: number;
            /**
             * Selector or jquery object specifying the area to dim
             *
             * @default 'body'
             */
            context: string | JQuery;
            /**
             * Setting to false will not allow you to close the modal by clicking on the dimmer
             *
             * @default true
             */
            closable: boolean;
            /**
             * You can specify custom settings to extend UI dimmer
             *
             * @see {@link http://semantic-ui.com/modules/dimmer.html}
             */
            dimmerSettings: DimmerSettings;
            /**
             * Named transition to use when animating menu in and out, full list can be found in ui transitions docs.
             *
             * @default 'scale'
             * @see {@link http://semantic-ui.com/modules/transition.html}
             */
            transition: string;
            /**
             * Duration of animation
             *
             * @default 400
             */
            duration: number;
            /**
             * Whether additional animations should queue
             *
             * @default false
             */
            queue: boolean;
		}
		
	}
}

export {};