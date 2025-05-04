<script>
  /* --- image imports ---------------------------------------------------- */
  import wallPhoto from '$lib/assets/van-and-david-wall.jpg?grayscale&w=1440;2880&aspect=16:5&fit=cover&position=entropy&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import gazingPhoto from '$lib/assets/van-and-david-gazing.jpg?w=1440;2880&aspect=16:5&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';
  import handsPhoto from '$lib/assets/van-and-david-hands.jpg?w=1440;2880&aspect=16:11&fit=cover&position=center&format=webp&quality=90&effort=max&withoutEnlargement&as=srcset';

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

<!-- ───────────────────────── header + language toggle ────────────────── -->
<header class="mx-auto max-w-screen-lg px-4 pt-8 text-center space-y-4 scroll-smooth">
  <h1 class="text-4xl font-extrabold tracking-tight">{copyStrings['titulo'][locale]}</h1>
  <div class="inline-flex gap-2 text-sm">
    <button
      on:click={() => switchLanguage('en')}
      class="px-3 py-1 rounded border transition-colors
             {locale === 'en' ? 'border-white bg-zinc-700 text-white' : 'border-zinc-700'}">EN</button>
    <button
      on:click={() => switchLanguage('es')}
      class="px-3 py-1 rounded border transition-colors
             {locale === 'es' ? 'border-white bg-zinc-700 text-white' : 'border-zinc-700'}">ES</button>
  </div>
</header>

<!-- ───────────────────────── hero blocks + descriptive content ───────── -->
{#each heroSections as s}
  <!-- full‑width hero image -->
  <section id={s.id}
           class="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]
                  h-[70vh] sm:h-[90vh] overflow-hidden">
    <img srcset={s.photo} sizes="100vw" alt={s.alt}
         class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h2 class="text-white text-4xl sm:text-6xl font-bold drop-shadow-xl">
        {copyStrings[s.key][locale]}
      </h2>
    </div>
  </section>

  <!-- descriptive markdown (larger type) -->
  <div class="mx-auto max-w-screen-lg px-4">
    <div class="hero-more prose prose-xl md:prose-2xl mx-auto py-12" tabindex="-1">
      {@html copyStrings[s.moreKey][locale]}
    </div>
  </div>
{/each}

<!-- ───────────────────────── dresscode & extra info ──────────────────── -->
<div class="mx-auto max-w-screen-lg px-4 space-y-16">
  <!-- dress code -->
  <section id="dresscode" class="space-y-8">
    <h2 class="text-3xl font-bold text-center">{copyStrings['dresscode'][locale]}</h2>
    <div class="hero-more prose prose-xl md:prose-2xl mx-auto">
      {@html copyStrings['dresscodeMas'][locale]}
    </div>
  </section>

  <!-- información libre -->
  <section id="informacion" class="hero-more prose prose-xl md:prose-2xl mx-auto">
    {@html copyStrings['informacion'][locale]}
  </section>
</div>

<style>
  /* enlarge basic paragraph/link styling for hero‑more sections */
  :global(.hero-more p) {
    @apply mb-6 text-lg sm:text-xl leading-relaxed;
  }
  :global(.hero-more a) {
    @apply underline text-blue-700 hover:text-blue-900 transition-colors;
  }
</style>
