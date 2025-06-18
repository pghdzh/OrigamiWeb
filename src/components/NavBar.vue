<template>
  <header class="navbar" :class="{ reversed: isReversed }">
    <div class="navbar-inner">
      <div class="logo"></div>

      <nav class="nav-links" v-if="!isMobile">
        <ul>
          <li v-for="link in links" :key="link.path" :class="{ active: route.path === link.path }"
            @click="go(link.path)">
            {{ link.name }}
            <span class="underline" />
          </li>
        </ul>
      </nav>

      <div class="menu-icon" v-if="isMobile" @click="drawerOpen = true">☰</div>
    </div>

    <transition name="fade">
      <div class="mobile-drawer" v-if="drawerOpen">
        <div class="drawer-content">
          <div class="close-btn" @click="drawerOpen = false">✕</div>
          <ul>
            <li v-for="link in links" :key="link.path" :class="{ active: route.path === link.path }"
              @click="go(link.path)">
              {{ link.name }}
            </li>
          </ul>
        </div>
      </div>
    </transition>

    <!-- 粒子背景层 -->
    <canvas ref="canvas" class="bg-canvas"></canvas>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const links = ref([
  { name: '首页', path: '/' },
  { name: '角色概览', path: '/overview' },
  { name: '图库', path: '/gallery' },
  { name: '时间线', path: '/timeline' },
  { name: '留言板', path: '/board' },
  { name: '对话折纸', path: '/talk' }
])
const drawerOpen = ref(false)
const isMobile = ref(window.innerWidth <= 768)
const canvas = ref<HTMLCanvasElement | null>(null)

function checkScreen() {
  isMobile.value = window.innerWidth <= 768
}
window.addEventListener('resize', checkScreen)

function go(path: string) {
  drawerOpen.value = false
  router.push(path)
}

const isReversed = computed(() => route.path === '/talk')

// 粒子背景初始化
onMounted(() => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d')!
    let particles: any[] = []
    const init = () => {
      canvas.value!.width = window.innerWidth
      canvas.value!.height = window.innerHeight
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.value!.width,
        y: Math.random() * canvas.value!.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
      ctx.fillStyle = isReversed.value ? 'rgba(160,128,255,0.4)' : 'rgba(0,204,255,0.4)'
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.value!.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.value!.height) p.dy *= -1
      })
      requestAnimationFrame(draw)
    }
    init()
    draw()
    window.addEventListener('resize', init)
  }
})
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  backdrop-filter: blur(10px);
  background: rgba(26, 26, 26, 0.8);
  z-index: 100;

  &.reversed {
    .logo {
      color: #c8a0ff;
    }

    .underline,
    .nav-links li:hover,
    .nav-links li.active {
      color: #d0a0ff;
    }
  }
}

.navbar-inner {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 64px;
  height: 64px;
  background: url('@/assets/icon-wing.png') no-repeat center center;
  background-size: contain;
}

.nav-links ul {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links li {
  position: relative;
  padding: 4px 0;
  color: #cee;
  cursor: pointer;
  transition: color 0.3s;

  &:hover,
  &.active {
    color: #00ccff;

    .underline {
      width: 100%;
      background: #00ccff;
    }
  }
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: #00ccff;
  transition: width 0.3s ease;
}

.menu-icon {
  font-size: 24px;
  color: #cee;
  cursor: pointer;
}

.mobile-drawer {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.drawer-content {
  position: relative;
  text-align: center;

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    margin: 16px 0;
    font-size: 20px;
    color: #cee;
    cursor: pointer;

    &.active,
    &:hover {
      color: #00ccff;
    }
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  color: #cee;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
</style>
