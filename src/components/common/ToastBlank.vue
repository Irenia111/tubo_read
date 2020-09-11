<template>
  <div>
  <transition name="toast-fade" @after-leave="handleLeave">
    <div class="toast-wrapper" v-show="visible">
      <div class="toast" v-html="showText"></div>
    </div>
  </transition>
    <!-- 加入toast-bg ，防止在弹窗时用户的按键操作-->
    <div class="toast-bg" @click.prevent></div>
  </div>
</template>

<script>
export default {
  name: 'ToastBlank',
  data () {
    return {
      text: '',
      timeout: 2000,
      visible: false,
      showText: ''
    }
  },
  methods: {
    hide () {
      this.visible = false
    },
    updateText (text) {
      // 为了在continueShow时，实现文本的更新
      this.showText = text
    },
    show () {
      this.updateText(this.text)
      clearTimeout(this.task)
      this.task = null
      this.visible = true
      this.task = setTimeout(() => {
        this.visible = false
      }, this.timeout)
    },
    continueShow (text) {
      clearTimeout(this.task)
      this.updateText(text)
      this.task = null
      this.visible = true
    },
    // 新增方法，在动画结束后，删除dom
    handleLeave () {
      clearTimeout(this.task)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './src/assets/style/global';
    .toast-wrapper {
      position: absolute;
      top: px2rem(50);
      margin: 0 10%;
      z-index: 2500;
      width: 80%;
      line-height: px2rem(20);
      padding: px2rem(10) px2rem(20);
      box-sizing: border-box;
      background: #ccc;
      border-radius: px2rem(10);
      font-size: px2rem(14);
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  .toast-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 2200;
  }
</style>
