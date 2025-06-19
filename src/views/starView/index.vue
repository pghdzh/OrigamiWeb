<template>
  <div class="home-container">
    <!-- 粒子背景 -->
    <div id="particles-js" class="particles-canvas"></div>

    <!-- 文字卡片背景（毛玻璃） -->
    <div class="text-card">
      <div class="typing">
        <h1 class="title">{{ displayTitle }}</h1>
        <transition name="slide-fade" mode="out-in">
          <h2 :key="`quote-${quoteIndex}`" class="quote">{{ displayQuote }}</h2>
        </transition>
      </div>
    </div>

    <footer class="footer">© 2025 鸢一折纸 电子设定集</footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const fullTitle = '鸢一折纸'
const quotes = [
  '仇恨是唯一不会背叛我的武器——直到遇见你。',
  '体温36.5℃，心率82——今日的士道，依然完美。',
  '王冠承载绝灭之光，丧服缠绕救赎之暗——这具躯壳里，住着两个‘我’。',
  '扣动扳机那刻，我才明白：最该消灭的精灵，是我自己。',
  '过去的折纸会杀死你，现在的折纸……想为你泡一杯茶。',
  '仇恨的灰烬里，终于开出了名为‘爱’的花。',
]

const displayTitle = ref('')
const displayQuote = ref('')
const quoteIndex = ref(0)

function typeText(
  full: string,
  target: typeof displayTitle | typeof displayQuote,
  speed = 150
) {
  return new Promise<void>((resolve) => {
    target.value = ''
    let i = 0
    const timer = setInterval(() => {
      target.value += full[i++]
      if (i >= full.length) {
        clearInterval(timer)
        resolve()
      }
    }, speed)
  })
}

async function cycleQuotes() {
  while (true) {
    await typeText(quotes[quoteIndex.value], displayQuote, 100)
    await new Promise((r) => setTimeout(r, 1500))
    displayQuote.value = ''
    await new Promise((r) => setTimeout(r, 500))
    quoteIndex.value = (quoteIndex.value + 1) % quotes.length
  }
}

onMounted(async () => {
  /* global particlesJS */
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 1000 } },
      color: { value: ['#ff9a9e', '#fad0c4', '#fad0c4'] },
      shape: { type: 'star' },
      opacity: { value: 0.7, random: true },
      size: { value: 4, random: true },
      move: { enable: true, speed: 0.5, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' }
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  })

  await typeText(fullTitle, displayTitle, 180)
  setTimeout(() => cycleQuotes(), 400)
})
</script>

<style scoped lang="scss">
.home-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  background: linear-gradient(145deg, #3b1054 0%, #780206 100%);
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.text-card {
  position: relative;
  z-index: 1;
  max-width: 75%;
  padding: 2.5rem;
}

.typing {
  text-align: center;

  .title {
    font-family: 'Sawarabi Mincho', serif;
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #fbe4fd;
    letter-spacing: 0.1em;
    text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .quote {
    font-family: 'Noto Serif JP', serif;
    font-size: 1.6rem;
    font-style: italic;
    color: #ffe4f1;
    line-height: 1.8;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    height: 50px;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.footer {
  position: absolute;
  bottom: 1.5rem;
  z-index: 1;
  color: rgba(255, 228, 241, 0.7);
  font-size: 0.9rem;
}
</style>
