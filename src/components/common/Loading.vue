<template>
  <transition name="dialog-fade" @after-leave="handleLeave">
    <div class="card-wrapper" v-show="visible">
      <div class="card-bg">
        <div class="progress-wrapper">
          <svg class="progress-ring" width="160" height="160">
           <circle ref="circle"
              id="progress-ring__circle0"
              stroke="rgb(74, 171, 255)"
              stroke-width="4"
              stroke-linecap="round"
              fill="transparent"
              r="70"
              cx="80"
              cy="80"/>
            <circle ref="circle"
                    id="progress-ring__circle1"
                    stroke-width="4"
                    stroke-linecap="round"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"/>
          </svg>
          <div class="progress-title">{{downloadText}}</div>
          </div>
        <div class="card-des">{{fileNameText}}</div>
        <div class="card-des">{{percentText}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      downloadText: '',
      visible: false,
      fileNameText: '',
      percentText: ''
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    updateFileName (fileNameText) {
      this.fileNameText = fileNameText
    },
    updateProgress (percentText) {
      this.percentText = percentText
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
      .progress-wrapper{
        margin: px2rem(10) px2rem(10) px2rem(15) px2rem(10);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .progress-ring{
          // 分为两个动画，一个控制旋转，一个控制长度变化
          @keyframes rotation {
            0%{
              transform: rotate(0deg);
            }
            100%{
              transform: rotate(360deg);
            }
          }
          @keyframes stroke {
            0%{
              stroke-dasharray: 30, 100, 30, 100;
              stroke-dashoffset: 200;
            }
            100%{
              stroke-dasharray: 30, 30, 30, 30;
              stroke-dashoffset: 150;
            }
          }
          @keyframes rotation1 {
            0%{
              transform: rotate(-20deg);
            }
            100%{
              transform: rotate(340deg);
            }
          }
          @keyframes stroke1 {
            100%{
              stroke-dasharray: 100;
              stroke-dashoffset: 200;
            }
            0%{
              stroke-dasharray: 50;
              stroke-dashoffset: 150;
            }
          }
          #progress-ring__circle0 {
            stroke-dasharray: 210;
            stroke-dashoffset: 0;
            transform-origin: center center;
            animation: rotation 2s infinite, stroke 3s infinite;
          }
          #progress-ring__circle1 {
            opacity: 0.4;
            stroke: rgb(74, 171, 255);
            transform-origin: center center;
            animation: rotation1 2s infinite, stroke1 3s infinite;
          }
        }
        .progress-title{
          position: absolute;
          top: 50%;
          left:50%;
          transform: translate(-50%, -50%);
          font-weight: bold;
          // color: rgb(22, 133, 255);;
          // animation: breath 2s infinite;
        }
        @keyframes breath {
          0%, 100%{
            opacity: 0.4;
          }
          50%{
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      }
      .card-des {
        box-sizing: border-box;
        width: 100%;
        padding: px2rem(10) px2rem(5);
        text-align: center;
        font-size: px2rem(10);
        line-height: px2rem(12);
        @include ellipsis;
      }
    }
  }

</style>
