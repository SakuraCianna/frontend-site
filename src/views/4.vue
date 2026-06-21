<template>
  <main class="cinematic-page h-dvh overflow-hidden bg-black text-white">
    <video
      class="fixed inset-0 z-0 h-full w-full object-cover"
      :src="VIDEO_URL"
      :poster="posterUrl"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
    ></video>

    <div class="bottom-blur-overlay fixed inset-0 z-[1] pointer-events-none" aria-hidden="true"></div>

    <div class="relative z-10 flex h-dvh flex-col">
      <nav class="relative z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12 md:py-6">
        <RouterLink
          class="animate-blur-fade-up flex h-8 items-center text-lg font-semibold tracking-[0.24em] text-white md:h-10 md:text-xl"
          to="/"
          :style="animationDelay(0)"
          aria-label="Cinematic home"
        >
          CINEMATIC
        </RouterLink>

        <div class="hidden items-center gap-7 lg:flex" aria-label="Primary links">
          <a
            v-for="(item, index) in navItems"
            :key="item"
            class="animate-blur-fade-up text-sm text-white transition-colors hover:text-gray-300"
            href="#hero"
            :style="animationDelay(100 + index * 50)"
          >
            {{ item }}
          </a>
        </div>

        <div class="hidden items-center gap-3 sm:flex">
          <button
            class="liquid-glass animate-blur-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white md:px-6"
            type="button"
            :style="animationDelay(350)"
          >
            <span>Search</span>
            <IconSearch class="size-[18px]" />
          </button>

          <button
            class="liquid-glass animate-blur-fade-up grid size-10 place-items-center rounded-full text-white"
            type="button"
            :style="animationDelay(400)"
            aria-label="Profile"
          >
            <IconUser class="size-[18px]" />
          </button>
        </div>

        <button
          class="liquid-glass animate-blur-fade-up relative grid size-10 place-items-center rounded-full text-white lg:hidden"
          type="button"
          :style="animationDelay(350)"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation"
          aria-controls="mobile-menu"
          @click="toggleMenu"
        >
          <IconMenu
            class="absolute size-[18px] transition duration-500 ease-out"
            :class="isMenuOpen ? 'rotate-180 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'"
          />
          <IconX
            class="absolute size-[18px] transition duration-500 ease-out"
            :class="isMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-50 opacity-0'"
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        class="absolute left-0 right-0 top-[72px] z-40 border-y border-gray-800 bg-gray-900/95 px-4 py-4 shadow-2xl backdrop-blur-lg transition duration-500 ease-out lg:hidden"
        :class="isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'"
      >
        <div class="mx-auto grid max-w-3xl gap-1">
          <a
            v-for="(item, index) in navItems"
            :key="item"
            class="rounded-lg px-3 py-3 text-sm font-medium text-white transition duration-500 ease-out hover:bg-gray-800/50"
            :class="isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'"
            :style="{ transitionDelay: `${index * 50}ms` }"
            href="#hero"
            @click="closeMenu"
          >
            {{ item }}
          </a>

          <div class="mt-3 flex items-center gap-3 border-t border-gray-800 pt-4 sm:hidden">
            <button class="liquid-glass inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white" type="button">
              <span>Search</span>
              <IconSearch class="size-[18px]" />
            </button>
            <button class="liquid-glass grid size-10 place-items-center rounded-full text-white" type="button" aria-label="Profile">
              <IconUser class="size-[18px]" />
            </button>
          </div>
        </div>
      </div>

      <section
        id="hero"
        class="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6 md:px-12 md:pb-16"
        aria-labelledby="movie-title"
      >
        <div class="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div class="flex-1">
            <div
              class="animate-blur-fade-up mb-6 flex flex-wrap items-center gap-3 text-xs text-white sm:gap-6 sm:text-sm md:mb-8"
              :style="animationDelay(300)"
            >
              <span class="inline-flex items-center gap-2 font-medium">
                <IconStar class="size-4 fill-white sm:size-5" />
                8.7/10 IMDB
              </span>
              <span class="inline-flex items-center gap-2">
                <IconClock class="size-4 sm:size-5" />
                132 min
              </span>
              <span class="inline-flex items-center gap-2">
                <IconCalendar class="size-4 sm:size-5" />
                April, 2025
              </span>
            </div>

            <h1
              id="movie-title"
              class="animate-blur-fade-up mb-4 max-w-5xl text-3xl font-normal leading-[0.96] tracking-[-0.04em] text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl"
              :style="animationDelay(400)"
            >
              Step Through. Work Smarter.
            </h1>

            <p
              class="animate-blur-fade-up mb-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:mb-12 md:text-xl"
              :style="animationDelay(500)"
            >
              A voyage through forgotten realms, where past and future intertwine.
            </p>

            <div class="flex flex-wrap gap-3 sm:gap-4">
              <button
                class="animate-blur-fade-up inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:px-8 sm:py-3"
                type="button"
                :style="animationDelay(600)"
              >
                <IconPlay class="size-[18px] fill-black" />
                <span>Watch Now</span>
              </button>

              <button
                class="liquid-glass animate-blur-fade-up inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium text-white sm:px-8 sm:py-3"
                type="button"
                :style="animationDelay(700)"
              >
                Learn More
              </button>
            </div>
          </div>

          <div class="flex w-full justify-start gap-3 md:w-auto md:justify-end">
            <button
              class="liquid-glass animate-blur-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3"
              type="button"
              :style="animationDelay(800)"
            >
              <IconChevronLeft class="size-[18px]" />
              <span>Previous</span>
            </button>

            <button
              class="liquid-glass animate-blur-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white sm:px-6 sm:py-3"
              type="button"
              :style="animationDelay(900)"
            >
              <span>Next</span>
              <IconChevronRight class="size-[18px]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, ref, type Component } from 'vue'

import posterUrl from '../assets/4/poster.jpg'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4'

const navItems = ['Movies', 'TV Series', "Editor's Pick", 'Interviews', 'User Reviews']

const isMenuOpen = ref(false)
let previousTitle = ''

function animationDelay(ms: number): { animationDelay: string } {
  return {
    animationDelay: `${ms}ms`,
  }
}

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

function createIcon(name: string, paths: string[], fill = 'none'): Component {
  return defineComponent({
    name,
    props: {
      class: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return () =>
        h(
          'svg',
          {
            class: props.class,
            viewBox: '0 0 24 24',
            fill,
            stroke: 'currentColor',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'aria-hidden': 'true',
          },
          paths.map((path) => h('path', { d: path })),
        )
    },
  })
}

const IconSearch = createIcon('IconSearch', ['m21 21-4.34-4.34', 'M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z'])
const IconUser = createIcon('IconUser', ['M20 21a8 8 0 0 0-16 0', 'M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z'])
const IconMenu = createIcon('IconMenu', ['M4 6h16', 'M4 12h16', 'M4 18h16'])
const IconX = createIcon('IconX', ['M18 6 6 18', 'm6 6 12 12'])
const IconClock = createIcon('IconClock', ['M12 6v6l4 2', 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'])
const IconCalendar = createIcon('IconCalendar', ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'])
const IconPlay = createIcon('IconPlay', ['M5 5a2 2 0 0 1 3.01-1.72l11 6.5a2 2 0 0 1 0 3.44l-11 6.5A2 2 0 0 1 5 18z'], 'currentColor')
const IconStar = createIcon('IconStar', ['m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z'], 'currentColor')
const IconChevronLeft = createIcon('IconChevronLeft', ['m15 18-6-6 6-6'])
const IconChevronRight = createIcon('IconChevronRight', ['m9 18 6-6-6-6'])

onMounted(() => {
  previousTitle = document.title
  document.title = 'Cinematic'
})

onBeforeUnmount(() => {
  document.title = previousTitle
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.cinematic-page,
.cinematic-page * {
  font-family: Inter, sans-serif;
}

.bottom-blur-overlay {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  mask-image: linear-gradient(to top, black 0%, transparent 45%);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
}

.liquid-glass {
  position: relative;
  overflow: hidden;
  border: none;
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.liquid-glass::before {
  position: absolute;
  inset: 0;
  padding: 1.4px;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.45) 0%,
    rgba(255, 255, 255, 0.15) 20%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0.15) 80%,
    rgba(255, 255, 255, 0.45) 100%
  );
  content: '';
  pointer-events: none;
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

.animate-blur-fade-up {
  opacity: 0;
  animation: blurFadeUp 1s ease-out forwards;
}

@keyframes blurFadeUp {
  from {
    opacity: 0;
    filter: blur(20px);
    transform: translateY(40px);
  }

  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-blur-fade-up {
    opacity: 1;
    animation: none;
  }
}
</style>
