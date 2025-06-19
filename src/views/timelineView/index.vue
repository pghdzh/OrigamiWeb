<template>
  <div class="page-wrapper">
    <div class="timeline-container">
      <h1 class="timeline-title">鸢一折纸 时间线</h1>
      <ul class="timeline-list">
        <li
          v-for="(section, index) in timelineData"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker">
            <span class="marker-index">{{ index + 1 }}</span>
          </div>
          <div class="timeline-content">
            <div class="section-header">
              <h2 class="section-title">{{ section.title }}</h2>
              <span class="section-period">{{ section.period }}</span>
            </div>
            <ul class="event-list">
              <li
                v-for="(event, idx) in section.events"
                :key="idx"
                class="event-item"
              >
                <div class="event-time">{{ event.time }}</div>
                <div class="event-desc">{{ event.desc }}</div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

type Event = { time: string; desc: string };
type Section = { title: string; period: string; events: Event[] };

const timelineData = reactive<Section[]>([
  {
    title: "一、童年时期（原世界线）",
    period: "2005–2010",
    events: [
      { time: "2005年（6岁前）", desc: "家庭幸福，性格开朗，与父母关系亲密。" },
      {
        time: "2010年8月3日（11岁）",
        desc: "父母死于火灾，实为未来折纸反转体误击；被士道安慰，性格骤变，立誓消灭精灵。",
      },
    ],
  },
  {
    title: "二、AST时期（第1-3季）",
    period: "2015年4月起",
    events: [
      { time: "2015年4月", desc: "入都立来禅高中，与士道同班，对其病态痴迷。" },
      { time: "十香篇", desc: "多次狙击十香，误伤士道导致其“死亡”。" },
      { time: "四糸乃篇", desc: "女仆装互动，夺取四糸乃手偶。" },
      { time: "狂三篇", desc: "调查狂三身份，重伤后误以琴里为仇人。" },
      { time: "琴里篇", desc: "盗取White Lycoris攻击琴里，被制止后停职。" },
      {
        time: "八舞篇",
        desc: "修学旅行中担任恋爱导师，为救士道昏迷中许愿“变强”。",
      },
      { time: "美九篇", desc: "启用SSS装备击伤艾伦·米拉·梅瑟斯。" },
      { time: "七罪篇", desc: "以“五河千代纸”身份加入DEM，摧毁卫星。" },
    ],
  },
  {
    title: "三、精灵化与反转（第3季 折纸篇）",
    period: "S3E6–10",
    events: [
      {
        time: "S3E6-7",
        desc: "获得幻影灵结晶，精灵化为【光之天使】，灵装婚纱。",
      },
      { time: "S3E8", desc: "穿越至2010年误杀双亲，反转成为【救世魔王】。" },
      {
        time: "S3E9-10",
        desc: "士道二次穿越救父母，折纸“死亡”重生，新世界线开朗。",
      },
    ],
  },
  {
    title: "四、新世界线的救赎（第4-5季）",
    period: "S4–S5",
    events: [
      { time: "精灵协作期", desc: "开朗归来，与十香和解，参与精灵合作战。" },
      {
        time: "最终决战",
        desc: "在士道对抗初始精灵澪时成为关键战力，结婚改姓五河千代纸，象征救赎。",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
$page-padding: 64px;
.page-wrapper {
  width: 100vw;
  min-height: calc(100vh - #{$page-padding});
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: $page-padding;
}
.timeline-container {
  width: 90%;
  max-width: 1200px;
  border-radius: 16px;
  padding: 2rem;
  background: rgba(255,255,255,0.9);
  overflow: auto;
}
.timeline-title {
  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #34495e;
}
.timeline-list {
  position: relative;
  padding-left: 60px;
  &:before {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #bdc3c7;
  }
  list-style: none;
}
.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  .timeline-marker {
    position: absolute;
    left: 18px;
    width: 40px;
    height: 40px;
    background: #6c5ce7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    .marker-index { font-size: 1rem; color: #fff; font-weight: bold; }
  }
  .timeline-content {
    margin-left: 80px;
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      .section-title {
        font-size: 1.6rem;
        color: #2c3e50;
        font-weight: 600;
      }
      .section-period {
        font-size: 0.9rem;
        color: #7f8c8d;
        background: #ecf0f1;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
      }
    }
    .event-list {
      list-style: none;
      padding: 0;
      .event-item {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0.8rem;
        .event-time {
          flex: 0 0 140px;
          font-weight: 500;
          color: #8e44ad;
        }
        .event-desc { flex: 1; color: #34495e; }
      }
    }
  }
}

// 移动端适配
@media (max-width: 768px) {
  .timeline-container {
    width: 95%;
    padding: 1.5rem;
  }
  .timeline-title { font-size: 2rem; }
  .timeline-list {
    padding-left: 20px;
    &:before { left: 10px; width: 2px; }
  }
  .timeline-item { margin-bottom: 1.5rem;
    .timeline-marker {
      left: 8px;
      width: 30px;
      height: 30px;
      .marker-index { font-size: 0.9rem; }
    }
    .timeline-content {
      margin-left: 50px;
      .section-header { flex-direction: column; align-items: flex-start;
        .section-title { font-size: 1.3rem; }
        .section-period { margin-top: 0.5rem; }
      }
      .event-list .event-item { flex-direction: column;
        .event-time { flex: none; margin-bottom: 0.3rem; }
      }
    }
  }
}
</style>
