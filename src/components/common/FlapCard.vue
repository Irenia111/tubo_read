<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible" @click="close">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"
               ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'
import { flapCardList } from '../../utils/store'
export default {
  name: 'FlapCard',
  mixins: [homeMixins],
  data () {
    return {
      flapCardList,
      intervalTime: 25,
      frontIndex: 0,
      backIndex: 1,
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false,
      timeout: null,
      timeout2: null
    }
  },
  watch: {
    flapCardVisible (v) {
      if (v) {
        this.runAnimation()
      }
    }
  },
  methods: {
    // 设置每个动画item的图片展现方式
    semiCircleStyle (item, dir) {
      return {
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: '50%',
        // backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    runAnimation () {
      this.runFlapCardAnimation = true
      // 300ms之后开启flapard
      this.timeout = setTimeout(() => {
        this.startFlapCardAnimation()
      }, 300)
      // 2.5s之后关闭flapCard动画，展示bookCard
      this.timeout2 = setTimeout(() => {
        // 关闭动画
        this.stopAnimation()
        this.runBookCardAnimation = true
      }, 2500)
    },
    stopAnimation () {
      if (this.task) {
        clearInterval(this.task)
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.timeout2) {
        clearTimeout(this.timeout2)
      }
      this.reset()
    },
    startFlapCardAnimation () {
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.intervalTime)
    },
    // 重置backItem的背景色和旋转角度
    prepare () {
      const backFlapCard = this.flapCardList[this.backIndex]
      // 设置backItem的旋转角度为180
      // 因为一起旋转时两者都会旋转
      backFlapCard.rotateDegree = 180
      // 将backItem的背景色加深
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.backIndex, 'back')
    },
    // 旋转frontItem和backItem
    flapCardRotate () {
      const frontFlapCard = this.flapCardList[this.frontIndex]
      const backFlapCard = this.flapCardList[this.backIndex]
      // 每次旋转10度
      frontFlapCard.rotateDegree += 10
      frontFlapCard._g -= 5
      backFlapCard.rotateDegree -= 10
      if (backFlapCard.rotateDegree < 90) {
        // backItem到达90度之后再开始颜色变浅
        backFlapCard._g += 5
      }
      // 修改item的index值
      if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
        backFlapCard.zIndex += 2
      }
      this.rotate(this.frontIndex, 'front')
      this.rotate(this.backIndex, 'back')
      // 第一次旋转结束，开启下一次旋转
      if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
        this.next()
      }
    },
    // 重置item样式，实现旋转效果
    rotate (index, type) {
      const item = this.flapCardList[index]
      let dom
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
    },
    next () {
      // 拿到上一次的item的对象
      const frontFlapCard = this.flapCardList[this.frontIndex]
      const backFlapCard = this.flapCardList[this.backIndex]
      // 重置item的背景色和旋转角度
      frontFlapCard.rotateDegree = 0
      backFlapCard.rotateDegree = 0
      frontFlapCard._g = frontFlapCard.g
      backFlapCard._g = backFlapCard.g
      // 实现最后一次旋转&重置item dom的样式
      this.rotate(this.frontIndex, 'front')
      this.rotate(this.backIndex, 'back')
      // index增加，开始下一次的旋转
      this.frontIndex++
      this.backIndex++
      const len = this.flapCardList.length
      if (this.frontIndex >= len) {
        this.frontIndex = 0
      }
      if (this.backIndex >= len) {
        this.backIndex = 0
      }
      // 动态设置list的zIndex
      // 100 -> 96
      // 99 -> 100
      // 98 -> 99
      // 97 -> 98
      // 96 -> 97
      // (0 - 1 + 5) % 5 = 4
      // (1 - 1 + 5) % 5 = 0
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.frontIndex + len) % len)
      })
      // 开始下一次的旋转
      this.prepare()
    },
    // 初始化动画
    reset () {
      this.frontIndex = 0
      this.backIndex = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        // 重置item样式
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
    },
    close () {
      // 关闭时取消动画效果
      this.stopAnimation()
      this.$store.dispatch('setFlapCardVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";

  .flap-card-wrapper {
    z-index: 500;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    position: relative;
    @include absCenter;
    .flap-card-bg {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: px2rem(5);
      background: white;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      .flap-card {
        width: 48px;
        height: 48px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            // 图片不重复出现，只平铺一张
            background-repeat: no-repeat;
            // 隐藏背面，旋转后背面隐藏
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-left {
            border-radius: 24px 0 0 24px;
            // 图片位置
            background-position: center right;
            // 旋转轴设置
            transform-origin: right;
          }
          .flap-card-semi-circle-right {
            border-radius: 0 24px 24px 0;
            // 图片位置
            background-position: center left;
            // 旋转轴设置
            transform-origin: left;
          }
        }
      }
  }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: 20%;
      z-index: 600;
      width: 100%;
      @include center;
      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        border-radius: 50%;
        background: #333;
        font-size: px2rem(20);
        color: white;
        @include center;
      }
    }
  }
</style>
