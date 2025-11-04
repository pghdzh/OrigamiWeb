<template>
  <div class="origami-chat-container">
    <header class="chat-header">
      <img
        src="@/assets/zhezhi.png"
        alt="鸢一折纸"
        class="header-avatar glowing"
      />
      <h1 class="header-title">鸢一折纸の对话</h1>
      <button
        v-if="messages.length && !sending"
        class="clear-btn"
        @click="clearHistory"
      >
        🗑️ 清空记录
      </button>
    </header>

    <div class="chat-history" ref="historyRef">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="['message', msg.role + '-msg', msg.isEgg ? 'egg' : '']"
      >
        <div class="bubble">
          <div class="text" v-html="renderMarkdown(msg.text)"></div>
          <div class="meta">
            <span class="time">{{ msg.time }}</span>
            <span v-if="msg.loading" class="typing"
              ><span></span><span></span><span></span
            ></span>
          </div>
        </div>
      </div>
    </div>

    <footer class="chat-input-container">
      <textarea
        v-model="inputText"
        placeholder="…你的话语，我在倾听"
        @keydown.enter.exact.prevent="sendMessage"
      ></textarea>
      <div class="input-meta">
        <span>{{ inputText.length }} 字</span>
        <button :disabled="sending || !inputText.trim()" @click="sendMessage">
          {{ sending ? "发送中…" : "✉️ 发送" }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onMounted } from "vue";
import MarkdownIt from "markdown-it";
import { sendMessageToOrigami } from "@/api/deepseekApi";

interface UIMessage {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
  loading?: boolean;
  isEgg?: boolean;
}

const STORAGE_KEY = "origami_chat_history";
const messages = ref<UIMessage[]>([]);
const inputText = ref("");
const sending = ref(false);
const historyRef = ref<HTMLElement | null>(null);

const md = new MarkdownIt({ html: false, linkify: true });
function renderMarkdown(text: string) {
  return md.render(text);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scrollToBottom() {
  if (historyRef.value) {
    historyRef.value.scrollTo({
      top: historyRef.value.scrollHeight,
      behavior: "smooth",
    });
  }
}

function addMessage(msg: Omit<UIMessage, "id">) {
  const id = Date.now() + Math.random();
  messages.value.push({ id, ...msg });
}

async function sendMessage() {
  if (!inputText.value.trim() || sending.value) return;

  addMessage({
    role: "user",
    text: inputText.value.trim(),
    time: formatTime(new Date()),
  });
  const history = messages.value
    .filter((m) => !m.isEgg)
    .map((m) => ({ id: m.id, role: m.role, text: m.text }));
  const userInput = inputText.value.trim();
  inputText.value = "";
  scrollToBottom();

  addMessage({
    role: "bot",
    text: "",
    time: formatTime(new Date()),
    loading: true,
  });
  sending.value = true;
  nextTick(scrollToBottom);

  try {
    const reply = await sendMessageToOrigami(userInput, history);
    const botMsg = messages.value.find((m) => m.loading)!;
    botMsg.text = reply;
  } catch {
    const botMsg = messages.value.find((m) => m.loading)!;
    botMsg.text = "对不起，鸢一折纸暂时无法回应。";
  } finally {
    const botMsg = messages.value.find((m) => m.loading)!;
    botMsg.loading = false;
    sending.value = false;
    nextTick(scrollToBottom);
  }
}

function clearHistory() {
  if (sending.value) return;
  messages.value = [];
  nextTick(() => {
    addMessage({ role: "bot", text: "……", time: formatTime(new Date()) });
    nextTick(scrollToBottom);
  });
}

watch(
  messages,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
  },
  { deep: true }
);

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      messages.value = JSON.parse(saved);
    } catch {
      clearHistory();
    }
  } else {
    clearHistory();
  }
  nextTick(scrollToBottom);
});
</script>

<style lang="scss" scoped>
$bg-light: #f9f8fc;
$bg-dark: #1b0e2c;
$accent: #cfa6ff;
$ice-blue: #e8f4ff;
$lavender: #f4e8ff;


.origami-chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  background: linear-gradient(145deg, $lavender 0%, $bg-light 100%);
  color: #111;

  margin-top: 60px;
  font-family: "PingFang SC", "Noto Serif SC", serif;
  .chat-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.8);
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    .header-avatar {
      width: 48px;
      height: 48px;
      margin-right: 0.75rem;
      border-radius: 50%;
      &.glowing {
        box-shadow: 0 0 8px $accent;
      }
    }
    .header-title {
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 1px;
      font-family: "STKaiti", serif;
      color: $accent;
      flex: 1;
    }
    .clear-btn {
      background: transparent;
      border: 1px solid $accent;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      color: $accent;
      cursor: pointer;
      &:hover {
        background: rgba($accent, 0.2);
      }
    }
  }

  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .message {
      max-width: 70%;
      animation: fadeIn 0.3s ease-out;

      &.user-msg {
        align-self: flex-end;
        .bubble {
          background: $ice-blue;
          border-color: $ice-blue;
          color: #000;
          &::after {
            border-left-color: $ice-blue;
            right: -16px;
            top: 10px;
          }
        }
      }
      &.bot-msg {
        align-self: flex-start;
        .bubble {
          background: $lavender;
          border-color: $lavender;
          color: #222;
          &::after {
            border-right-color: $lavender;
            left: -16px;
            top: 10px;
          }
        }
      }
      .bubble {
        position: relative;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5;
        .time {
          font-size: 0.75rem;
          font-weight: 400;
          opacity: 0.7;
        }
        .typing {
          display: inline-flex;
          gap: 2px;
          span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: $accent;
            animation: blink 1s infinite;
          }
          span:nth-child(2) {
            animation-delay: 0.2s;
          }
          span:nth-child(3) {
            animation-delay: 0.4s;
          }
        }
      }
    }
  }

  .chat-input-container {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.9);
    border-top: 1px solid $accent;

    textarea {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid $accent;
      border-radius: 8px;
      resize: none;
      font-size: 1rem;
      background: #fff;
      color: #111;
      &::placeholder {
        color: rgba($accent, 0.7);
      }
    }
    .input-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.5rem;
      span {
        font-size: 0.8rem;
        color: $accent;
      }
      button {
        padding: 0 1.5rem;
        background: linear-gradient(135deg, $accent, $accent);
        border: none;
        border-radius: 8px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        &:disabled {
          opacity: 0.6;
          cursor: default;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
}
</style>
