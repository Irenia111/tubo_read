<template>
  <ebook-dialog :title="title" ref="dialog">
    <div class="dialog-list-wrapper" v-if="!ifNewGroup">
      <div class="dialog-list-item"
           :class="{'is-add': item.edit  ? item.edit === 1 : false}"
           v-for="(item, index) in categoryList"
           :key="index"
           @click="onGroupClick(item)"
           v-show="(item.edit === 2 && isInGroup) || item.edit !== 2 || !item.edit">
        <div class="dialog-list-item-text">{{item.title}}</div>
        <div class="dialog-list-icon-wrapper" v-if="isInGroup && shelfCategory.id === item.id">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
    <div class="dialog-new-group-wrapper" v-else>
      <div class="dialog-input-title-wrapper">
        <span class="dialog-input-title">{{$t('shelf.groupName')}}</span>
      </div>
      <div class="dialog-input-wrapper">
        <div class="dialog-input-inner-wrapper">
          <input type="text" class="dialog-input" v-model="newGroupName" ref="dialogInput">
          <div class="dialog-input-clear-wrapper" @click="clear" v-show="newGroupName && newGroupName.length > 0">
            <span class="icon-close-circle-fill"></span>
          </div>
        </div>
      </div>
    </div>
    <div slot="btn" class="group-dialog-btn-wrapper">
      <div class="dialog-btn" @click="hide">{{$t('shelf.cancel')}}</div>
      <div class="dialog-btn" @click="createNewGroup" :class="{'is-empty': newGroupName && newGroupName.length === 0}"
           v-if="ifNewGroup">{{$t('shelf.confirm')}}
      </div>
    </div>
  </ebook-dialog>
</template>

<script>
import EbookDialog from '../common/Dialog'
import homeMixins from '../../mixins/homeMixins'
import { removeAddFromShelf, appendAddToShelf } from '../../utils/store'

export default {
  name: 'group-dialog',
  mixins: [homeMixins],
  components: {
    EbookDialog
  },
  computed: {
    isInGroup () {
      return this.currentType === 2
    },
    defaultCategory () {
      return [
        {
          title: this.$t('shelf.newGroup'),
          edit: 1
        },
        {
          title: this.$t('shelf.groupOut'),
          edit: 2
        }
      ]
    },
    category () {
      return this.shelfList.filter(item => item.type === 2)
    },
    categoryList () {
      return [...this.defaultCategory, ...this.category]
    },
    title () {
      return !this.ifNewGroup ? this.$t('shelf.moveBook') : this.$t('shelf.newGroup')
    }
  },
  props: {
    showNewGroup: {
      type: Boolean,
      default: false
    },
    groupName: String
  },
  data () {
    return {
      ifNewGroup: false,
      newGroupName: ''
    }
  },
  methods: {
    show () {
      this.ifNewGroup = this.showNewGroup
      this.newGroupName = this.groupName
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
      // 是否新建分组
      this.ifNewGroup = false
    },
    onGroupClick (item) {
      // edit 等于 1 表示"新建分组"
      if (item.edit && item.edit === 1) {
        this.ifNewGroup = true
        // edit 等于 2 表示"移出分组"
      } else if (item.edit && item.edit === 2) {
        this.moveOutFromGroup(item)
      } else {
        // 没有edit,则执行移入书架
        this.moveToGroup(item)
      }
    },
    clear () {
      this.newGroupName = ''
    },
    moveToGroup (group) {
      // 书籍分组的实现
      // 有一个bug 第一本书，没有移入书架，还在外面存着
      // 1.遍历书架图书，当前图书在shelfSelected中则过滤
      this.$store.dispatch('setShelfList', this.shelfList.filter(book => this.shelfSelected.indexOf(book) < 0))
        .then(() => {
          if (group && group.itemList) {
            // 2. 更新书架的数据后，将分组的items和选择书籍的items进行合并
            group.itemList = [...group.itemList, ...this.shelfSelected]
          }
          // 3. 分组内书籍，根据index修改id, 确保书籍加入分组之后的存放顺序
          group.itemList.forEach((item, index) => {
            item.id = index + 1
          })
          this.$toast({ text: this.$t('shelf.moveBookInSuccess').replace('$1', group.title) }).show()
          this.onComplete()
        })
    },
    moveOutFromGroup () {
      // this.moveOutOfGroup(this.onComplete)
    },
    createNewGroup () {
      // 输入分组名不为空
      if (!this.newGroupName || this.newGroupName.length === 0) {
        return
      }
      const group = {
        id: this.shelfList[this.shelfList.length - 2].id + 1,
        itemList: [],
        selected: false,
        title: this.newGroupName,
        type: 2
      }
      // 将数据尾部的add元素去除
      const list = removeAddFromShelf(this.shelfList)
      // 添加新的分组
      list.push(group)
      // 重新set shelfList
      this.$store.dispatch('setShelfList', appendAddToShelf(list))
        .then(this.onComplete())
    },
    onComplete () {
      window.localStorage.setItem('shelfList', JSON.stringify(this.shelfList))
      this.hide()
      this.$store.dispatch('setIsEditMode', false)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './src/assets/style/global';
  .dialog-list-wrapper {
    width: 100%;
    padding: 0 px2rem(20);
    box-sizing: border-box;
    font-size: px2rem(14);
    @include scroll;
    .dialog-list-item {
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      color: #666;
      &.is-add {
        color: $color-blue;
        &:active {
          color: $color-blue-transparent;
        }
      }
      &:active {
        color: rgba(102, 102, 102, .5)
      }
      .dialog-list-item-text {
        flex: 1;
      }
      .dialog-list-icon-wrapper {
        flex: 0 0 px2rem(30);
        color: $color-blue;
        @include right;
      }
    }
  }

  .dialog-new-group-wrapper {
    width: 100%;
    padding: 0 px2rem(20);
    box-sizing: border-box;
    .dialog-input-title-wrapper {
      font-size: px2rem(10);
      margin-top: px2rem(20);
    }
    .dialog-input-wrapper {
      width: 100%;
      padding: 0 0 px2rem(30) 0;
      box-sizing: border-box;
      .dialog-input-inner-wrapper {
        display: flex;
        width: 100%;
        padding: px2rem(10) 0;
        box-sizing: border-box;
        border-bottom: px2rem(1) solid #eee;
        font-size: px2rem(14);
        color: #666;
        .dialog-input {
          flex: 1;
          border: none;
          &:focus {
            outline: none;
          }
        }
        .dialog-input-clear-wrapper {
          flex: 0 0 px2rem(30);
          color: #ccc;
          @include center;
          &:active {
            color: #999;
          }
        }
      }
    }
  }

  .group-dialog-btn-wrapper {
    width: 100%;
    @include center;
  }

  .dialog-btn {
    flex: 1;
    &.is-empty {
      color: rgba(255, 255, 255, .5);
    }
    &:active {
      color: rgba(255, 255, 255, .5)
    }
  }
</style>
