<template>
  <transition>
    <div class="book-index-weapper" v-show="!showMenuFlag&&showBookIndexFlag">
      <div class="book-index"></div>
    </div>
  </transition>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
export default {
  name: 'BookIndex',
  mixins: [bookMixins]
}
</script>

<style scoped>

</style>
