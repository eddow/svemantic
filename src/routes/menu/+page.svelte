<script lang="ts">
	import { SubMenu, Menu, LinkItem } from "$lib";
	// TODO icon label text
</script>
<Menu attached="top">
	<LinkItem href="#">Menu</LinkItem>
	<div class="right menu">
		<SubMenu class="icon" icon="heart">
			<LinkItem href="#">Menu 1</LinkItem>
			<LinkItem href="#">Menu 2</LinkItem>
		</SubMenu>
	</div>
</Menu>