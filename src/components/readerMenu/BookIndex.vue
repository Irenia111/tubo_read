<template>
    <transition name="fade">
      <div class="book-index-wrapper" v-show="showBookIndexFlag">
        <transition name="slide-in">
          <div class="book-index" v-show="showBookIndexFlag">
            <keep-alive>
              <component class="content-wrapper" v-bind:is="currentTabComponent"></component>
            </keep-alive>
            <div class="tab-wrapper">
              <div :class="['tab-item', { 'is-active': currentTab === 1 }]"
                   @click="toggleCurrentTabComponent('tab1')"
              >{{$t('book.navigation')}}</div>
              <div :class="['tab-item', { 'is-active': currentTab === 2 }]"
                   @click="toggleCurrentTabComponent('tab2')"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </transition>
        <div class="overlay"  @click="toggleIndex(false)"></div>
      </div>
    </transition>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
import SlideBookContent from './SlideBookContent'
import SlideBookMark from './SlideBookMark'
export default {
  name: 'BookIndex',
  mixins: [bookMixins],
  data () {
    return {
      currentTabComponent: SlideBookContent,
      currentTab: 1
    }
  },
  methods: {
    toggleIndex (flag) {
      this.$store.dispatch('setShowBookIndexFlag', flag)
    },
    toggleCurrentTabComponent (tab) {
      // e.preventDefault()
      // e.stopPropagation()
      // console.log(e.target.textContent)
      const key = {
        tab1: {
          index: 1,
          components: SlideBookContent
        },
        tab2: {
          index: 2,
          components: SlideBookMark
        }
      }
      this.currentTab = key[tab].index
      this.currentTabComponent = key[tab].components
    }
  }

}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .book-index-wrapper{
    z-index: 200;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    overflow: hidden;
    .book-index{
      z-index: 210;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 85%;
      background: white;
      transition: transform 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      .content-wrapper{
        flex: 1 0 auto;
      }
      .tab-wrapper{
        flex: 0 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: px2rem(48);
        font-size: px2rem(18);
        border-top: 1px solid rgba(0,0,0,0.05);
        .tab-item{
          @include center;
          &.is-active{
            color: #40a9ff;
          }
        }
      }

    }
    .overlay{
      z-index: 205;
      position: absolute;
      background: rgba(0,0,0,0.5);
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
</style>
