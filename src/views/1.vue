<template>
  <div
    id="page-404"
    ref="pageRef"
    class="not-found-page relative flex min-h-dvh flex-1 flex-col overflow-hidden px-5 text-[#111] [font-family:'DM_Sans',Arial,sans-serif]"
  >
    <nav
      class="motion-nav site-nav relative z-30 mx-auto grid w-full max-w-[1100px] grid-cols-[1fr_auto_1fr] items-center px-0 py-7 md:px-10"
      aria-label="Primary navigation"
    >
      <RouterLink
        class="brand-link inline-flex items-center gap-[9px] justify-self-start text-xl font-black tracking-[-0.3px]"
        to="/"
        aria-label="nexto home"
      >
        <img class="h-7 w-auto brightness-0" :src="logoUrl" alt="" />
        <span>nexto.</span>
      </RouterLink>

      <div class="hidden items-center gap-9 justify-self-center md:flex" aria-label="Desktop navigation links">
        <a
          v-for="item in navItems"
          :key="item.label"
          class="inline-flex items-center gap-1 text-sm font-normal opacity-65 transition-opacity duration-200 hover:opacity-100"
          href="#page-404"
        >
          {{ item.label }}
          <span v-if="item.hasDropdown" class="relative -top-px text-xs leading-none" aria-hidden="true">
            ⌄
          </span>
        </a>
      </div>

      <button class="connect-button hidden justify-self-end md:inline-flex" type="button">
        <span class="button-icon" aria-hidden="true">
          <svg viewBox="0 0 12 12" focusable="false">
            <path d="M4.4 2.4 8 6l-3.6 3.6" />
          </svg>
        </span>
        <span>Let's Connect</span>
      </button>

      <button
        class="menu-toggle relative z-40 flex h-9 w-9 flex-col items-center justify-center gap-[5px] justify-self-end bg-transparent p-0 text-[#111] md:hidden"
        :class="{ 'is-active': isMenuOpen }"
        type="button"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-navigation"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>

    <div
      id="mobile-navigation"
      ref="menuPanelRef"
      class="mobile-menu fixed inset-0 z-20 flex translate-x-full items-center justify-start bg-[#f7f7f7]/95 px-7 pb-8 pt-[92px] backdrop-blur-[18px]"
      :class="{ 'is-open': isMenuOpen }"
    >
      <div class="grid w-full max-w-[440px]" aria-label="Mobile navigation links">
        <a
          v-for="item in navItems"
          :key="item.label"
          class="inline-flex justify-between border-b border-black/10 py-6 text-[38px] font-black leading-none tracking-[-1.5px]"
          href="#page-404"
          @click="closeMenu"
        >
          {{ item.label }}
          <span v-if="item.hasDropdown" class="text-2xl" aria-hidden="true">⌄</span>
        </a>
        <button class="connect-button mt-7 inline-flex min-h-11 w-fit px-5 py-1.5 pl-1.5 text-[15px]" type="button" @click="closeMenu">
          <span class="button-icon size-8" aria-hidden="true">
            <svg viewBox="0 0 12 12" focusable="false">
              <path d="M4.4 2.4 8 6l-3.6 3.6" />
            </svg>
          </span>
          <span>Let's Connect</span>
        </button>
      </div>
    </div>

    <main
      class="relative z-10 mx-auto grid min-h-0 w-full max-w-[700px] flex-1 grid-rows-[minmax(0,1fr)_auto] justify-items-center pb-[30px] pt-5 text-center"
      aria-labelledby="not-found-title"
    >
      <section class="motion-hero self-center">
        <p class="motion-copy mb-3 text-[15px] font-normal text-[#888]">Seems you've wandered off...</p>

        <div class="relative mb-3.5 inline-block">
          <svg class="motion-cloud symbol-decoration cloud-decoration" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="cloud-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="50%" stop-color="#f7b2fb" />
                <stop offset="80%" stop-color="#786ef1" />
                <stop offset="100%" stop-color="#5588fb" />
              </linearGradient>
            </defs>
            <path
              d="M19.4 10.1A7.5 7.5 0 0 0 5.3 8.2 6 6 0 0 0 6 20h13a5 5 0 0 0 .4-9.9Z"
              fill="url(#cloud-fill)"
            />
          </svg>

          <h1
            id="not-found-title"
            class="motion-title mx-auto max-w-[620px] text-[26px] font-medium leading-[1.08] tracking-[-1.1px] text-[#0f0f0f] sm:text-[30px] sm:tracking-[-1.5px] md:text-[clamp(34px,5vw,52px)]"
          >
            Whoops! Nothing here yet
          </h1>

          <svg class="motion-heart symbol-decoration heart-decoration" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="heart-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="50%" stop-color="#f7b2fb" />
                <stop offset="80%" stop-color="#786ef1" />
                <stop offset="100%" stop-color="#5588fb" />
              </linearGradient>
            </defs>
            <path
              d="m12 21.3-1.5-1.3C5.4 15.4 2 12.3 2 8.5 2 5.4 4.4 3 7.5 3c1.7 0 3.4.8 4.5 2.1A6 6 0 0 1 16.5 3C19.6 3 22 5.4 22 8.5c0 3.8-3.4 6.9-8.5 11.5L12 21.3Z"
              fill="url(#heart-fill)"
            />
          </svg>
        </div>

        <p class="motion-copy mx-auto mb-5 max-w-[470px] text-[13px] font-normal leading-[1.55] text-[#888] sm:mb-7 sm:text-sm sm:leading-[1.7]">
          Grab a 30-minute <span class="keyword-tag">chat</span> to explore your ideas, scope, and
          vision. We'll find common ground, sync and <span class="keyword-tag">define</span> a clear
          roadmap.
        </p>
      </section>

      <section class="grid w-full max-w-[460px] gap-2.5 sm:gap-3" aria-label="Helpful navigation">
        <RouterLink
          v-for="card in cards"
          :key="card.title"
          class="motion-card nav-card group flex min-h-[70px] items-center justify-between gap-4 rounded-[18px] border border-black/[0.05] bg-white px-[15px] py-[13px] text-left shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] sm:min-h-[86px] sm:px-[22px] sm:py-[18px]"
          :to="card.to"
          :aria-label="card.title"
        >
          <span
            class="grid size-[38px] shrink-0 place-items-center rounded-full bg-[#eaecf0] transition-transform duration-200 group-hover:scale-105 sm:size-12"
            aria-hidden="true"
          >
            <svg v-if="card.icon === 'home'" class="size-5 sm:size-6" viewBox="0 0 24 24" focusable="false">
              <path fill="#111" d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
              <path fill="#fff" d="M9 21V12h6v9" />
            </svg>
            <svg v-else class="size-5 sm:size-6" viewBox="0 0 24 24" focusable="false">
              <circle cx="12" cy="12" r="9" fill="#111" />
              <circle cx="12" cy="12" r="3.5" fill="#fff" />
            </svg>
          </span>

          <span class="grid min-w-0 flex-1 gap-1">
            <strong class="text-[15px] font-semibold leading-tight">{{ card.title }}</strong>
            <small class="truncate text-xs font-normal text-[#888]">{{ card.subtitle }}</small>
          </span>

          <span class="text-[21px] leading-none transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">
            &rsaquo;
          </span>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

type CardIcon = 'home' | 'showcase'

interface NavItem {
  label: string
  hasDropdown?: boolean
}

interface NavigationCard {
  title: string
  subtitle: string
  to: string
  icon: CardIcon
}

const logoUrl = 'https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/Tests/logoipsum-415.svg'

const navItems: NavItem[] = [
  { label: 'Our Team' },
  { label: 'Solutions', hasDropdown: true },
  { label: 'Showcase' },
  { label: 'News' },
]

const cards: NavigationCard[] = [
  {
    title: 'Main Page',
    subtitle: 'Back where it all begins...',
    to: '/',
    icon: 'home',
  },
  {
    title: 'Showcase',
    subtitle: 'Where we walk the walk',
    to: '/',
    icon: 'showcase',
  },
]

const isMenuOpen = ref(false)
const pageRef = ref<HTMLElement | null>(null)
const menuPanelRef = ref<HTMLElement | null>(null)

let reduceMotion = false
let revertAnimations: (() => void) | undefined

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

watch(isMenuOpen, (isOpen) => {
  if (!menuPanelRef.value) {
    return
  }

  gsap.to(menuPanelRef.value, {
    xPercent: isOpen ? 0 : 100,
    duration: reduceMotion ? 0 : 0.68,
    ease: 'power4.inOut',
  })
})

onMounted(() => {
  document.documentElement.classList.add('not-found-document')
  document.body.classList.add('not-found-body')

  reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  if (menuPanelRef.value) {
    gsap.set(menuPanelRef.value, { xPercent: 100 })
  }

  if (!pageRef.value || reduceMotion) {
    return
  }

  const context = gsap.context(() => {
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from('.motion-nav', { y: -22, duration: 0.7 })
      .from('.motion-hero > *', { y: 18, duration: 0.7, stagger: 0.08 }, '-=0.35')
      .from('.motion-card', { y: 22, duration: 0.65, stagger: 0.1 }, '-=0.25')

    gsap.to('.motion-cloud', {
      y: -10,
      rotation: 3,
      duration: 5,
      delay: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.motion-heart', {
      y: -10,
      rotation: 3,
      duration: 4.5,
      delay: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, pageRef.value)

  revertAnimations = () => context.revert()
})

onBeforeUnmount(() => {
  revertAnimations?.()
  document.documentElement.classList.remove('not-found-document')
  document.body.classList.remove('not-found-body')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&display=swap');

:global(html.not-found-document),
:global(body.not-found-body) {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}

:global(body.not-found-body) {
  display: flex;
  flex-direction: column;
}

:global(body.not-found-body #app) {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.not-found-page {
  background:
    url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png')
      center 40% / contain fixed no-repeat,
    linear-gradient(to top left, #f5f5f5, #f7f7f7) fixed no-repeat;
}

.site-nav::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: '';
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.08) 2px, transparent 2px);
  background-size: 6px 1px;
}

.connect-button {
  align-items: center;
  gap: 10px;
  min-height: 34px;
  padding: 5px 16px 5px 5px;
  border: 0;
  border-radius: 40px;
  color: #ffffff;
  background: linear-gradient(180deg, #2c2c2c 0%, #111111 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font: 500 13px/1 'DM Sans', Arial, sans-serif;
  transition: filter 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.connect-button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 7px 22px rgba(0, 0, 0, 0.22);
}

.button-icon {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 50%;
  color: #111111;
  background: #ffffff;
}

.button-icon svg {
  width: 12px;
  height: 12px;
}

.button-icon path {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transition: opacity 220ms ease, transform 220ms ease;
}

.menu-toggle.is-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.symbol-decoration {
  position: absolute;
  display: inline-block;
  overflow: visible;
  filter:
    drop-shadow(0 1px 0 #ffffff)
    drop-shadow(1px 0 0 #ffffff)
    drop-shadow(-1px 0 0 #ffffff)
    drop-shadow(0 -1px 0 #ffffff);
}

.cloud-decoration {
  top: -12px;
  left: -22px;
  width: 27px;
  height: 27px;
}

.heart-decoration {
  right: -16px;
  bottom: -20px;
  width: 22px;
  height: 22px;
}

.keyword-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 12px;
  border-radius: 6px;
  color: #444850;
  background: #e0e2e7;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.4;
}

@media (min-width: 640px) {
  .cloud-decoration {
    top: -12px;
    left: -24px;
    width: 32px;
    height: 32px;
  }

  .heart-decoration {
    right: -14px;
    bottom: -18px;
    width: 26px;
    height: 26px;
  }
}

@media (min-width: 768px) {
  .site-nav::after {
    right: 40px;
    left: 40px;
  }

  .cloud-decoration {
    top: -18px;
    left: -24px;
    width: 42px;
    height: 42px;
  }

  .heart-decoration {
    right: 20px;
    bottom: -15px;
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 768px) {
  .not-found-page {
    background-position: center 45%, center;
    background-size: 90%, cover;
  }
}

@media (max-width: 480px) {
  .not-found-page {
    background-size: 100%, cover;
  }
}
</style>
