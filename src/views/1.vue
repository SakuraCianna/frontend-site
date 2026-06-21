<template>
  <div id="page-404" class="not-found-page">
    <nav class="site-nav" aria-label="Primary navigation">
      <RouterLink class="brand-link" to="/" aria-label="nexto home">
        <img :src="logoUrl" alt="" />
        <span>nexto.</span>
      </RouterLink>

      <div class="nav-links" aria-label="Desktop navigation links">
        <a v-for="item in navItems" :key="item.label" href="#page-404">
          {{ item.label }}
          <span v-if="item.hasDropdown" class="dropdown-mark" aria-hidden="true">⌄</span>
        </a>
      </div>

      <button class="connect-button desktop-connect" type="button">
        <span class="button-icon" aria-hidden="true">
          <svg viewBox="0 0 12 12" focusable="false">
            <path d="M4.4 2.4 8 6l-3.6 3.6" />
          </svg>
        </span>
        <span>Let's Connect</span>
      </button>

      <button
        class="menu-toggle"
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

    <div id="mobile-navigation" class="mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <div class="mobile-menu-inner" aria-label="Mobile navigation links">
        <a v-for="item in navItems" :key="item.label" href="#page-404" @click="closeMenu">
          {{ item.label }}
          <span v-if="item.hasDropdown" class="dropdown-mark" aria-hidden="true">⌄</span>
        </a>
        <button class="connect-button mobile-connect" type="button" @click="closeMenu">
          <span class="button-icon" aria-hidden="true">
            <svg viewBox="0 0 12 12" focusable="false">
              <path d="M4.4 2.4 8 6l-3.6 3.6" />
            </svg>
          </span>
          <span>Let's Connect</span>
        </button>
      </div>
    </div>

    <main class="hero-area" aria-labelledby="not-found-title">
      <section class="hero-message">
        <p class="lost-text">Seems you've wandered off...</p>
        <div class="title-wrapper">
          <svg class="symbol-decoration cloud-decoration" viewBox="0 0 24 24" aria-hidden="true">
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
          <h1 id="not-found-title">Whoops! Nothing here yet</h1>
          <svg class="symbol-decoration heart-decoration" viewBox="0 0 24 24" aria-hidden="true">
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
        <p class="subtext">
          Grab a 30-minute <span>chat</span> to explore your ideas, scope, and vision. We'll find
          common ground, sync and <span>define</span> a clear roadmap.
        </p>
      </section>

      <section class="navigation-cards" aria-label="Helpful navigation">
        <RouterLink
          v-for="card in cards"
          :key="card.title"
          class="nav-card"
          :to="card.to"
          :aria-label="card.title"
        >
          <span class="card-icon" aria-hidden="true" v-html="card.icon"></span>
          <span class="card-copy">
            <strong>{{ card.title }}</strong>
            <small>{{ card.subtitle }}</small>
          </span>
          <span class="card-arrow" aria-hidden="true">&rsaquo;</span>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface NavItem {
  label: string
  hasDropdown?: boolean
}

interface NavigationCard {
  title: string
  subtitle: string
  to: string
  icon: string
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
    icon: `
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    `,
  },
  {
    title: 'Showcase',
    subtitle: 'Where we walk the walk',
    to: '/',
    icon: `
      <svg viewBox="0 0 24 24" focusable="false">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    `,
  },
]

const isMenuOpen = ref(false)

function toggleMenu(): void {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu(): void {
  isMenuOpen.value = false
}

onMounted(() => {
  document.documentElement.classList.add('not-found-document')
  document.body.classList.add('not-found-body')
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('not-found-document')
  document.body.classList.remove('not-found-body')
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0&display=swap');

:global(html.not-found-document),
:global(body.not-found-body) {
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}

:global(body.not-found-body) {
  display: flex;
  flex-direction: column;
  background:
    url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png')
      center 40% / contain fixed no-repeat,
    linear-gradient(to top left, #f5f5f5, #f7f7f7) fixed no-repeat;
}

:global(body.not-found-body #app) {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.not-found-page {
  --text-main: #1a1a1a;
  --text-secondary: #888888;
  --bg-page: #f5f5f5;
  --card-bg: #ffffff;

  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  color: var(--text-main);
  background:
    url('https://pub-e68758f43067417dba612b2371819aa1.r2.dev/viktor-components/alien-spaceship.png')
      center 40% / contain fixed no-repeat,
    linear-gradient(to top left, #f5f5f5, #f7f7f7) fixed no-repeat;
  font-family: 'DM Sans', Arial, sans-serif;
}

.site-nav {
  position: relative;
  z-index: 30;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: min(100%, 1100px);
  margin: 0 auto;
  padding: 28px 40px;
}

.site-nav::after {
  position: absolute;
  right: 40px;
  bottom: 0;
  left: 40px;
  height: 1px;
  content: '';
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.08) 2px, transparent 2px);
  background-size: 6px 1px;
}

.brand-link {
  display: inline-flex;
  gap: 9px;
  align-items: center;
  justify-self: start;
  color: #111111;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.3px;
}

.brand-link img {
  display: block;
  width: auto;
  height: 28px;
  filter: brightness(0);
}

.nav-links {
  display: flex;
  gap: 36px;
  align-items: center;
  justify-self: center;
}

.nav-links a {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  color: var(--text-main);
  font-size: 14px;
  font-weight: 400;
  opacity: 0.65;
  transition: opacity 180ms ease;
}

.nav-links a:hover {
  opacity: 1;
}

.dropdown-mark {
  position: relative;
  top: -1px;
  font-size: 12px;
  line-height: 1;
}

.connect-button {
  display: inline-flex;
  gap: 10px;
  align-items: center;
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

.desktop-connect {
  justify-self: end;
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

.menu-toggle {
  position: relative;
  z-index: 40;
  display: none;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  justify-self: end;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  color: #111111;
  background: transparent;
  cursor: pointer;
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

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 92px 28px 32px;
  background: rgba(247, 247, 247, 0.96);
  backdrop-filter: blur(18px);
  transform: translateX(100%);
  transition: transform 640ms cubic-bezier(0.77, 0, 0.175, 1);
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-menu-inner {
  display: grid;
  width: min(100%, 440px);
}

.mobile-menu a {
  display: inline-flex;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: #111111;
  font-size: 38px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1.5px;
}

.mobile-connect {
  width: fit-content;
  min-height: 44px;
  margin-top: 28px;
  padding: 6px 20px 6px 6px;
  font-size: 15px;
}

.mobile-connect .button-icon {
  width: 32px;
  height: 32px;
}

.hero-area {
  z-index: 1;
  display: grid;
  flex: 1 1 auto;
  grid-template-rows: minmax(0, 1fr) auto;
  justify-items: center;
  width: min(100%, 700px);
  min-height: 0;
  margin: 0 auto;
  padding: 20px 20px 30px;
  text-align: center;
}

.hero-message {
  align-self: center;
}

.lost-text {
  margin: 0 0 12px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 400;
}

.title-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 14px;
}

h1 {
  max-width: 620px;
  margin: 0;
  color: #0f0f0f;
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -1.5px;
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
  animation: floatSlow 5s ease-in-out infinite;
}

.cloud-decoration {
  top: -18px;
  left: -24px;
  width: 42px;
  height: 42px;
  animation-delay: 300ms;
}

.heart-decoration {
  right: 20px;
  bottom: -15px;
  width: 32px;
  height: 32px;
  animation-duration: 4.5s;
  animation-delay: 1s;
}

.subtext {
  max-width: 470px;
  margin: 0 auto 28px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
}

.subtext span {
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

.navigation-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(100%, 460px);
  margin-top: auto;
}

.nav-card {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  min-height: 86px;
  padding: 18px 22px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  color: var(--text-main);
  background: var(--card-bg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.nav-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
}

.card-icon {
  display: grid;
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  background: #eaecf0;
  transition: transform 200ms ease;
}

.nav-card:hover .card-icon {
  transform: scale(1.05);
}

.card-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.card-icon :deep(path),
.card-icon :deep(circle) {
  fill: #111111;
}

.card-icon :deep(path + path),
.card-icon :deep(circle + circle) {
  fill: #ffffff;
}

.card-copy {
  display: grid;
  flex: 1 1 auto;
  gap: 5px;
  min-width: 0;
  text-align: left;
}

.card-copy strong {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.1;
}

.card-copy small {
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 400;
}

.card-arrow {
  flex: 0 0 auto;
  color: #111111;
  font-size: 21px;
  line-height: 1;
  transition: transform 200ms ease;
}

.nav-card:hover .card-arrow {
  transform: translateX(6px);
}

@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}

@media (max-width: 768px) {
  :global(body.not-found-body),
  .not-found-page {
    background-position: center 45%, center;
    background-size: 90%, cover;
  }

  .site-nav {
    grid-template-columns: 1fr auto;
    padding: 20px;
  }

  .site-nav::after {
    right: 20px;
    left: 20px;
  }

  .nav-links,
  .desktop-connect {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .hero-area {
    padding: 14px 20px 22px;
  }

  h1 {
    font-size: 30px;
  }

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

  .navigation-cards {
    gap: 10px;
    width: 100%;
  }

  .nav-card {
    min-height: 76px;
    padding: 15px 18px;
  }

  .card-icon {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 480px) {
  :global(body.not-found-body),
  .not-found-page {
    background-size: 100%, cover;
  }

  .brand-link {
    font-size: 18px;
  }

  .brand-link img {
    height: 24px;
  }

  .mobile-menu {
    padding: 84px 22px 28px;
  }

  .mobile-menu a {
    padding: 20px 0;
    font-size: 32px;
  }

  .lost-text {
    margin-bottom: 10px;
    font-size: 14px;
  }

  h1 {
    font-size: 26px;
    letter-spacing: -1.1px;
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

  .subtext {
    margin-bottom: 18px;
    font-size: 13px;
    line-height: 1.55;
  }

  .nav-card {
    min-height: 70px;
    padding: 13px 15px;
  }

  .card-icon {
    width: 38px;
    height: 38px;
  }
}
</style>
