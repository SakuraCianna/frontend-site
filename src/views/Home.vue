<template>
  <main class="gallery-page">
    <section class="hero-strip" aria-labelledby="collection-title">
      <h1 id="collection-title">前端复刻收藏馆</h1>
    </section>

    <section v-if="sites.length" class="site-grid" aria-label="复刻作品预览">
      <article
        v-for="site in sites"
        :key="site.id"
        class="site-card"
        data-testid="site-card"
      >
        <RouterLink class="card-hit-area" :to="site.route" :aria-label="`打开 ${site.fileName}`">
          <div class="preview-frame">
            <img v-if="site.coverUrl" :src="site.coverUrl" :alt="`${site.fileName} 预览图`" />
            <div v-else class="fallback-preview" aria-hidden="true">
              <span class="replica-number">{{ paddedId(site.id) }}</span>
              <strong>{{ site.fileName }}</strong>
              <small>封面放到 src/assets/{{ site.id }}/cover.webp</small>
            </div>
          </div>

          <div class="card-body">
            <div>
              <span class="entry-label">作品 {{ site.id }}</span>
              <h2>{{ site.fileName }}</h2>
            </div>
            <span class="open-pill">打开</span>
          </div>
        </RouterLink>
      </article>
    </section>

    <section v-else class="empty-state" aria-label="暂无复刻作品">
      <strong>还没有编号 Vue 文件。</strong>
      <span>创建 <code>src/views/1.vue</code> 开始收藏。</span>
    </section>
  </main>
</template>

<script setup lang="ts">
import { createReplicaPreviews, type ReplicaPreview } from '../replicas'

const pageModules = import.meta.glob('./[0-9]*.vue')
const coverModules = import.meta.glob('../assets/*/cover.{avif,jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const sites: ReplicaPreview[] = createReplicaPreviews(
  Object.keys(pageModules),
  Object.entries(coverModules),
)

function paddedId(id: number): string {
  return String(id).padStart(2, '0')
}
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding: clamp(22px, 3.6vw, 48px);
  overflow-x: hidden;
  color: #f7f2e7;
  font-family: Georgia, 'Times New Roman', serif;
  scrollbar-width: none;
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 115, 45, 0.18), transparent 24rem),
    radial-gradient(circle at 88% 2%, rgba(65, 98, 175, 0.2), transparent 30rem),
    linear-gradient(135deg, #171310 0%, #161817 48%, #0f1013 100%);
}

.gallery-page::-webkit-scrollbar,
:global(html::-webkit-scrollbar),
:global(body::-webkit-scrollbar) {
  width: 0;
  height: 0;
  display: none;
}

:global(html),
:global(body) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hero-strip {
  display: grid;
  gap: 20px;
  max-width: 1760px;
  margin: 0 auto clamp(28px, 4vw, 52px);
}

h1 {
  max-width: none;
  margin: 0;
  overflow: hidden;
  font-size: clamp(1.95rem, calc(7vw - 4px), 6.75rem);
  line-height: 1;
  letter-spacing: -0.085em;
  text-overflow: clip;
  white-space: nowrap;
}

.empty-state code {
  color: #fff2d8;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}

.site-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(18px, 2vw, 28px);
  max-width: 1760px;
  margin: 0 auto;
}

.site-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  background: #242423;
  box-shadow: 0 28px 72px rgba(0, 0, 0, 0.32);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.site-card:hover {
  border-color: rgba(255, 147, 82, 0.46);
  transform: translateY(-6px);
  box-shadow: 0 38px 90px rgba(0, 0, 0, 0.46);
}

.card-hit-area {
  display: grid;
  min-height: 100%;
}

.preview-frame {
  position: relative;
  min-height: clamp(230px, 18vw, 340px);
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 18%, rgba(255, 133, 74, 0.28), transparent 13rem),
    radial-gradient(circle at 22% 82%, rgba(77, 120, 88, 0.22), transparent 14rem),
    #111110;
}

.preview-frame img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
}

.fallback-preview {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: end;
  gap: 12px;
  padding: clamp(22px, 2vw, 34px);
}

.fallback-preview::before {
  position: absolute;
  inset: 16% -12% auto auto;
  width: 62%;
  height: 58%;
  content: '';
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: repeating-linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.16) 0 1px,
    transparent 1px 18px
  );
  transform: rotate(-12deg);
}

.replica-number {
  position: relative;
  z-index: 1;
  color: rgba(255, 255, 255, 0.42);
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.22em;
}

.fallback-preview strong {
  position: relative;
  z-index: 1;
  color: #fff8ed;
  font-size: clamp(3rem, 5vw, 6.4rem);
  line-height: 0.82;
  letter-spacing: -0.11em;
}

.fallback-preview small {
  position: relative;
  z-index: 1;
  color: #ff9457;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-body {
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
  padding: clamp(18px, 2vw, 26px);
}

.entry-label {
  display: block;
  margin-bottom: 7px;
  color: #918a80;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.card-body h2 {
  margin: 0;
  color: #fff7ea;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-size: clamp(1.35rem, 1.5vw, 1.9rem);
  letter-spacing: -0.05em;
}

.open-pill {
  flex: 0 0 auto;
  padding: 12px 16px;
  border-radius: 18px;
  color: #1f130e;
  background: #ff9457;
  font-family: 'Trebuchet MS', Verdana, sans-serif;
  font-weight: 900;
}

.empty-state {
  display: grid;
  gap: 10px;
  max-width: 620px;
  margin: 0 auto;
  padding: 34px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  color: #c4baad;
  background: rgba(255, 255, 255, 0.06);
  font-family: 'Trebuchet MS', Verdana, sans-serif;
}

.empty-state strong {
  color: #fff7ea;
  font-size: 1.5rem;
}

@media (max-width: 1320px) {
  .site-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .site-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .gallery-page {
    padding: 18px;
  }

  .site-grid {
    grid-template-columns: 1fr;
  }

  .card-body {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
