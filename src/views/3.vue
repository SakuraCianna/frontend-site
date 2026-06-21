<template>
  <main class="forma-page min-h-screen bg-white p-3 sm:p-4 md:p-6">
    <section
      class="landing-card relative min-h-[calc(100vh-24px)] overflow-hidden rounded-2xl sm:min-h-[calc(100vh-32px)] sm:rounded-3xl md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)]"
      aria-labelledby="forma-title"
      :style="{ backgroundImage: `url(${posterUrl})` }"
    >
      <video
        class="absolute inset-0 h-full w-full object-cover"
        :src="VIDEO_URL"
        :poster="posterUrl"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
      ></video>

      <div
        class="relative z-10 flex min-h-[calc(100vh-24px)] flex-col gap-6 p-4 sm:min-h-[calc(100vh-32px)] sm:p-6 md:min-h-[calc(100vh-48px)] md:p-8 lg:h-full"
      >
        <nav
          class="flex w-full items-center gap-3 rounded-2xl bg-white/60 py-2 pl-3 pr-2 shadow-sm backdrop-blur-md sm:w-auto sm:gap-6 sm:pl-4"
          aria-label="Forma navigation"
        >
          <RouterLink class="grid size-8 shrink-0 place-items-center" to="/" aria-label="Forma home">
            <svg class="size-8" viewBox="0 0 256 256" aria-hidden="true">
              <path fill="currentColor" d="M256 256H128L0 128h128z" />
              <path fill="currentColor" d="M256 128H128L0 0h128z" />
            </svg>
          </RouterLink>

          <div class="hidden items-center gap-6 sm:flex" aria-label="Primary links">
            <a
              v-for="item in navItems"
              :key="item"
              class="whitespace-nowrap text-sm font-medium text-gray-800 transition-opacity hover:opacity-60"
              href="#contact"
            >
              {{ item }}
            </a>
          </div>

          <a
            class="project-cta ml-auto rounded-xl px-4 py-2 text-sm font-medium transition-colors sm:px-5"
            href="#contact"
          >
            Start a project
          </a>
        </nav>

        <div class="min-h-[2rem] flex-1" aria-hidden="true"></div>

        <section class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p
            id="forma-title"
            class="shrink-0 text-3xl font-medium leading-tight text-white drop-shadow-lg sm:text-4xl lg:max-w-lg xl:max-w-2xl xl:text-5xl"
          >
            We craft bold ideas<br />
            and ship them as
            <span class="serif-accent">products</span>
          </p>

          <aside id="contact" class="w-full shrink-0 lg:w-[min(480px,45%)]" aria-label="Contact form">
            <div class="flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-2xl sm:rounded-3xl sm:p-6">
              <h2 class="text-xl font-semibold tracking-tight text-black sm:text-2xl">Say hello! 👋</h2>

              <div class="flex flex-row items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-2.5">
                <div class="min-w-0">
                  <span class="block text-xs font-medium text-gray-400">Drop us a line</span>
                  <a
                    class="block truncate font-semibold text-blue-600 hover:underline"
                    href="mailto:hello@forma.co"
                  >
                    hello@forma.co
                  </a>
                </div>

                <div class="flex shrink-0 items-center gap-1.5" aria-label="Social links">
                  <SocialBtn
                    v-for="social in socialLinks"
                    :key="social.label"
                    :label="social.label"
                    :paths="social.paths"
                    :tone="social.tone"
                  />
                </div>
              </div>

              <div class="flex items-center gap-3" aria-hidden="true">
                <span class="h-px flex-1 bg-gray-200"></span>
                <span class="text-sm font-medium text-gray-400">OR</span>
                <span class="h-px flex-1 bg-gray-200"></span>
              </div>

              <form v-if="!sent" class="flex flex-col gap-4" @submit.prevent="submitForm">
                <label class="text-sm font-medium text-black" for="vision-message">
                  Tell us about your vision
                </label>

                <div class="flex flex-col gap-2 sm:flex-row">
                  <input
                    v-model="name"
                    class="form-field flex-1"
                    type="text"
                    autocomplete="name"
                    placeholder="Full name"
                    aria-label="Full name"
                  />
                  <input
                    v-model="email"
                    class="form-field flex-1"
                    type="email"
                    autocomplete="email"
                    placeholder="Email"
                    aria-label="Email"
                  />
                </div>

                <textarea
                  id="vision-message"
                  v-model="message"
                  class="form-field min-h-28 resize-none"
                  rows="4"
                  placeholder="What are you looking to build or improve..."
                ></textarea>

                <fieldset class="grid gap-2">
                  <legend class="text-sm font-medium text-black">I need help with...</legend>
                  <div class="flex flex-wrap gap-1.5">
                    <button
                      v-for="service in SERVICES"
                      :key="service"
                      class="rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                      :class="
                        selected.includes(service)
                          ? 'border-black bg-gray-100 text-black'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      "
                      type="button"
                      :aria-pressed="selected.includes(service)"
                      @click="toggleService(service)"
                    >
                      {{ service }}
                    </button>
                  </div>
                </fieldset>

                <button
                  class="w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
                  type="submit"
                  :disabled="sending"
                >
                  {{ sending ? 'Sending...' : 'Send my message' }}
                </button>
              </form>

              <div v-else class="flex flex-col items-center gap-3 py-6 text-center" role="status" aria-live="polite">
                <div class="flex size-12 items-center justify-center rounded-full bg-green-50 text-xl text-green-600">
                  ✓
                </div>
                <strong class="text-base font-semibold text-gray-900">You're all set!</strong>
                <span class="text-sm text-gray-500">Expect a reply within 24 hours.</span>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'

import posterUrl from '../assets/3/poster.jpg'

interface SocialLink {
  label: string
  tone: string
  paths: string[]
}

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4'

const SERVICES = [
  'Website',
  'Mobile App',
  'Web App',
  'E-Commerce',
  'Visual Identity',
  '3D & Motion',
  'Digital Marketing',
  'Growth & Consulting',
  'Other',
] as const

const navItems = ['Our story', 'Expertise', 'Our work', 'Journal']

const socialLinks: SocialLink[] = [
  {
    label: 'Twitter',
    tone: 'bg-gray-100 text-gray-800',
    paths: ['M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'],
  },
  {
    label: 'Circle',
    tone: 'bg-pink-100 text-pink-500',
    paths: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z'],
  },
  {
    label: 'Instagram',
    tone: 'bg-orange-100 text-orange-400',
    paths: [
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
      'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z',
      'M17.5 6.5h.01',
    ],
  },
  {
    label: 'Linkedin',
    tone: 'bg-blue-100 text-blue-600',
    paths: [
      'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z',
      'M2 9h4v12H2z',
      'M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
    ],
  },
]

const SocialBtn = defineComponent({
  name: 'SocialBtn',
  props: {
    label: {
      type: String,
      required: true,
    },
    tone: {
      type: String,
      required: true,
    },
    paths: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          class: [
            'flex h-8 w-8 items-center justify-center rounded-xl transition-opacity hover:opacity-80',
            props.tone,
          ],
          'aria-label': props.label,
        },
        [
          h(
            'svg',
            {
              viewBox: '0 0 24 24',
              class: 'h-[13px] w-[13px]',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': '2',
              'stroke-linecap': 'round',
              'stroke-linejoin': 'round',
              'aria-hidden': 'true',
            },
            props.paths.map((path) => h('path', { d: path })),
          ),
        ],
      )
  },
})

const selected = ref<string[]>([])
const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)

let previousTitle = ''
let sendingTimer: number | undefined

function toggleService(service: string): void {
  selected.value = selected.value.includes(service)
    ? selected.value.filter((item) => item !== service)
    : [...selected.value, service]
}

function delaySending(): Promise<void> {
  return new Promise((resolve) => {
    sendingTimer = window.setTimeout(resolve, 1000)
  })
}

async function submitForm(): Promise<void> {
  if (sending.value) {
    return
  }

  sending.value = true
  await delaySending()
  sending.value = false
  sent.value = true
}

onMounted(() => {
  previousTitle = document.title
  document.title = 'Forma Studio'
})

onBeforeUnmount(() => {
  document.title = previousTitle

  if (sendingTimer) {
    window.clearTimeout(sendingTimer)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

.forma-page,
.forma-page * {
  font-family: Inter, sans-serif;
}

.landing-card {
  background-color: #d9d9d9;
  background-position: center;
  background-size: cover;
}

.project-cta {
  color: #ffffff;
  background: #000000;
}

.project-cta:hover {
  background: #1f2937;
}

.serif-accent {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-weight: 400;
}

.form-field {
  min-width: 0;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  background: transparent;
  padding: 0.625rem 0.75rem;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.form-field::placeholder {
  color: #9ca3af;
}

.form-field:focus {
  border-color: transparent;
  outline: none;
  box-shadow: 0 0 0 2px #111827;
}

@media (max-width: 420px) {
  .forma-page {
    padding: 0.75rem;
  }
}
</style>
