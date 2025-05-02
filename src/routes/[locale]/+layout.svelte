<script>
	import '../../app.css';
  import { locale } from '$lib/i18n';
  export let data;
  $: locale.set(data.locale);
</script>

<slot></slot>

<style></style>
