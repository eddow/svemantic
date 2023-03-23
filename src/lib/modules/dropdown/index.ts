import Dropdown, { type DropdownOption, type DropdownEvent } from "./Dropdown.svelte";
import Languages from "./Languages.svelte";
import Select from "./Select.svelte";

export { Dropdown, Select, Languages, DropdownOption, DropdownEvent }
export const
	Select1 = Select<string>,
	SelectX = Select<string[]>;