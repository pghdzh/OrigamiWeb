<template>
  <div class="home-container">
    <div class="typing">
      <!-- 标题也用打字机效果 -->
      <h1 class="title">{{ displayTitle }}</h1>

      <!-- 循环显示的名言，带打字与滑动过渡 -->
      <transition name="slide-fade" mode="out-in">
        <h2 key="quote-{{ quoteIndex }}" class="quote">
          {{ displayQuote }}
        </h2>
      </transition>
    </div>
    <footer class="footer">© 2025 鸢一折纸 电子设定集</footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

// 要打字的完整文本
const fullTitle = "鸢一折纸";
const quotes = [
  "“你曾在我身边，拯救了我，让我看到了这个世界的美好。”",
  "“折纸虽脆弱，却能被双手赋予无限可能。”",
  "“哪怕千疮百孔，我也要挺立于风中。”",
];

// 打字机展示用的 ref
const displayTitle = ref("");
const displayQuote = ref("");
const quoteIndex = ref(0);

// 打字机函数，返回 Promise 以便串联
function typeText(
  full: string,
  target: typeof displayTitle | typeof displayQuote,
  speed = 150
) {
  return new Promise<void>((resolve) => {
    target.value = "";
    let i = 0;
    const timer = setInterval(() => {
      target.value += full[i++];
      if (i >= full.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

// 轮播名言：打字→停留→滑出→下一条
async function cycleQuotes() {
  while (true) {
    const text = quotes[quoteIndex.value];
    await typeText(text, displayQuote, 100);
    await new Promise((r) => setTimeout(r, 1500)); // 显示停留
    displayQuote.value = ""; // 清空触发滑出
    await new Promise((r) => setTimeout(r, 500)); // 等待滑出过渡
    quoteIndex.value = (quoteIndex.value + 1) % quotes.length;
  }
}

onMounted(async () => {
  // 先打标题
  await typeText(fullTitle, displayTitle, 200);
  // 标题完成后小停，再启动名言循环
  setTimeout(() => cycleQuotes(), 500);
});
</script>

<style scoped lang="scss">
.home-container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* 改为靠上 */
  padding-top: 30vh; /* 顶部留白，可根据喜好调整 */
  background-color: #fcebf6;
  text-align: center;
  overflow: hidden;
}

.typing {
  .title {
    font-size: 3rem;
    margin: 0 0 1rem;
    color: #333;
  }
  .quote {
    font-size: 1.25rem;
    margin: 0;
    font-style: italic;
    color: #555;
  }
}

/* 名言滑入滑出过渡 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.footer {
  position: absolute;
  bottom: 1rem;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
}
</style>
