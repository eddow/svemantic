import { getContext, setContext } from "svelte";

function keyGenerator(context: any) {
	let value = 0;
	setContext(context, ()=> value++);
	return ()=> { value = 0; }
}

// TODO: use get_
const columnKG = {};	// unique context key
export const numerator = {
	createColumns() {
		return keyGenerator(columnKG);
	},
	get column() {
		return getContext<()=> number>(columnKG)();
	}
};