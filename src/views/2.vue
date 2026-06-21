<template>
  <main class="veldara-page">
    <div class="scroll-video-container" aria-hidden="true">
      <canvas ref="videoCanvasRef"></canvas>
      <video
        ref="videoRef"
        muted
        playsinline
        preload="auto"
        crossorigin="anonymous"
        :src="videoUrl"
      ></video>
      <div class="video-overlay"></div>
    </div>

    <canvas ref="particlesCanvasRef" class="particles-canvas" aria-hidden="true"></canvas>

    <aside ref="fixedCardsRef" class="fixed-cards" aria-label="Veldara feature cards">
      <div ref="cardsGridRef" class="feature-grid">
        <article v-for="card in cards" :key="card.title" class="feature-card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </aside>

    <nav class="top-nav" aria-label="Veldara navigation">
      <div class="brand-group">
        <RouterLink class="logo" to="/">veldara</RouterLink>
        <div class="nav-links" aria-label="Primary links">
          <a href="#hero">Guides</a>
          <a href="#section-three">Journal</a>
        </div>
      </div>

      <div class="social" aria-label="Social links">
        <a v-for="social in socialLinks" :key="social.label" href="#" :aria-label="social.label">
          <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path :d="social.path" />
          </svg>
        </a>
      </div>
    </nav>

    <div class="content">
      <section id="hero" ref="heroRef" class="hero" aria-labelledby="hero-title">
        <div class="gradient-overlay"></div>

        <div class="hero-content">
          <p class="subtitle">Our Purpose:</p>
          <h1 id="hero-title">
            <span class="title-line">Instantly craft immersive</span>
            <span class="title-line">
              <span class="underlined">
                <span class="line" aria-hidden="true"></span>
                <span>3D worlds</span>
              </span>
              on the web.
            </span>
          </h1>

          <div class="ctas">
            <div class="code-box">
              <span class="prompt">&gt;</span>
              <code>npm i @veldara/core</code>
            </div>
            <a class="cta-btn" href="#section-three">
              Get Started
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div class="bounce-arrow" aria-hidden="true">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </section>

      <div class="spacer spacer-large" aria-hidden="true"></div>
      <div ref="cardsTriggerRef" class="cards-trigger" aria-hidden="true"></div>
      <div class="spacer spacer-medium" aria-hidden="true"></div>

      <section id="section-three" class="section-three" aria-labelledby="release-title">
        <div ref="sectionThreeInnerRef" class="section-three-inner">
          <p>Presenting</p>
          <h2 id="release-title">Veldara 8</h2>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface FeatureCard {
  title: string
  description: string
}

interface SocialLink {
  label: string
  path: string
}

interface WebGLParticleState {
  gl: WebGLRenderingContext
  program: WebGLProgram
  buffer: WebGLBuffer
  particleData: Float32Array
  count: number
  width: number
  height: number
  resolutionLocation: WebGLUniformLocation | null
}

const videoUrl =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

const cards: FeatureCard[] = [
  {
    title: 'Explore Veldara',
    description:
      "Veldara merges the elegance of Svelte 5 with the depth of Three.js within easy reach. It's crafted to be robust and adaptable while remaining intuitive and simple to grasp.",
  },
  {
    title: 'Unlock Three.js',
    description:
      'The web is growing increasingly dimensional. At its heart, Veldara offers a composable declarative API for building performant Three.js experiences on the web.',
  },
  {
    title: 'Connect Everything',
    description:
      'Veldara ships with tooling for physics, XR, animation, layouting, model loading, and extensive utilities to make building compelling 3D apps for the web effortless.',
  },
]

const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  },
  {
    label: 'Discord',
    path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z',
  },
  {
    label: 'X',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
  },
]

const videoCanvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const particlesCanvasRef = ref<HTMLCanvasElement | null>(null)
const fixedCardsRef = ref<HTMLElement | null>(null)
const cardsGridRef = ref<HTMLElement | null>(null)
const cardsTriggerRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const sectionThreeInnerRef = ref<HTMLElement | null>(null)
const particleStride = 6
const particleByteStride = particleStride * Float32Array.BYTES_PER_ELEMENT
let videoFrames: ImageBitmap[] = []
let framesReady = false
let lastFrameIndex = -1
let videoSeeking = false
let videoFrameAnimationId = 0
let particlesAnimationId = 0
let cardsAnimationId = 0
let particleState: WebGLParticleState | undefined
let sectionObserver: IntersectionObserver | undefined
let generatedVideoUrl: string | undefined
let isDestroyed = false
let previousTitle = ''

function resizeVideoCanvas(): void {
  const canvas = videoCanvasRef.value

  if (!canvas) {
    return
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = canvas.getBoundingClientRect()
  const width = Math.round(rect.width * dpr)
  const height = Math.round(rect.height * dpr)

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  lastFrameIndex = -1
}

async function extractVideoFrames(): Promise<void> {
  const canvas = videoCanvasRef.value
  const videoFallback = videoRef.value

  if (!canvas || !videoFallback || typeof createImageBitmap === 'undefined') {
    return
  }

  try {
    const response = await fetch(videoUrl, { mode: 'cors' })
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    generatedVideoUrl = objectUrl

    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    video.preload = 'auto'
    video.src = objectUrl

    await new Promise<void>((resolve, reject) => {
      const timeoutId = window.setTimeout(reject, 15000)

      video.onloadedmetadata = () => {
        window.clearTimeout(timeoutId)
        resolve()
      }

      video.onerror = () => {
        window.clearTimeout(timeoutId)
        reject()
      }
    })

    const scale = Math.min(1, 1280 / video.videoWidth)
    const scaledWidth = Math.round(video.videoWidth * scale)
    const scaledHeight = Math.round(video.videoHeight * scale)
    const frameCount = Math.max(30, Math.min(120, Math.round(video.duration * 24)))

    for (let index = 0; index < frameCount && !isDestroyed; index += 1) {
      const time = (index / (frameCount - 1)) * (video.duration - 0.05)
      video.currentTime = time

      await new Promise<void>((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
          video.removeEventListener('seeked', onSeeked)
          reject()
        }, 3000)

        function onSeeked(): void {
          window.clearTimeout(timeoutId)
          video.removeEventListener('seeked', onSeeked)
          resolve()
        }

        video.addEventListener('seeked', onSeeked)
      })

      const frame = await createImageBitmap(video, {
        resizeWidth: scaledWidth,
        resizeHeight: scaledHeight,
      })
      videoFrames.push(frame)
    }

    if (videoFrames.length > 0 && !isDestroyed) {
      framesReady = true
      canvas.style.visibility = 'visible'
      videoFallback.style.display = 'none'
    }
  } catch {
    // Keep the video element as the fallback when frame extraction is unavailable.
  }
}

function getScrollProgress(): number {
  const viewportHeight = window.innerHeight
  const start = viewportHeight * 0.5
  const end = document.documentElement.scrollHeight - viewportHeight
  const range = end - start

  if (range <= 0) {
    return 0
  }

  return Math.max(0, Math.min(1, (window.scrollY - start) / range))
}

function drawVideoFrame(frame: ImageBitmap): void {
  const canvas = videoCanvasRef.value
  const context = canvas?.getContext('2d')

  if (!canvas || !context) {
    return
  }

  const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height)
  const drawWidth = frame.width * scale
  const drawHeight = frame.height * scale

  context.drawImage(frame, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight)
}

function tickScrollVideo(): void {
  const videoFallback = videoRef.value
  const progress = getScrollProgress()

  if (framesReady && videoFrames.length > 0) {
    const frameIndex = Math.round(progress * (videoFrames.length - 1))

    if (frameIndex !== lastFrameIndex) {
      lastFrameIndex = frameIndex
      const frame = videoFrames[frameIndex]

      if (frame) {
        drawVideoFrame(frame)
      }
    }
  } else if (videoFallback?.duration && Number.isFinite(videoFallback.duration) && videoFallback.readyState >= 1) {
    const targetTime = progress * videoFallback.duration

    if (!videoSeeking && Math.abs(videoFallback.currentTime - targetTime) > 0.001) {
      videoSeeking = true
      videoFallback.currentTime = targetTime
    }
  }

  videoFrameAnimationId = window.requestAnimationFrame(tickScrollVideo)
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | undefined {
  const shader = gl.createShader(type)

  if (!shader) {
    return undefined
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return undefined
  }

  return shader
}

function createParticleProgram(gl: WebGLRenderingContext): WebGLProgram | undefined {
  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    `
      attribute vec2 a_position;
      attribute vec2 a_meta;
      uniform vec2 u_resolution;
      varying float v_opacity;

      void main() {
        vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;
        gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);
        gl_PointSize = a_meta.x;
        v_opacity = a_meta.y;
      }
    `,
  )
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    `
      precision mediump float;
      varying float v_opacity;

      void main() {
        vec2 point = gl_PointCoord - vec2(0.5);
        float distanceFromCenter = length(point);

        if (distanceFromCenter > 0.5) {
          discard;
        }

        float alpha = smoothstep(0.5, 0.0, distanceFromCenter) * v_opacity;
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
      }
    `,
  )

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    return undefined
  }

  const program = gl.createProgram()

  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return undefined
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return undefined
  }

  return program
}

function createParticleState(): WebGLParticleState | undefined {
  const canvas = particlesCanvasRef.value
  const gl = canvas?.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  })

  if (!canvas || !gl) {
    return undefined
  }

  const program = createParticleProgram(gl)
  const buffer = gl.createBuffer()

  if (!program || !buffer) {
    if (program) gl.deleteProgram(program)
    if (buffer) gl.deleteBuffer(buffer)
    return undefined
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const metaLocation = gl.getAttribLocation(program, 'a_meta')

  if (positionLocation < 0 || metaLocation < 0) {
    gl.deleteProgram(program)
    gl.deleteBuffer(buffer)
    return undefined
  }

  gl.useProgram(program)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, particleByteStride, 0)
  gl.enableVertexAttribArray(metaLocation)
  gl.vertexAttribPointer(
    metaLocation,
    2,
    gl.FLOAT,
    false,
    particleByteStride,
    4 * Float32Array.BYTES_PER_ELEMENT,
  )
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
  gl.disable(gl.DEPTH_TEST)

  return {
    gl,
    program,
    buffer,
    particleData: new Float32Array(0),
    count: 0,
    width: 0,
    height: 0,
    resolutionLocation: gl.getUniformLocation(program, 'u_resolution'),
  }
}

function resizeParticles(): void {
  const canvas = particlesCanvasRef.value

  if (!canvas) {
    return
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.round(window.innerWidth * dpr))
  const height = Math.max(1, Math.round(window.innerHeight * dpr))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  particleState ??= createParticleState()

  if (!particleState) {
    return
  }

  const { gl } = particleState
  const count = Math.max(36, Math.min(260, Math.floor((window.innerWidth * window.innerHeight) / 12000)))
  const shouldRebuild = particleState.count !== count || particleState.width !== width || particleState.height !== height

  particleState.count = count
  particleState.width = width
  particleState.height = height
  particleState.particleData = shouldRebuild
    ? new Float32Array(count * particleStride)
    : particleState.particleData

  if (shouldRebuild) {
    for (let index = 0; index < count; index += 1) {
      const offset = index * particleStride

      particleState.particleData[offset] = Math.random() * width
      particleState.particleData[offset + 1] = Math.random() * height
      particleState.particleData[offset + 2] = (Math.random() - 0.5) * 0.28 * dpr
      particleState.particleData[offset + 3] = (Math.random() - 0.5) * 0.28 * dpr
      particleState.particleData[offset + 4] = (Math.random() * 1.8 + 0.8) * dpr
      particleState.particleData[offset + 5] = Math.random() * 0.55 + 0.2
    }
  }

  gl.viewport(0, 0, width, height)
  gl.useProgram(particleState.program)
  gl.uniform2f(particleState.resolutionLocation, width, height)
  gl.bindBuffer(gl.ARRAY_BUFFER, particleState.buffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleState.particleData, gl.DYNAMIC_DRAW)
}

function animateParticles(): void {
  const canvas = particlesCanvasRef.value

  if (!canvas || !particleState) {
    if (canvas && !particleState) {
      resizeParticles()
    }

    particlesAnimationId = window.requestAnimationFrame(animateParticles)
    return
  }

  const { gl, particleData, count } = particleState

  for (let index = 0; index < count; index += 1) {
    const offset = index * particleStride

    particleData[offset] += particleData[offset + 2]
    particleData[offset + 1] += particleData[offset + 3]

    if (particleData[offset] < 0) particleData[offset] = canvas.width
    if (particleData[offset] > canvas.width) particleData[offset] = 0
    if (particleData[offset + 1] < 0) particleData[offset + 1] = canvas.height
    if (particleData[offset + 1] > canvas.height) particleData[offset + 1] = 0
  }

  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(particleState.program)
  gl.uniform2f(particleState.resolutionLocation, canvas.width, canvas.height)
  gl.bindBuffer(gl.ARRAY_BUFFER, particleState.buffer)
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, particleData)
  gl.drawArrays(gl.POINTS, 0, count)
  particlesAnimationId = window.requestAnimationFrame(animateParticles)
}

function destroyParticleState(): void {
  if (!particleState) {
    return
  }

  const { gl, buffer, program } = particleState

  gl.deleteBuffer(buffer)
  gl.deleteProgram(program)
  particleState = undefined
}

function updateHeroOpacity(): void {
  const hero = heroRef.value

  if (!hero) {
    return
  }

  const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.3))
  hero.style.opacity = String(fade)
}

function tickCards(): void {
  const fixedCards = fixedCardsRef.value
  const cardsGrid = cardsGridRef.value
  const trigger = cardsTriggerRef.value

  if (!fixedCards || !cardsGrid || !trigger) {
    cardsAnimationId = window.requestAnimationFrame(tickCards)
    return
  }

  const rect = trigger.getBoundingClientRect()
  const triggerTop = rect.top + window.scrollY
  const triggerHeight = rect.height
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  const start = triggerTop - viewportHeight * 0.5
  const end = triggerTop + triggerHeight - viewportHeight * 0.3
  const range = end - start
  const rawProgress = range > 0 ? (scrollY - start) / range : 0
  const progress = Math.max(0, Math.min(1, rawProgress))
  const isActive = scrollY >= start - viewportHeight * 0.2 && scrollY <= end + viewportHeight * 0.3
  const fadeIn = Math.min(1, Math.max(0, (scrollY - (start - viewportHeight * 0.2)) / (viewportHeight * 0.2)))
  const fadeOut = Math.min(1, Math.max(0, (end + viewportHeight * 0.3 - scrollY) / (viewportHeight * 0.3)))
  const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0

  fixedCards.style.opacity = String(containerOpacity)
  fixedCards.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none'

  const revealPercent = progress * 130
  const mask = window.innerWidth < 768
    ? `linear-gradient(to bottom, black ${revealPercent}%, transparent ${revealPercent + 20}%)`
    : `linear-gradient(to right, black ${revealPercent}%, transparent ${revealPercent + 15}%)`

  cardsGrid.style.maskImage = mask
  cardsGrid.style.webkitMaskImage = mask
  cardsAnimationId = window.requestAnimationFrame(tickCards)
}

function setupSectionObserver(): void {
  const sectionInner = sectionThreeInnerRef.value

  if (!sectionInner) {
    return
  }

  sectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        sectionInner.classList.add('visible')
        sectionObserver?.unobserve(sectionInner)
      }
    },
    { threshold: 0.15 },
  )
  sectionObserver.observe(sectionInner)
}

onMounted(() => {
  previousTitle = document.title
  document.title = 'Veldara'
  isDestroyed = false

  const videoFallback = videoRef.value

  videoFallback?.addEventListener('seeked', () => {
    videoSeeking = false
  })
  videoFallback?.addEventListener('stalled', () => {
    videoSeeking = false
  })
  videoFallback?.addEventListener('loadeddata', () => {
    videoFallback.currentTime = 0
  })

  if (videoCanvasRef.value) {
    videoCanvasRef.value.style.visibility = 'hidden'
  }

  resizeVideoCanvas()
  resizeParticles()
  setupSectionObserver()

  window.addEventListener('resize', resizeVideoCanvas)
  window.addEventListener('resize', resizeParticles)
  window.addEventListener('scroll', updateHeroOpacity, { passive: true })

  videoFrameAnimationId = window.requestAnimationFrame(tickScrollVideo)
  particlesAnimationId = window.requestAnimationFrame(animateParticles)
  cardsAnimationId = window.requestAnimationFrame(tickCards)
  void extractVideoFrames()
})

onBeforeUnmount(() => {
  isDestroyed = true
  document.title = previousTitle
  window.removeEventListener('resize', resizeVideoCanvas)
  window.removeEventListener('resize', resizeParticles)
  window.removeEventListener('scroll', updateHeroOpacity)
  window.cancelAnimationFrame(videoFrameAnimationId)
  window.cancelAnimationFrame(particlesAnimationId)
  window.cancelAnimationFrame(cardsAnimationId)
  sectionObserver?.disconnect()
  destroyParticleState()
  videoFrames.forEach((frame) => frame.close())
  videoFrames = []

  if (generatedVideoUrl) {
    URL.revokeObjectURL(generatedVideoUrl)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.veldara-page {
  position: relative;
  min-height: 550vh;
  overflow-x: hidden;
  color: #ffffff;
  background: #010101;
  font-family: Inter, sans-serif;
}

.scroll-video-container {
  position: fixed;
  z-index: 0;
  top: -20%;
  right: 0;
  bottom: 0;
  left: 0;
  background: #0a0a0a;
  pointer-events: none;
}

.scroll-video-container canvas,
.scroll-video-container video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}

.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.top-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
}

.brand-group {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.logo {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.nav-links,
.social {
  display: flex;
  align-items: center;
}

.nav-links {
  gap: 1.5rem;
}

.nav-links a {
  color: #d1d5db;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.nav-links a:hover,
.social a:hover {
  color: #ffffff;
}

.social {
  gap: 1rem;
}

.social a {
  color: #d1d5db;
  transition: color 0.2s;
}

.social svg {
  width: 1.25rem;
  height: 1.25rem;
}

.content {
  position: relative;
  z-index: 2;
}

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent);
}

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.5rem 6rem;
  text-align: center;
}

.subtitle {
  margin-bottom: 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

h1 {
  width: min(48rem, calc(100vw - 3rem));
  max-width: 48rem;
  font-size: clamp(1.5rem, 5vw, 3.75rem);
  font-weight: 600;
  line-height: 1.15;
}

.title-line {
  display: block;
}

.underlined {
  position: relative;
  display: inline-block;
}

.underlined .line {
  position: absolute;
  bottom: 0.25rem;
  left: 0;
  width: 100%;
  height: 10px;
  border-radius: 2px;
  background: #2c5c88;
}

.underlined span:last-child {
  position: relative;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
}

.code-box,
.cta-btn {
  display: inline-flex;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.875rem 2rem;
}

.code-box {
  gap: 0.5rem;
  border: 1px solid rgba(55, 65, 81, 0.5);
  background: #1a1a1a;
}

.prompt {
  color: #2c5c88;
  font-family: monospace;
  font-size: 0.875rem;
}

code {
  color: #e5e7eb;
  font-family: monospace;
  font-size: 0.875rem;
}

.cta-btn {
  gap: 0.5rem;
  color: #ffffff;
  background: #2c5c88;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.2s;
}

.cta-btn:hover {
  background: #3a7aad;
}

.bounce-arrow {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
}

.bounce-arrow svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
  animation: bounce 1s infinite;
}

.fixed-cards {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  padding: 2rem 2.5rem;
  opacity: 0;
  pointer-events: none;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  max-width: 72rem;
  margin: 0 auto;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
}

.feature-card p {
  color: #d1d5db;
  font-size: 0.875rem;
  line-height: 1.6;
}

.spacer-large {
  height: 150vh;
}

.cards-trigger {
  height: 200vh;
}

.spacer-medium {
  height: 100vh;
}

.section-three {
  position: relative;
  display: flex;
  min-height: 100vh;
  align-items: flex-end;
  justify-content: center;
  padding: 0 2.5rem 8rem;
}

.section-three-inner {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0;
  filter: blur(8px);
  transform: translateY(32px);
  transition: opacity 1s ease-out, transform 1s ease-out, filter 1s ease-out;
}

.section-three-inner.visible {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

.section-three-inner p {
  margin-bottom: 0.75rem;
  color: #d1d5db;
  font-size: 1rem;
}

.section-three-inner h2 {
  font-size: clamp(1.875rem, 6vw, 4.5rem);
  font-weight: 700;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-25%);
  }
}

@media (max-width: 768px) {
  .top-nav {
    padding: 1rem 1.5rem;
  }

  .nav-links {
    display: none;
  }

  .hero-content {
    padding-bottom: 5rem;
  }

  h1 {
    width: min(21rem, calc(100vw - 3rem));
    font-size: clamp(1.1rem, 5.6vw, 1.45rem);
  }

  .ctas {
    flex-direction: column;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .fixed-cards {
    padding: 1.5rem 1rem;
  }

  .section-three {
    padding-bottom: 5rem;
  }
}
</style>
