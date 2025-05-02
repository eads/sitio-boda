<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data;
  const { copyStrings } = data;

  let locale = "es";
  $: locale = $page.params.locale;

  // Check if Document Transition API is available
  const supportsTransitionAPI = typeof(document) !== "undefined" && 'startViewTransition' in document;

  // Switch language and navigate with smooth transition
  async function switchLanguage(newLocale) {
    if (newLocale === locale) return; // Prevent redundant navigation

    const currentPath = window.location.pathname.split('/').slice(2).join('/');
    const navigate = () => goto(`/${newLocale}${currentPath}`);

    if (supportsTransitionAPI) {
      document.startViewTransition(() => navigate());
    } else {
      navigate(); // Fallback for unsupported browsers
    }
  }

</script>

<div id="container" class="mx-auto px-3">

  <h1 class="text-3xl font-bold text-center mb-4">
    {copyStrings["title"][locale]}
  </h1>

  <div class="text-center text-sm">
    <button
      on:click={() => switchLanguage('en')}
      class="mr-1 inline-block leading-none p-2 border text-white bg-zinc-700 {locale === 'en' ? 'border-white' : 'border-zinc-700'}"
    >
      EN
    </button>
    <button
      on:click={() => switchLanguage('es')}
      class="ml-1 inline-block leading-none p-2 border text-white bg-zinc-700 {locale === 'es' ? 'border-white' : 'border-zinc-700'}"
    >
      ES
    </button>
  </div>

  <div id="content" class="flex items-center justify-between mt-4 lg:items-start">
    <p>Hello world.</p>
  </div>
</div>
