<template>
  <div>
    <quill-editor
    v-model="content"
    ref="myQuillEditor"
    class="editor"
    :options="editorOption"
    @change="onEditorChange($event)"
    @blur="onEditorBlur($event)"
    ></quill-editor>
    <!-- @focus="onEditorFocus($event)"
    @change="onEditorChange($event)" -->
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  props: {
    contentFormEdit: {
      type: String,
      default: ''
    }
  },
  components: {
    quillEditor
  },
  data () {
    const toolbarOptions = [
      // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
      ['bold', 'italic', 'underline', 'strike'],
      // 引用  代码块-----['blockquote', 'code-block']
      ['blockquote', 'code-block'],
      // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
      [{ header: 1 }, { header: 2 }],
      // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
      [{ list: 'ordered' }, { list: 'bullet' }],
      // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
      [{ script: 'sub' }, { script: 'super' }],
      // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
      [{ indent: '-1' }, { indent: '+1' }],
      // 文本方向-----[{'direction': 'rtl'}]
      [{ direction: 'rtl' }],
      // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
      [{ size: ['small', false, 'large', 'huge'] }],
      // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
      [{ color: [] }, { background: [] }],
      // 字体种类-----[{ font: [] }]
      [{ font: [] }],
      // 对齐方式-----[{ align: [] }]
      [{ align: [] }],
      // 清除文本格式-----['clean']
      ['clean']
      // 链接、图片、视频-----['link', 'image', 'video']
    ]
    return {
      contentTxt: '',
      content: '', // 富文本显示内容
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: '请输入正文'
        // Some Quill optiosn...
      }
    }
  },
  methods: {
    // onEditorReady (editor) { // 准备编辑器

    // },

    onEditorBlur (e) {
      console.log(this.content)
      // this.contentTxt = this.content
      // console.log(this.contentTxt, typeof this.contentTxt)
      // if (this.contentTxt.trim() === '') {
      //   this.$emit('delivercontentTxt', '')
      //   // console.log(this.contentTxt)
      // } else {
      //   this.$emit('delivercontentTxt', this.contentTxt)
      // }
    },
    // 获得焦点事件
    // onEditorFocus (e) {
    //   console.log('onEditorFocus: ', e.html)
    // },
    // 内容改变事件
    onEditorChange (e) {
      // console.log('onEditorChange: ', e, e.text) 文本内容在文本框改变时能获取
      this.contentTxt = e.html // 标签以<p></p> 形式渲染 （重点）
      // console.log(this.contentTxt)
      // this.contentTxt = e.text.substring(0, 100)
      if (this.contentTxt.trim() === '') {
        this.$emit('delivercontentTxt', '')
        // console.log(this.contentTxt)
      } else {
        this.$emit('delivercontentTxt', this.contentTxt)
      }
      // this.$nextTick(() => {
      //   this.$emit('delivercontentTxt', this.contentTxt)
      // })
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    console.log(this.contentFormEdit)
    this.content = this.contentFormEdit
  }

}
</script>

<style scoped >
.editor {
  height: 200px;
  margin-bottom:  100px;
}
</style>
