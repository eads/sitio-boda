<script>
  import wallPhoto from '$lib/assets/van-and-david-wall.jpg?grayscale&w=1440;2880&aspect=16:5&fit=cover&position=entropy&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import gazingPhoto from '$lib/assets/van-and-david-gazing.jpg?w=1440;2880&aspect=16:5&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import handsPhoto from '$lib/assets/van-and-david-hands.jpg?w=1440;2880&aspect=16:11&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  
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
    {copyStrings["titulo"][locale]}
  </h1>

  <div class="text-center text-sm">
    <button
      on:click={() => switchLanguage('en')}
      class="mr-1 inline-block leading-none p-2 border text-white bg-zinc-700 {locale === 'en' ? 'border-white' : 'border-zinc-700'}"
    >EN</button>
    <button
      on:click={() => switchLanguage('es')}
      class="ml-1 inline-block leading-none p-2 border text-white bg-zinc-700 {locale === 'es' ? 'border-white' : 'border-zinc-700'}"
    >ES</button>
  </div>

  <div id="bienvenidos" class="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden">
    <img
      srcset={wallPhoto}
      sizes="(min-width: 1024px) 100vw, 100vw"
      alt="Hero image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-4xl sm:text-6xl font-bold drop-shadow-lg">{copyStrings['bienvenidos'][locale]}</h1>
    </div>
  </div>

  <div>{@html copyStrings['bienvenidosMas'][locale]}</div>
  
  <div id="cermonia" class="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden">
    <img
      srcset={handsPhoto}
      sizes="(min-width: 1024px) 100vw, 100vw"
      alt="Hero image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-4xl sm:text-6xl font-bold drop-shadow-lg">{copyStrings['ceremonia'][locale]}</h1>
    </div>
  </div>

  <div>{@html copyStrings['ceremoniaMas'][locale]}</div>
  
  <div id="disponible" class="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden">
    <img
      srcset={gazingPhoto}
      sizes="(min-width: 1024px) 100vw, 100vw"
      alt="Hero image"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-4xl sm:text-6xl font-bold drop-shadow-lg">{copyStrings['disponible'][locale]}</h1>
    </div>
  </div>

  <div>{@html copyStrings['disponibleMas'][locale]}</div>

  <h1 id="dresscode">{copyStrings['dressCode'][locale]}</h1>
  <div>{@html copyStrings['dressCodeMas'][locale]}</div>
  
  <div id="informacion">{@html copyStrings['informacion'][locale]}</div>
</div>
