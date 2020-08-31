<template>
  <!--
  1. 卡片登场动画效果
  2. 卡片翻转动画效果
  3. 烟火效果
  4. 推荐书目出现
   -->
  <div class="flap-card-wrapper" v-show="flapCardVisible" @click="close">
    <div class="flap-card-bg" :class="{'animation' : runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <!--卡片翻转动画效果-->
      <div class="flap-card"
           v-for="(item, index) in flapCardList"
           :key="index" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCircleStyle(item, 'left')"
               ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCircleStyle(item, 'right')"
               ref="right"></div>
        </div>
      </div>
      <!--烟火动画效果-->
      <div class="point-wrapper">
        <div class="point"
             :class="{'animation': runPointAnimation}"
             v-for="item in pointList" :key="item"></div>
      </div>
    </div>
    <div class="book-card" :class="{'animation': runBookCardAnimation}" v-show="runBookCardAnimation">
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data ? data.cover : ''">
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">立即阅读</div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="close">
      <div class="icon-close"></div>
    </div>
  </div>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'
import { flapCardList, categoryText } from '../../utils/store'
export default {
  name: 'FlapCard',
  mixins: [homeMixins],
  props: {
    data: Object
  },
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
  created () {
    this.pointList = []
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`)
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
      // 300ms卡片登场动画
      this.runFlapCardAnimation = true
      // 300ms之后开启flapCard
      this.timeout = setTimeout(() => {
        this.startPointAnimation()
        this.startFlapCardAnimation()
      }, 350)
      // 模拟接口调用
      // 2.5s之后关闭flapCard动画，展示bookCard
      this.timeout2 = setTimeout(() => {
        // 关闭动画
        this.stopAnimation()
        this.runBookCardAnimation = true
      }, 2500)
    },
    stopAnimation () {
      // 隐藏卡片翻转动画
      this.runFlapCardAnimation = false
      this.runPointAnimation = false
      // 清除定时器
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
    startPointAnimation () {
      this.runPointAnimation = true
      // 可以设置定时器取消动画效果，但是感觉这样会造成js和css的混杂
      /*
      setTimeout(() => {
        this.runPointAnimation = false
      }, 750)
       */
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
    categoryText () {
      if (this.data) {
        return categoryText(this.data.category)
      } else {
        return ''
      }
    },
    showBookDetail (data) {
      console.log(data)
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
  //引入动画变量文件
  @import "./src/assets/flapCard";
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
      opacity: 1;
      transform: translate(-50%, -50%);
      // 卡片登场动画
      &.animation {
        // animation-fill-mode
        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode
        // both 保留动画前及动画后的状态
        animation: show-flap-card .35s ease-in-out both;
      }
      @keyframes show-flap-card {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.4);
          opacity: 1;
        }
        75% {
          transform: translate(-50%, -50%) scale(0.9);
          opacity: 1;
        }
        90% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      }
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
      .point-wrapper {
        z-index: 1000;
        @include absCenter;
        .point {
          border-radius: 50%;
          @include absCenter;
          // 因为动画结束后dom依旧存在，所以在minxin中设置
          // $animationFillMode: backwards;
          // 动画结束后回到初始状态
          // 也可以在js中通过定时器设置animation效果取消
          opacity: 0;
          &.animation {
            // 从$moves中取得item
            @for $i from 1 to length($moves) {
              // 使用伪类选择器
              &:nth-child(#{$i}) {
                // 为烟花点绑定动画
                // 因为动画结束后dom依旧存在，所以在minxin中设置
                // $animationFillMode: backwards;
                // 动画结束后回到初始状态
                @include move($i);
              }
            }
          }
        }
      }
  }
    .book-card {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 65%;
      max-width: px2rem(400);
      box-sizing: border-box;
      border-radius: px2rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: px2rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: px2rem(20);
          @include center;
          .img {
            width: px2rem(90);
            height: px2rem(130);
          }
        }
        .content-wrapper {
          padding: 0 px2rem(20);
          margin-top: px2rem(20);
          .content-title {
            color: #333;
            font-weight: bold;
            font-size: px2rem(18);
            line-height: px2rem(20);
            max-height: px2rem(40);
            text-align: center;
            @include ellipsis2(2)
          }
          .content-author {
            margin-top: px2rem(10);
            text-align: center;
          }
          .content-category {
            color: #999;
            font-size: px2rem(14);
            margin-top: px2rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 px2rem(15) px2rem(15);
          padding: px2rem(15) 0;
          text-align: center;
          color: white;
          font-size: px2rem(14);
          background: $color-blue;
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
