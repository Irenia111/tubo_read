<template>
  <transition name="dialog-fade" @after-leave="handleLeave">
    <div class="card-wrapper" v-show="visible">
      <div class="card-bg">
        <!-- 跟随进度变化，但是下载的书多，所以体验感一般，要做动画的 -->
        <svg
          class="progress-ring"
          width="120"
          height="120">
          <circle ref="circle"
            class="progress-ring__circle"
            stroke="rgb(74, 171, 255)"
            stroke-width="4"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"/>
        </svg>
        <div class="card-des">{{text}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      visible: false,
      percentage: 0,
      text: ''
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    updateProgress (percentage) {
      const circle = this.$refs.circle
      const radius = circle.r.baseVal.value
      const circumference = radius * 2 * Math.PI

      circle.style.strokeDasharray = `${circumference} ${circumference}`
      circle.style.strokeDashoffset = `${circumference}`

      function setProgress (percent) {
        const offset = circumference - percent / 100 * circumference
        circle.style.strokeDashoffset = offset
      }
      setProgress(percentage)
    },
    updateText (text) {
      this.text = text
    },
    hide () {
      this.visible = false
    },
    handleLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .card-wrapper {
    z-index: 2000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    font-size: px2rem(14);
    line-height: px2rem(16);
    color: #333;
    @include center;
    .card-bg {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 60%;
      background: white;
      border-radius: px2rem(10);
      top: 20%;
      align-items: center;
      justify-content: center;
      padding: px2rem(10);
      .progress-ring__circle {
        transition: 0.35s stroke-dashoffset;
        // axis compensation
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }
      .card-des {
        width: 100%;
        margin: px2rem(8);
        text-align: center;
      }
    }
  }

</style>
