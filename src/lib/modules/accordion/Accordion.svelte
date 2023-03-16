<script lang="ts">
	import { uistr, type Forward } from "$lib/classes";
    import { onDestroy } from "svelte";
    import Module from "../Module.svelte";

	let node: HTMLDivElement;
	export let exclusive: boolean = true,
		collapsible: boolean = true;
	let config: SemanticUI.AccordionSettings = {exclusive, collapsible};
	let module: (...parms: any[])=> any;
	interface $$Props extends Forward {
		styled?: boolean;
		exclusive?: boolean;
		collapsible?: boolean;
	}
	let cs: string;
	$: {
		let {styled} = $$props;
		cs = uistr('accordion', $$props, [
			{styled}
		]);
	}
	
	onDestroy(()=> module('destroy'));
	// TODO Finish this
</script>
<Module {node} {config} access="accordion" bind:module>
	<div class={cs} bind:this={node}>
		<slot />
		<div class="active title">
			<i class="dropdown icon"></i>
			What is a dog?
		</div>
		<div class="active content">
			<p>A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
		</div>
		<div class="title">
			<i class="dropdown icon"></i>
			What kinds of dogs are there?
		</div>
		<div class="content">
			<p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
		</div>
		<div class="title">
			<i class="dropdown icon"></i>
			How do you acquire a dog?
		</div>
		<div class="content">
			<p>Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
			<p>A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.</p>
		</div>
	</div>
</Module>