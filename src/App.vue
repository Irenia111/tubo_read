<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  // 通过动态设置fontSize为屏幕宽的0.1，实现动态的rem值控制
  let fontSize = window.innerWidth / 10
  // 最大字号为50px
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
export default {
}
</script>

<style lang="scss">
  @import './assets/style/global.scss';
  #app{
    width: 100%;
    height: 100%;
    overflow: hidden;
    // 下拉后的背景色
    background: #7d8188;
  }

</style>
