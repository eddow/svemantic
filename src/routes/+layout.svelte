<script lang="ts">
    import { app, LinkItem, Menu } from '$svemantic';
	import { browser } from '$app/environment';
	import { page } from "$app/stores";
    import type { Page } from '@sveltejs/kit';

	app.browser = browser;	// No need for reactivity here
	page.subscribe((p: Page)=> { app.pathname.set(p.url.pathname) });
</script>
<div class="main">
	<div class="toc">
		<Menu vertical fluid tabular>
			<LinkItem href="/button">Button</LinkItem>
			<LinkItem href="/dropdown">Drop down</LinkItem>
			<LinkItem href="/message">Message</LinkItem>
			<LinkItem href="/menu">Menu</LinkItem>
			<LinkItem href="/popup">Popup</LinkItem>
			<LinkItem href="/paged">Paged</LinkItem>
			<LinkItem href="/form">Form</LinkItem>
			<LinkItem href="/table">Table</LinkItem>
		</Menu>
	</div>
	<div class="article">
		<div class="ui seamless right attached segment">
			<slot />
		</div>
	</div>
</div>
<style lang="scss">
.main {
	display: flex;
    flex-direction: row;
	height: 100vh;
}
.toc {
	position: fixed;
    z-index: 1;
    width: 250px;
    flex: 0 0 auto;
}
.article {
	flex: 1 1 auto;
    min-width: 0;
    margin-left: 250px;

}
</style>