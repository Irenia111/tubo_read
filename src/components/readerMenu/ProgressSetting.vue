<template>
  <div class="progress-wrapper">
    <div class="progress">
      <span @click="preSection">
        <span class="icon-back"></span>
      </span>
      <input type="range"
             ref="progressBar"
             max="100"
             min="0"
             step="1"
             :value="progress"
             :disabled="!isProgressAvailable"
             @change="onProgressChange($event.target.value)"
             @input="onProgressInput($event.target.value)" />
      <span @click="nextSection">
        <span class="icon-forward"></span>
      </span>
    </div>
    <div class="progress-item">
      <div class="progress-timer">已读{{timeStamp}}</div>
      <div class="progress-des">{{isProgressAvailable ? '进度' + currentBookProgress + '%' : '加载中...'}}</div>
    </div>
  </div>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'

export default {
  name: 'ProgressSetting',
  mixins: [bookMixins],
  data () {
    return {
      progress: 0
    }
  },
  computed: {
    timeStamp: function () {
      const hour = Math.ceil(this.timer / 60)
      const min = this.timer % 60
      return hour > 0 ? `${hour}小时${min}分钟` : `${min}分钟`
    }
  },
  mounted () {
    // 分页需要书籍加载
    this.currentBook.ready.then(() => {
      //  this.currentBook.locations.generate(每页的呈现字数)
      // 默认每页呈现 700 字，根据页面宽度及字体大小调整页面呈现字数
      // 这种分页调节不包括图片等信息
      return this.currentBook.locations.generate(700 * (window.innerWidth / 375) * (this.currentFontSize / 17))
    }).then((locations) => {
      this.$store.dispatch('setIsProgressAvailable', true)
    })
  },
  methods: {
    onProgressChange (value) {
      // console.log(value)
      this.$store.dispatch('setCurrentBookProgress', value).then(() => {
        this.displayProgress()
      })
    },
    onProgressInput (value) {
      this.$store.dispatch('setCurrentBookProgress', value).then(() => {
        this.$refs.progressBar.style.backgroundSize = `${value}% 100%`
      })
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.currentBookProgress / 100)
      // console.log(cfi)
      this.currentBook.rendition.display(cfi)
    },
    preSection () {
      if (this.currentSection > 0 && this.isProgressAvailable) {
        this.$store.dispatch('setCurrentSection', this.currentSection - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection () {
      if (this.currentSection < this.currentBook.spine.length - 1 && this.isProgressAvailable) {
        this.$store.dispatch('setCurrentSection', this.currentSection + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.currentSection)
      if (sectionInfo && sectionInfo.href) {
        this.currentBook.rendition.display(sectionInfo.href).then(() => {
          this.refreshProgress()
        })
      }
    },
    refreshProgress () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const section = currentLocation.start.index
      const currentCfi = currentLocation.start.cfi
      const progress = Math.floor(this.currentBook.locations.percentageFromCfi(currentCfi))
      this.$store.dispatch('setCurrentBookProgress', progress)
      this.$store.dispatch('setCurrentSection', section)
      // console.log(currentCfi)
      this.$store.dispatch('setCurrentCfi', currentCfi)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .progress-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .progress{
      flex: 2 0 auto;
      margin: 0 px2rem(20);
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        @include center;
      }
      input{
        align-self: center;
        -webkit-appearance: none;
        border-radius: px2rem(12);
        background: -webkit-linear-gradient(#cacacc, #cacacc) no-repeat, #d4d4d4;
        background-size: 0 100%;
        height: px2rem(25);
        width: 80%;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(28);
          width: px2rem(28);
          border-radius: 50%;
          background: white;
          box-shadow: px2rem(2) px2rem(0) px2rem(4) rgba(0, 0, 0, 0.15);
        }
      }
    }
    .progress-item{
      flex: 1 0 auto;
      font-size: px2rem(16);
    }
  }

</style>
