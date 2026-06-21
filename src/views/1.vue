<template>
  <main class="lithos-page">
    <nav class="topbar" aria-label="Lithos navigation">
      <a class="brand" href="#hero" aria-label="Lithos home">Lithos</a>
      <div class="nav-links" aria-label="Primary links">
        <a v-for="item in navItems" :key="item" href="#hero">{{ item }}</a>
      </div>
      <RouterLink class="signup" to="/">Back Home</RouterLink>
    </nav>

    <section id="hero" class="hero" aria-labelledby="hero-title">
      <div class="copy-panel">
        <p class="kicker">Interactive strata archive</p>
        <h1 id="hero-title">Layers hold tales of time</h1>
        <p class="lead">
          Every ridge, sediment record, and glowing fault line is treated as a living interface for discovery.
        </p>
        <div class="actions" aria-label="Hero actions">
          <a class="primary-action" href="#field-notes">Start Digging</a>
          <span class="cursor-note">drag to inspect</span>
        </div>
      </div>

      <div class="terrain-stage" aria-hidden="true">
        <span v-for="stratum in strata" :key="stratum" :class="['stratum', stratum]"></span>
        <span class="scanline"></span>
        <span class="pointer"></span>
      </div>
    </section>

    <section id="field-notes" class="field-notes" aria-label="Field notes">
      <article v-for="metric in metrics" :key="metric.label" class="metric-card">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
const navItems = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour']
const strata = ['stratum-one', 'stratum-two', 'stratum-three', 'stratum-four']
const metrics = [
  { value: '4.8b', label: 'years in motion' },
  { value: '27', label: 'guided formations' },
  { value: '91%', label: 'field retention' },
]
</script>

<style scoped>
.lithos-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  color: #fff6ea;
  font-family: Georgia, 'Times New Roman', serif;
  background:
    radial-gradient(circle at 24% 76%, rgba(71, 111, 55, 0.28), transparent 18rem),
    radial-gradient(circle at 78% 55%, rgba(255, 75, 37, 0.22), transparent 19rem),
    linear-gradient(180deg, #050505 0%, #080604 58%, #030303 100%);
}

.lithos-page::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, transparent, black 20%, black 78%, transparent);
}

.topbar {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  width: min(1680px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0;
}

.brand {
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.08em;
}

.brand::before {
  display: inline-block;
  width: 14px;
  height: 10px;
  margin-right: 6px;
  content: '';
  background: #fff6ea;
  clip-path: polygon(0 0, 100% 45%, 18% 100%);
}

.nav-links {
  justify-self: center;
  display: flex;
  gap: 4px;
  padding: 7px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.nav-links a,
.signup {
  border-radius: 999px;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
}

.nav-links a {
  padding: 10px 14px;
  color: rgba(255, 246, 234, 0.78);
}

.nav-links a:hover {
  color: #170d08;
  background: #fff6ea;
}

.signup {
  padding: 13px 18px;
  color: #170d08;
  background: #fff6ea;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) minmax(420px, 1.2fr);
  align-items: center;
  width: min(1680px, calc(100% - 48px));
  min-height: calc(100vh - 96px);
  margin: 0 auto;
}

.copy-panel {
  position: relative;
  z-index: 4;
  align-self: start;
  padding-top: clamp(40px, 8vw, 116px);
}

.kicker {
  margin: 0 0 18px;
  color: #ff8255;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

h1 {
  max-width: 720px;
  margin: 0;
  font-size: clamp(4.1rem, 8.6vw, 10.5rem);
  font-weight: 500;
  line-height: 0.78;
  letter-spacing: -0.105em;
  text-wrap: balance;
}

.lead {
  max-width: 420px;
  margin: 34px 0 0;
  color: #b8afa3;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.65;
}

.actions {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-top: 28px;
}

.primary-action {
  padding: 15px 22px;
  border-radius: 999px;
  color: #1c0e08;
  background: linear-gradient(135deg, #ff7d4f, #ff4e24);
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.85rem;
  font-weight: 900;
  box-shadow: 0 18px 44px rgba(255, 82, 36, 0.28);
}

.cursor-note {
  color: #81796f;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.terrain-stage {
  position: relative;
  z-index: 2;
  height: clamp(520px, 68vw, 900px);
  transform: translateX(-4vw) rotate(-4deg);
}

.stratum {
  position: absolute;
  left: 0;
  display: block;
  width: 116%;
  border-radius: 52% 48% 0 0;
  filter: drop-shadow(0 0 28px rgba(255, 86, 42, 0.18));
}

.stratum-one {
  right: -18%;
  bottom: 14%;
  height: 42%;
  border-top: 2px solid rgba(255, 92, 48, 0.9);
  background:
    radial-gradient(circle at 20% 65%, rgba(93, 135, 75, 0.48), transparent 10rem),
    repeating-linear-gradient(166deg, transparent 0 17px, rgba(255, 255, 255, 0.28) 18px, transparent 21px),
    linear-gradient(180deg, rgba(255, 80, 42, 0.18), rgba(6, 6, 6, 0.18));
}

.stratum-two {
  bottom: 28%;
  height: 34%;
  border-top: 1px solid rgba(255, 149, 91, 0.72);
  background: repeating-linear-gradient(154deg, transparent 0 12px, rgba(255, 255, 255, 0.19) 14px, transparent 16px);
  opacity: 0.84;
}

.stratum-three {
  bottom: 6%;
  height: 24%;
  background:
    radial-gradient(circle at 30% 58%, rgba(75, 118, 57, 0.52), transparent 8rem),
    repeating-linear-gradient(172deg, transparent 0 16px, rgba(255, 255, 255, 0.12) 18px, transparent 19px);
  opacity: 0.9;
}

.stratum-four {
  right: -12%;
  bottom: 46%;
  height: 18%;
  border-top: 1px solid rgba(244, 244, 244, 0.32);
  background: repeating-linear-gradient(160deg, transparent 0 10px, rgba(255, 255, 255, 0.16) 12px, transparent 13px);
  opacity: 0.6;
}

.scanline {
  position: absolute;
  top: 13%;
  right: 30%;
  width: 1px;
  height: 54%;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.82), transparent);
}

.pointer {
  position: absolute;
  left: 20%;
  bottom: 27%;
  width: 28px;
  height: 42px;
  background: #fff6ea;
  clip-path: polygon(0 0, 100% 62%, 58% 68%, 78% 100%, 58% 100%, 38% 70%, 0 88%);
  filter: drop-shadow(0 8px 6px rgba(0, 0, 0, 0.55));
  transform: rotate(-19deg);
}

.field-notes {
  position: absolute;
  right: clamp(24px, 5vw, 90px);
  bottom: clamp(24px, 4vw, 64px);
  z-index: 8;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
}

.metric-card {
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(14px);
}

.metric-card strong {
  display: block;
  color: #fff6ea;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 1.55rem;
}

.metric-card span {
  color: #978f83;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .topbar {
    grid-template-columns: 1fr auto;
  }

  .nav-links {
    display: none;
  }

  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-bottom: 260px;
  }

  .terrain-stage {
    position: absolute;
    right: -18%;
    bottom: 0;
    left: 18%;
    height: 520px;
    transform: rotate(-6deg);
  }

  .field-notes {
    right: 24px;
    left: 24px;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .topbar,
  .hero {
    width: min(100% - 32px, 1680px);
  }

  h1 {
    font-size: clamp(3.7rem, 18vw, 5.6rem);
  }

  .actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
