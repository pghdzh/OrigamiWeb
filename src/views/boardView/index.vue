<template>
  <div class="cyber-board" @scroll.passive="handleScroll" ref="scrollContainer">
    <div class="particles">
      <div
        v-for="(p, idx) in particles"
        :key="idx"
        class="particle"
        :style="{
          left: p.x + '%',
          animationDuration: p.duration + 's',
          animationDelay: p.delay + 's',
        }"
      ></div>
    </div>
    <h2 class="board-title">折纸留言板</h2>
    <ul class="messages">
      <li
        v-for="(msg, idx) in messages"
        :key="msg.id || idx"
        class="message-card"
      >
        <div class="header">
          <span class="author">{{ msg.name }}</span>
          <span class="time">{{ msg.time }}</span>
        </div>
        <p class="content">{{ msg.content }}</p>
      </li>
      <li v-if="!loading && messages.length === 0" class="empty">
        暂时还没有留言，写下你的心声吧～
      </li>
      <li v-if="loading" class="empty">加载中…</li>
    </ul>
    <div class="input-area">
      <input
        v-model="newAuthor"
        type="text"
        placeholder="您的名字"
        class="input-author"
      />
      <textarea
        v-model="newContent"
        placeholder="写下你的留言……"
        class="input-content"
      ></textarea>
      <button @click="postMessage" :disabled="posting" class="btn-post">
        {{ posting ? "发布中…" : "发布留言" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getMessageList, createMessage } from "@/api/modules/message";
interface Particle {
  x: number; // 左侧百分比
  duration: number; // 落下持续时长
  delay: number; // 延迟启动
}

const particles = ref<Particle[]>([]);

function initParticles() {
  const count = 30; // 粒子总数
  particles.value = Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    duration: 4 + Math.random() * 6, // 4–10 秒
    delay: Math.random() * 5, // 0–5 秒
  }));
}
interface Message {
  id?: number;
  name: string;
  content: string;
  time: string;
}

const messages = ref<Message[]>([]);
const page = ref(1);
const pageSize = 20;
const total = ref(0);
const loading = ref(false);
const posting = ref(false);
const newAuthor = ref("");
const newContent = ref("");
const scrollContainer = ref<HTMLElement | null>(null);
const finished = ref(false);

async function fetchMessages() {
  if (loading.value || finished.value) return;
  loading.value = true;
  try {
    const res = await getMessageList({ page: page.value, pageSize });
    total.value = res.pagination.total;
    const list = res.data;
    const formatted = list.map((item: any) => ({
      id: item.id,
      name: item.name,
      content: item.content,
      time: new Date(item.created_at).toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    messages.value.push(...formatted);

    if (messages.value.length >= total.value) finished.value = true;
    page.value++;
  } catch (err) {
    console.error(err);
    alert("留言加载失败，请稍后再试");
  } finally {
    loading.value = false;
  }
}

function handleScroll() {
  const container = scrollContainer.value;
  if (!container || loading.value || finished.value) return;

  const scrollThreshold = 100; // 离底部小于 100px 时加载
  if (
    container.scrollHeight - container.scrollTop - container.clientHeight <
    scrollThreshold
  ) {
    fetchMessages();
  }
}

async function postMessage() {
  if (!newAuthor.value.trim() || !newContent.value.trim()) {
    alert("请填写名字和留言内容 😊");
    return;
  }
  posting.value = true;
  try {
    const payload = {
      name: newAuthor.value.trim(),
      content: newContent.value.trim(),
    };
    await createMessage(payload);
    // 清空输入框
    newAuthor.value = "";
    newContent.value = "";
    // 重置列表
    page.value = 1;
    messages.value = [];
    finished.value = false;
    await fetchMessages();
  } catch (err) {
    console.error(err);
    alert("发布失败，请稍后再试");
  } finally {
    posting.value = false;
  }
}

onMounted(() => {
  fetchMessages();
  initParticles();
});
</script>
<style lang="scss" scoped>
.cyber-board {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  padding: 1.5rem;
  background: linear-gradient(135deg, #0f1a2b, #1b1f3b);
  color: #e0e0e0;
  overflow-y: auto;
  box-sizing: border-box;
  margin-top: 60px;

  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none; /* 不阻挡鼠标 */
    z-index: 0;
    .particle {
      position: absolute;
      bottom: -10px; /* 从视图底部下方开始 */
      width: 4px;
      height: 4px;
      background: #39ffea;
      border-radius: 50%;
      animation-name: particle;
      animation-timing-function: ease-out;
      animation-iteration-count: infinite;
    }
  }

  /* 动画关键帧：向上漂浮并淡出 */
  @keyframes particle {
    0% {
      transform: translateY(0) scale(0.6);
      opacity: 0.6;
    }
    100% {
      transform: translateY(-500px) scale(1.2);
      opacity: 0;
    }
  }

  /* 确保内容在粒子之上 */
  .cyber-board > *:not(.particles) {
    position: relative;
    z-index: 1;
  }

  .board-title {
    position: relative;
    margin: 0 auto 1rem;
    font-size: 2rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #39ffea, #c13cff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 60px;
      height: 2px;
      background: #39ffea;
      transform: translateY(-50%);
    }
    &::before {
      left: -80px;
    }
    &::after {
      right: -80px;
    }
  }

  .messages {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0.5rem 0;
    overflow-y: auto;

    .message-card {
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 8px rgba(57, 255, 234, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 12px rgba(57, 255, 234, 0.5);
      }
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;

        .author {
          font-weight: bold;
          color: #c13cff;
          text-shadow: 0 0 4px #c13cff;
        }
        .time {
          color: #f2f2f2;
          opacity: 0.6;
        }
      }
      .content {
        line-height: 1.6;
      }
    }

    .empty {
      text-align: center;
      color: #f2f2f2;
      opacity: 0.4;
      font-style: italic;
      margin-top: 2rem;
    }
  }
  .messages::-webkit-scrollbar {
    width: 6px;
  }
  .messages::-webkit-scrollbar-track {
    background: rgba(15, 26, 43, 0.3);
  }
  .messages::-webkit-scrollbar-thumb {
    background: #39ffea;
    border-radius: 3px;
  }
  .input-area {
    position: sticky;
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem 0;
    background: rgba(15, 26, 43, 0.2);

    input,
    textarea {
      flex: 1 1 auto;
      padding: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: #e0e0e0;
      backdrop-filter: blur(8px);
      font-size: 1rem;
      &::placeholder {
        color: #f2f2f2;
        opacity: 0.4;
      }
      &:focus {
        border-color: #39ffea;
        box-shadow: 0 0 6px #39ffea;
        outline: none;
      }
    }

    .input-content {
      min-height: 80px;
      resize: vertical;
      min-width: 80%;
    }

    .btn-post {
      flex: 0 0 auto;
      align-self: flex-end;
      padding: 0.75rem 1.5rem;
      background: #c13cff;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      text-shadow: 0 0 4px #c13cff;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 0 12px #c13cff;
      }
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
}
</style>
