<template>
  <!-- 使用 v-if 是为了彻底删除dom，如果在transition的afterleave上绑定销毁dom，是否一样呢 -->
  <div class="popup" v-if="popupVisible">
    <transition name="popup-bg-fade" @after-leave="handleLeave">
    <div class="popup-bg" @click.stop.prevent="hide" v-show="popupBgVisible"></div>
    </transition>
    <transition name="popup-slide-in">
    <div class="popup-wrapper" v-show="popupItemvisible">
      <div class="popup-title" v-if="title && title.length > 0">{{title}}</div>
      <div class="popup-btn"
           :class="{'danger':item.type==='danger'}"
           v-for="(item, index) in btn"
           :key="index"
           @click="item.click">{{item.text}}
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data () {
    return {
      title: '',
      btn: [],
      // 设置两个 visible 是为了控制弹窗和背景的动画效果
      popupVisible: false,
      popupBgVisible: false,
      popupItemvisible: false
    }
  },
  methods: {
    show () {
      // 先展示背景
      this.popupVisible = true
      // 再展示弹窗
      // nextTick不行
      /* this.$nextTick(() => {
        this.visible = true
      })
      */
      setTimeout(() => {
        this.popupBgVisible = true
        this.popupItemvisible = true
      }, 0)
    },
    hide () {
      this.popupItemvisible = false
      this.popupBgVisible = false
    },
    handleLeave () {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    height: 100%;
    .popup-bg {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .4);
    }
    .popup-wrapper {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 2000;
      width: 100%;
      background: white;
      .popup-title {
        width: 100%;
        // height: px2rem(50);
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(12);
        line-height: px2rem(14);
        padding: px2rem(15);
        box-sizing: border-box;
        color: #999;
        text-align: center;
        word-break: break-all;
        @include center;
      }
      .popup-btn {
        width: 100%;
        height: px2rem(60);
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(16);
        color: #666;
        font-weight: bold;
        @include center;
        &.danger {
          color: $color-blue;
        }
      }
    }
  }
</style>
