<script lang="ts">
	import { SubMenu, Menu, LinkItem } from "$svemantic";
</script>
<Menu attached="top">
	<LinkItem href="#">Menu</LinkItem>
	<div class="right menu">
		<SubMenu class="icon" icon="heart">
			<LinkItem href="#">Menu 1</LinkItem>
			<LinkItem href="#">Menu X</LinkItem>
		</SubMenu>
	</div>
</Menu>