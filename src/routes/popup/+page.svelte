<script lang="ts">
	import { Icon, Button, Input, Popup, popup, type PopupSettings } from "$lib";
	let ppp: PopupSettings;
</script>
<Button icon="hippo" popup="Hippopotamous" />
<Button icon="radiation" popup={{title: 'Danger!', variation: 'red'}} />
<button use:popup={"Speaking about it..."}>Blah</button>

<Icon icon="hand pointer" popup={ppp} />

<Button icon="heart" />
<Popup on="click" color="blue">
	<Input icon="at" leftIcon />
</Popup>

<Popup bind:config={ppp} color="red">
	<Input icon="at" />
</Popup>


<Button icon="blind" />
<Popup></Popup>