<template>
  <section class="origami-overview">
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">鸢一折纸</h1>
        <p class="hero-subtitle">“真正的爱，从现在开始培养。”</p>
      </div>
    </div>

    <div class="container">
      <!-- 左侧主要信息 -->
      <div class="col-main">
        <!-- 基础信息 卡片 -->
        <div class="card basic-info">
          <h2 class="card-title">基础信息</h2>
          <dl class="info-list">
            <div v-for="(value, key) in info" :key="key" class="info-item">
              <dt>{{ labels[key] }}</dt>
              <dd>{{ Array.isArray(value) ? value.join(" / ") : value }}</dd>
            </div>
          </dl>
        </div>

        <!-- 能力体系 卡片 -->
        <div class="card abilities">
          <h2 class="card-title">能力体系</h2>
          <div class="ability-wrap">
            <div class="ability-block">
              <h3>天使形态 (Methratton)</h3>
              <ul>
                <li v-for="(skill, idx) in abilities.angel" :key="idx">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-effect">{{ skill.effect }}</span>
                </li>
              </ul>
            </div>
            <div class="ability-block reverse">
              <h3>魔王形态 (Satan)</h3>
              <p>{{ abilities.demon }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧次要信息 -->
      <div class="col-side">
        <!-- 性格剖析 卡片 -->
        <div class="card personality">
          <h2 class="card-title">性格剖析</h2>
          <div class="personality-list">
            <div
              v-for="(item, idx) in personality"
              :key="idx"
              class="personality-item"
            >
              <h4>{{ item.period }}</h4>
              <p>{{ item.traits }}</p>
            </div>
          </div>
        </div>

        <!-- 人际关系 卡片 -->
        <div class="card relations">
          <h2 class="card-title">人际关系</h2>
          <ul class="relation-list">
            <li v-for="(rel, idx) in relations" :key="idx">
              <span class="relation-name">{{ rel.name }}</span>
              <span class="relation-desc">{{ rel.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "OrigamiOverview",
  setup() {
    const labels = {
      alias: "别名",
      birthday: "生日",
      age: "年龄",
      blood: "血型",
      height: "身高",
      weight: "体重",
      school: "学校",
      unit: "部队",
      rank: "阶级",
    };

    const info = reactive({
      alias: ["五河千代纸", "Angel / Devil"],
      birthday: "11月11日",
      age: "16岁",
      blood: "A型",
      height: "152cm",
      weight: "-",
      school: "都立来禅高中2年4班",
      unit: "陆上自卫队对精灵部队AST",
      rank: "上士",
    });

    const personality = reactive([
      {
        period: "日常状态",
        traits: "面无表情的“人偶少女”，沉默寡言，行动高效如机械。",
      },
      {
        period: "对士道执念",
        traits: "病态痴女，全面监控士道生活数据，为满足其特殊癖好可瞬间变装。",
      },
      { period: "反转时期", traits: "绝望化身，无差别毁灭世界。" },
      { period: "新世界线", traits: "隐性傲娇，情感表达更自然。" },
    ]);

    const abilities = reactive({
      angel: [
        { name: "日轮 (Shemesh)", effect: "光弹雨无差别轰炸" },
        { name: "天翼 (Mal'akh)", effect: "超高速飞行/瞬移" },
        { name: "光剑 (Kadour)", effect: "分裂浮游炮多角度精准打击" },
        { name: "炮冠 (Artelif)", effect: "王冠聚合能量炮（最强一击）" },
      ],
      demon: "黑色羽片自动防御与攻击，吞噬绝望的具象化，破坏力远超天使态。",
    });

    const relations = reactive([
      { name: "五河士道", desc: "唯一救赎者与名义恋人；幼年约定互称名字。" },
      { name: "崇宫真那", desc: "AST战友与士道实妹，强迫其称自己为“大嫂”。" },
      { name: "夜刀神十香", desc: "初期死敌，后期和解并合作。" },
      { name: "时崎狂三", desc: "利用其能力回到过去，被称“很美味”。" },
      { name: "八舞夕弦", desc: "传授恋爱技巧，被尊为“大师”。" },
    ]);

    return { labels, info, personality, abilities, relations };
  },
});
</script>

<style lang="scss" scoped>
$bg: #f9f8fc;
$card: #fff;
$title: #4a4a6a;
$text: #3c3c4f;
$accent: #9575cd;
$border: #ebe8f1;

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.origami-overview {
  font-family: "Segoe UI", Arial;
  color: $text;
  background: $bg;
  height: calc(100vh - 64px);
  margin-top: 64px;
  .hero {
    background: $card;
    padding: 2rem 0;
    text-align: center;
    .hero-title {
      font-size: 3rem;
      color: $title;
      margin-bottom: 0.3rem;
      animation: fadeIn 0.6s ease-out;
    }
    .hero-subtitle {
      font-size: 1.2rem;
      color: $accent;
      font-style: italic;
      animation: fadeIn 0.8s ease-out;
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 60px;
    padding: 0 1rem;
  }

  .col-main {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .col-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .card {
    background: $card;
    border: 1px solid $border;
    border-radius: 12px;
    padding: 1.5rem;
    animation: fadeIn 0.6s ease-out;
    .card-title {
      font-size: 1.6rem;
      color: $accent;
      margin-bottom: 1rem;
      border-bottom: 2px solid $border;
      padding-bottom: 0.5rem;
    }
  }

  .info-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem 1rem;
    .info-item {
      display: flex;
      dt {
        width: 4rem;
        font-weight: bold;
      }
      dd {
        margin: 0;
      }
    }
  }

  .abilities {
    .ability-wrap {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
      .ability-block {
        flex: 1;
        h3 {
          font-size: 1.2rem;
          color: $title;
          margin-bottom: 0.5rem;
        }
        ul {
          list-style: none;
          padding: 0;
          li {
            margin-bottom: 0.6rem;
            display: flex;
            .skill-name {
              width: 120px;
              font-weight: 600;
            }
          }
        }
        &.reverse {
          p {
            line-height: 1.6;
          }
        }
      }
    }
  }

  .personality {
    .personality-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .personality-item {
        background: #f2f1f6;
        border-radius: 8px;
        padding: 0.8rem;
        h4 {
          margin: 0;
          font-size: 1.1rem;
          color: $title;
        }
        p {
          margin: 0.4rem 0 0;
        }
      }
    }
  }

  .relations {
    .relation-list {
      list-style: none;
      padding: 0;
      li {
        display: flex;
        margin-bottom: 0.8rem;
        .relation-name {
          width: 100px;
          font-weight: 600;
          color: $title;
        }
      }
    }
  }
}
</style>
