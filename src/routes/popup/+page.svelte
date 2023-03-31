<script lang="ts">
	import { Icon, Button, Input, Popup, popup, type PopupSettings } from "$svemantic";
	let ppp: PopupSettings;
</script>
<Button icon="hippo" popup="Hippopotamous" />
<Button icon="radiation" popup={{title: 'Danger!', variation: 'red'}} />
<button use:popup={"Speaking about it..."}>Blah</button>


<Button icon="heart" />
<Popup on="click" color="blue">
	<Input left-icon="at" />
</Popup>
<Popup bind:config={ppp} color="red">
	<Input right-icon="at" />
</Popup>
<Icon icon="hand pointer" popup={ppp} />
