# **资料**

https://www.bilibili.com/video/BV1iL4y1w7aK?spm_id_from=333.337.search-card.all.click&vd_source=d1ac70f1674f7ecb7da7467370328aa0

# **最新接口地址**



\1. 项目的 API 接口地址： https://www.showdoc.cc/escook?page_id=3707158761215217

\2. ==URL使用最新的地址==：http://big-event-api-t.itheima.net

# input获取图片转base64

框架element-ui

~~~vue
 onFileChange (e) {
      // 获取用户选择的文件列表（伪数组）
      const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.avatar = ''
      } else {
        // 选择了图片
        // 转base64
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (e) => {
          // console.log(e.target.result)
          this.avatar = e.target.result
        }
      }
    },
~~~

# input获取图片转bolb

后端让传bolb时候最好让他换个格式

input获取图片转bolb

input->base64->bolb

~~~js
onFileChange (e) {
const files = e.target.files
      if (files.length === 0) {
        // 没有选择图片
        this.imgsrc = null
        this.$emit('deliverImg', this.imgPre)//传给父组件
      } else {
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = (e) => {
          this.imgPre = e.target.result // 图片预览
          // 转成bolb需要先转base64
          const arr = e.target.result.split(',')
          // 获取base64字符串数组
          const fileType = arr[0].match(/:(.*?);/)[1]
          // 获取图片格式
          const bstr = arr[1]
          let l = bstr.length
          const u8Arr = new Uint8Array(l)
          // Uint8Array 数组类型表示一个 8 位无符号整型数组
          while (l--) {
            u8Arr[l] = bstr.charCodeAt(l)
            // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
          }
          const imgPic = new Blob([u8Arr], {
            type: fileType
          })
          this.$emit('deliverImg', imgPic) //传给父组件
        }
      }
    },

~~~

# 究极折磨流获取图片

当从后台获取到一个图片文件能下载但是不能放不到<img src="">src里面，或者放里面报错无法显示，可以尝试将接收到的数据作为url再向baseurl发送一个get请求

~~~js
// 设置接口这一步思路很重要
export const getArticlePictureAPI = (url) => {
  return request({
    url: url,
    method: 'GET'
  })
}
//调用接口
try {
        // console.log(typeof this.imgFormEdit === 'string')
        const { data: img } = await getArticlePictureAPI(this.imgFormEdit)
        //我发现请求回来的是base64所以就把他拼接完整然后在下个函数换成bolb
        this.imgPre = 'data:image/png;base64,' + img
        this.editImgbase64ToBolb(this.imgPre)
      } catch (error) {
        // console.log(error)
      }
//我这个是通过上述方法回去的是base64，我又要通过bolb传给后台所以又得执行一次格式转换
editImgbase64ToBolb (e) {
      const arr = e.split(',')
      const fileType = arr[0].match(/:(.*?);/)[1]
      // 获取图片格式
      const bstr = arr[1]
      let l = bstr.length
      const u8Arr = new Uint8Array(l)
      // Uint8Array 数组类型表示一个 8 位无符号整型数组
      while (l--) {
        u8Arr[l] = bstr.charCodeAt(l)
        // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
      }
      const imgPic = new Blob([u8Arr], {
        type: fileType
      })
      this.$emit('deliverImg', imgPic)
    },
~~~

发一个链接看看图片是不是base64

[Base64到图像解码（jpg，png，gif） (rapidtables.org)](https://www.rapidtables.org/zh-CN/web/tools/base64-to-image.html)

