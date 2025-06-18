<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

body {
  background: linear-gradient(135deg, #0c1a2d 0%, #1a2b3c 100%);
  color: #e0f0ff;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* 粒子背景 */
#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 10;
}

/* 头部样式 */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  position: relative;
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4dabf7 0%, #228be6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
}

.logo-icon::before {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  background: white;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.logo-text {
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(to right, #74b9ff, #a29bfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(116, 185, 255, 0.3);
}

/* 导航样式 */
nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

nav a {
  color: #a0d2ff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
}

nav a:hover {
  color: #fff;
  background: rgba(52, 152, 219, 0.2);
}

nav a.active {
  color: #fff;
  background: rgba(52, 152, 219, 0.3);
  box-shadow: 0 0 15px rgba(52, 152, 219, 0.4);
}

/* 主内容区 */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  min-height: 80vh;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  padding-right: 40px;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 25px;
  background: linear-gradient(to right, #74b9ff, #dfe6e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero h1 span {
  display: block;
  font-size: 1.8rem;
  font-weight: 400;
  color: #a0d2ff;
  margin-top: 10px;
}

.hero p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 35px;
  color: #c7e3ff;
}

/* 角色特征 */
.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
}

.trait {
  background: rgba(41, 128, 185, 0.2);
  border: 1px solid rgba(52, 152, 219, 0.3);
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
}

/* 按钮样式 */
.cta-buttons {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 14px 35px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db 0%, #1a75bc 100%);
  color: white;
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.6);
}

.btn-secondary {
  background: transparent;
  color: #74b9ff;
  border: 2px solid #3498db;
}

.btn-secondary:hover {
  background: rgba(52, 152, 219, 0.1);
}

/* 角色展示区 */
.character-display {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}

.character-main {
  width: 380px;
  height: 500px;
  position: relative;
  perspective: 1000px;
}

.character-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.character-card:hover {
  transform: rotateY(10deg) rotateX(5deg);
}

.character-image {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 43, 60, 0.7) 0%, rgba(41, 64, 87, 0.5) 100%);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(116, 185, 255, 0.2);
  backdrop-filter: blur(10px);
}

.character-image::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://i.postimg.cc/6pP0hW7d/origami.png') center bottom no-repeat;
  background-size: contain;
  filter: drop-shadow(0 0 20px rgba(116, 185, 255, 0.5));
  z-index: 1;
}

.character-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 25px;
  background: rgba(12, 26, 45, 0.8);
  border-radius: 0 0 20px 20px;
  z-index: 2;
}

.character-info h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #74b9ff;
}

.character-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 700;
  color: #74b9ff;
}

.stat-label {
  font-size: 0.9rem;
  color: #a0d2ff;
}

/* 样式切换 */
.style-selector {
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.style-option {
  width: 80px;
  height: 100px;
  border-radius: 10px;
  background: rgba(41, 128, 185, 0.2);
  border: 1px solid rgba(52, 152, 219, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.style-option:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
}

.style-option.active {
  border: 2px solid #74b9ff;
  box-shadow: 0 0 20px rgba(116, 185, 255, 0.5);
}

.style-option:nth-child(1)::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://i.postimg.cc/7Z1nR3fK/origami1.png') center center no-repeat;
  background-size: cover;
}

.style-option:nth-child(2)::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://i.postimg.cc/0yVYc5pV/origami2.png') center center no-repeat;
  background-size: cover;
}

.style-option:nth-child(3)::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('https://i.postimg.cc/9FkfQj7y/origami3.png') center center no-repeat;
  background-size: cover;
}

/* 页脚 */
footer {
  text-align: center;
  padding: 40px 0;
  margin-top: 50px;
  border-top: 1px solid rgba(52, 152, 219, 0.2);
  font-size: 0.9rem;
  color: #7f9cb5;
}

/* 动画效果 */
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .hero {
    flex-direction: column;
    text-align: center;
    padding-top: 20px;
  }

  .hero-content {
    padding-right: 0;
    margin-bottom: 50px;
    max-width: 100%;
  }

  .traits,
  .cta-buttons {
    justify-content: center;
  }

  .character-main {
    width: 320px;
    height: 450px;
  }
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    gap: 25px;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero h1 {
    font-size: 2.8rem;
  }

  .style-option {
    width: 70px;
    height: 90px;
  }
}
</style>

<template>
  <div id="app">
    <!-- 粒子背景 -->
    <div id="particles"></div>

    <div class="container">
      <!-- 头部导航 -->
      <header>
        <div class="logo">
          <div class="logo-icon"></div>
          <div class="logo-text">鸢一折纸设定集</div>
        </div>

        <nav>
          <ul>
            <li><a href="#" class="active">首页</a></li>
            <li><a href="#">角色档案</a></li>
            <li><a href="#">精灵能力</a></li>
            <li><a href="#">AST装备</a></li>
            <li><a href="#">画廊</a></li>
          </ul>
        </nav>
      </header>

      <!-- 主内容区 -->
      <main>
        <section class="hero">
          <div class="hero-content">
            <h1>鸢一折纸<span>Tobiichi Origami</span></h1>

            <p>原AST部队的顶尖魔术师，拥有卓越的战斗技巧和冷静的判断力。银白色短发和蓝灰色瞳孔是她的标志特征，性格沉着冷静，对五河士道怀有复杂的情感。在精灵化后获得了天使"绝灭天使"。</p>

            <div class="traits">
              <div class="trait">AST魔术师</div>
              <div class="trait">绝灭天使</div>
              <div class="trait">三无属性</div>
              <div class="trait">天才头脑</div>
              <div class="trait">战斗专家</div>
            </div>

            <div class="cta-buttons">
              <button class="btn btn-primary">查看完整档案</button>
              <button class="btn btn-secondary">能力解析</button>
            </div>
          </div>

          <div class="character-display">
            <div class="character-main floating">
              <div class="character-card">
                <div class="character-image">
                  <div class="character-info">
                    <h3>天使: 绝灭天使</h3>
                    <p>拥有多种强大攻击模式的王冠型天使</p>
                    <div class="character-stats">
                      <div class="stat">
                        <div class="stat-value">S</div>
                        <div class="stat-label">战斗能力</div>
                      </div>
                      <div class="stat">
                        <div class="stat-value">A+</div>
                        <div class="stat-label">智力</div>
                      </div>
                      <div class="stat">
                        <div class="stat-value">AA</div>
                        <div class="stat-label">灵力</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="style-selector">
          <div class="style-option active"></div>
          <div class="style-option"></div>
          <div class="style-option"></div>
        </div>
      </main>

      <!-- 页脚 -->
      <footer>
        <p>© 2023 鸢一折纸电子设定集 | 基于《约会大作战》角色制作 | Vue3 + TypeScript + Sass 实现</p>
      </footer>
    </div>
  </div>

</template>
<script setup>
import { onMounted } from 'vue'

// 初始化粒子背景
onMounted(() => {
  const particlesContainer = document.getElementById('particles')
  const particleCount = 100

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'absolute'
    particle.style.width = `${Math.random() * 3 + 1}px`
    particle.style.height = particle.style.width
    particle.style.background = '#74b9ff'
    particle.style.borderRadius = '50%'
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.opacity = Math.random() * 0.5 + 0.1
    particle.style.boxShadow = '0 0 5px rgba(116, 185, 255, 0.8)'

    // 动画效果
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`
    particle.style.animationDelay = `${Math.random() * 5}s`

    particlesContainer.appendChild(particle)
  }
})



</script>
