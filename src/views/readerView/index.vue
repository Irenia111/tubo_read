<template>
  <div class="reader-view-wrapper">
    <reader-header />
    <book-reader />
    <reader-menu />
  </div>
</template>

<script>
import ReaderHeader from '../../components/readerHeader/index'
import ReaderMenu from '../../components/readerMenu/index'
import BookReader from '../../components/bookReader/index'
export default {
  name: 'readerView',
  components: { ReaderMenu, ReaderHeader, BookReader }
}
</script>

<style lang="scss" scoped>
.reader-view-wrapper{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
