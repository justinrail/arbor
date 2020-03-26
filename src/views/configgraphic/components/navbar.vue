<template>
  <!-- <header class="header"> -->
    <div class="navbar container">
      <input type="file" id="file1" ref="inputer" style="display:none" @change="fileUpload()"/>
      <section class="logo navbar-section">
        <!-- <vpd-icon name="anchor" /> -->
      </section>
      <section class="navbar-section">
         <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="打开一个页面 Ctrl + o"
          @click="openPage">
          <vpd-icon name="open" /> 打开
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="复制元件 Ctrl + C"
          @click="copyWidget">
          <vpd-icon name="copy" /> 复制
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="删除元件 Delete"
          @click="dele">
          <vpd-icon name="trash-2" /> 删除
        </a>
        <a
          class="btn btn-link tooltip tooltip-bottom"
          data-tooltip="保存 Ctrl + S"
          @click="save"><vpd-icon name="save" /> 保存</a>
      </section>
    </div>
  <!-- </header> -->
</template>

<script>
import vpd from '../mixins/vpd'
import icon from './icon.vue'
import FileSaver from 'file-saver'
export default {
  components: {
    [icon.name]: icon
  },
  mixins: [vpd],
  computed: {
    show () {
      return this.$vpd.state.type !== 'page'
    }
  },
  mounted () {
    // Ctrl + o 打开页面
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 79) {
          this.openPage()
        }
      },
      true
    )
    // Ctrl + C 复制元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget()
        }
      },
      true
    )

    // Delete 删除选中元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.dele()
        }
      },
      true
    )

    // Ctrl + S 保存
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save()
        }
      },
      true
    )
  },

  methods: {
    // 保存
    save () {
      this.$vpd.dispatch('save')
      const data = JSON.stringify(this.$vpd.state)
      const blob = new Blob([data], { type: '' })
      // const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(blob, 'demopage.txt')
    },

    openPage () {
      document.getElementById('file1').click()
    },

    fileUpload () {
      const selectedFile = document.getElementById('file1').files[0]
      // FileReader对象，h5提供的异步api，可以读取文件中的数据。
      const reader = new FileReader()
      // readAsText是个异步操作，只有等到onload时才能显示数据。
      const self = this
      reader.readAsText(selectedFile)
      reader.onload = function () {
        self.$vpd.replaceState(JSON.parse(this.result))
      }
    },

    // 复制元件
    copyWidget () {
      this.$vpd.commit('copy')
    },

    // 删除元件
    dele () {
      this.$vpd.commit('delete')
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.header {
  background-color: #24292e;
  padding: 12px 0;
}
.navbar {
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: $gray-color;
    margin-right: 15px;
  }
  .btn.btn-link:hover {
    color: $light-color;
  }
  .logo {
    font-size: 20px;
    .svg-icon {
      width: 30px;
      text-align: center;
      background-color: $light-color;
      border-radius: 50%;
    }
  }
}
</style>
