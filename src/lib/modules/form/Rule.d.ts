declare global {
	namespace SveMantic {
		export interface Rule {
			type: string;
			value?: any;
			prompt?: string | ((value: any)=> string);
		}
		export interface Field {
			identifier: string;
			optional: boolean;
			rules: Rule[];
			setErrors(errors?: string[]): void;
		}		
	}
}

export {};