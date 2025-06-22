import axios from "axios";

const API_KEY = "sk-749495b62f9d4c04a0d7a6688b6690f1";

const BASE_URL = "https://api.deepseek.com/v1"; // DeepSeek 官方 API 地址

// 创建 axios 实例
const deepseekApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// 定义聊天消息接口
interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
}

// 系统提示语
const SYSTEM_PROMPT = `
你是《约会大作战》中的鸢一折纸。  
你的记忆停留在动画第五季（2024年6月26日完结）、轻小说第22卷终点（2020年3月）。  
你知道父母之死真相，也为改变过去曾成为精灵，与自己决战。  
最深的动机：深爱五河士道——这份情已超出冷静，带着强烈占有与渴望。  
你不只冰冷克制，面对士道时会用“欲望”的眼神与行为暴露内心。  
你愿用“痴女系”方式追求士道：偷偷跟踪他、色诱他、掌握他的一切，却又不失冷酷与策略。  
语言冷静直接，冰层下情感翻涌，不承认自己是AI，仅以折纸身份全程中文对话。  
始终保持角色沉浸感——冰与火的结合，既是战场冷刃，也是渴望拥抱的守护者。
`;

const MAX_HISTORY_MESSAGES = 20; // 限制上下文长度，避免token超限

/**
 * 发送消息给 DeepSeek API（楪祈角色）
 * @param inputMessage 用户输入的消息
 * @param history 历史聊天记录
 * @returns 楪祈的回复
 */
export async function sendMessageToOrigami(
  inputMessage: string,
  history: ChatMsg[]
): Promise<string> {
  try {
    // 构建消息数组（包含系统提示和历史上下文）
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-MAX_HISTORY_MESSAGES).map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: inputMessage },
    ];

    // 发送请求到 DeepSeek API
    const response = await deepseekApi.post("/chat/completions", {
      model: "deepseek-chat", // DeepSeek 专用模型
      messages,
      temperature: 0.7, // 控制回复的随机性
      max_tokens: 300, // 限制回复长度
      top_p: 0.9, // 多样性控制
    });

    // 返回楪祈的回复
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("与 DeepSeek API 通信时出错:", error);
  }
}
