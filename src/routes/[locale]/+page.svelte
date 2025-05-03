<script>
  import wallPhoto from '$lib/assets/van-and-david-wall.jpg?w=400;800;1200&format=webp;avif&as=srcset';
  import wallPhotoSimple from '$lib/assets/van-and-david-wall.jpg';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  console.log(wallPhoto, 'wallPhoto');
  console.log(wallPhotoSimple, 'wallPhotoSimple');

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

  <div id="content">
    <img srcset={wallPhoto} sizes="(max-width: 800px) 100vw, 800px" alt="Description" />
    <img src={wallPhotoSimple} alt="An localized alt text" class="hidden" />
  </div>
</div>
