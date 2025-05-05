<script>
  /* --- font imports ---------------------------------------------------- */
  import "@fontsource/playfair-display"; // Imports the default weight (400)

  /* --- image imports ---------------------------------------------------- */
  import wallPhoto from '$lib/assets/van-and-david-wall.jpg?grayscale&brightness=0.8&w=1800;2880&aspect=16:8fit=cover&position=entropy&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import gazingPhoto from '$lib/assets/van-and-david-gazing.jpg?w=1800;2880&aspect=16:15&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import handsPhoto from '$lib/assets/van-and-david-hands.jpg?w=1800;2880&aspect=16:13&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';

  /* --- svelte‑kit + localisation  --------------------------------------- */
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  export let data;
  const { copyStrings } = data; // { [key]: { en: string, es: string } }

  // keep your original reactive locale handling
  let locale = 'es';
  $: locale = $page.params.locale;

  /**
   * Blocks definition – drives both the hero and its markdown follow‑up.
   */
  const heroSections = [
    { id: 'bienvenidos', photo: wallPhoto,  key: 'bienvenidos',  moreKey: 'bienvenidosMas',  alt: 'Van & David – pared' },
    { id: 'ceremonia',   photo: handsPhoto, key: 'ceremonia',    moreKey: 'ceremoniaMas',    alt: 'Manos entrelazadas' },
    { id: 'disponible',  photo: gazingPhoto,key: 'disponible',   moreKey: 'disponibleMas',   alt: 'Van & David – mirando' }
  ];

  /* --- language switch (document transition if available) --------------- */
  const supportsTransitionAPI = typeof document !== 'undefined' && 'startViewTransition' in document;
  async function switchLanguage(newLocale) {
    if (newLocale === locale) return;
    const pathRemainder = window.location.pathname.split('/').slice(2).join('/');
    const navigate      = () => goto(`/${newLocale}/${pathRemainder}`);
    supportsTransitionAPI ? document.startViewTransition(navigate) : navigate();
  }
</script>

<!-- ───────────────────────── sticky header/nav ───────────────────────── -->
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
  <div class="max-w-screen-lg mx-auto px-4 h-14 flex items-center justify-between">
    <!-- left: title as link to top -->
    <h1><a href="#bienvenidos" class="text-2xl md:text-3xl tracking-tight hover:opacity-80 transition-opacity">
      {copyStrings['titulo'][locale]}
    </a></h1>

    <!-- right: info link + language buttons -->
    <nav class="flex items-center gap-1 text-xs md:text-sm">
      <a href="#informacion" class="text-sm mr-2 md:mr-6 py-1 hover:underline">ⓘ {copyStrings['informationNavLabel'][locale]}</a>
      <button
        on:click={() => switchLanguage('en')}
        class="px-2 py-2 rounded border transition-colors
               {locale === 'en' ? 'border-white bg-zinc-700 text-white' : 'border-zinc-700'}">EN</button>
      <button
        on:click={() => switchLanguage('es')}
        class="px-2 py-2 rounded border transition-colors
               {locale === 'es' ? 'border-white bg-zinc-700 text-white' : 'border-zinc-700'}">ES</button>
    </nav>
  </div>
</header>


<!-- ───────────────────────── hero blocks + descriptive content ───────── -->
{#each heroSections as s}
  <!-- full‑width hero image -->
  <section id={s.id}
           class="hero-wrapper relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]
                  h-[70vh] sm:h-[90vh] overflow-hidden">
    <img srcset={s.photo} sizes="100vw" alt={s.alt}
         class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-white text-5xl md:text-7xl text-shadow-black text-shadow-lg/30 text-center">
        {copyStrings[s.key][locale]}
      </h1>
    </div>
  </section>

  <!-- descriptive markdown (larger type) -->
  <div class="mx-auto max-w-screen-lg px-4">
    <div class="hero-more text-lg md:text-2xl mx-auto py-12" tabindex="-1">
      {@html copyStrings[s.moreKey][locale]}
    </div>
  </div>
{/each}

<!-- ───────────────────────── dresscode & extra info ──────────────────── -->
<div class="mx-auto max-w-screen-lg px-4 space-y-16">
  <!-- dress code -->
  <section id="dresscode" class="hero-more space-y-8">
    <h1>{copyStrings['dresscode'][locale]}</h1>
    <div class="text-lg md:text-2xl mx-auto">
      {@html copyStrings['dresscodeMas'][locale]}
    </div>
  </section>

  <!-- información -->
  <section id="informacion" class="hero-more text-lg md:text-2xl mx-auto">
    {@html copyStrings['informacion'][locale]}
  </section>

  <section id="qr-codes" class="mt-32">
    <h1 class="text-4xl md:text-5xl font-bold mb-6">{copyStrings['qrCodes'][locale]}</h1>
    <div>
      <p><code>https://boda.grupovisual.org/?utm_source=wedding-invite</code></p>
      <img src="https://boda.grupovisual.org/qr-invitation.png" class="w-2/5 md:w-1/5"/>
    </div>

    <div>
      <p><code>https://boda.grupovisual.org/</code></p>
      <img src="https://boda.grupovisual.org/qr-root.png" class="w-2/5 md:w-1/5"/>
    </div>
  </section>
</div>

<style>
  @reference "../../app.css";


  :global(body) {
    font-family: "Playfair Display", serif;
  }
  :global(header h1) {
    font-family: 'Drakors', cursive;
  }
  :global(.hero-wrapper h1) {
    font-family: 'Drakors', cursive;
  }
  /* enlarge basic paragraph/link styling for hero‑more sections */
  :global(.hero-more p) {
    @apply mb-6 text-xl md:text-2xl leading-relaxed;
  }
  :global(.hero-more a) {
    @apply underline text-blue-700 hover:text-blue-900 transition-colors;
  }
  :global(.hero-more h1) {
    @apply text-4xl md:text-5xl font-bold mt-24 mb-6;
  }
  :global(.hero-more h2) {
    @apply text-2xl md:text-3xl font-bold mt-12 mb-6;
  }
</style>
