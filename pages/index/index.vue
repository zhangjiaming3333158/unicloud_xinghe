<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <view>
      <form @submit="onSubmit" @reset="formReset">
        <view>
          <uni-file-picker
            ref="files"
            v-model="imageValue"
            fileMediatype="image"
            mode="grid"
            :limit="1"
            @select="select"
            @progress="progress"
            @success="success"
            @fail="fail"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">picName</view>
          <input
            class="uni-input"
            name="picName"
            placeholder="这是一个输入框"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">username</view>
          <input
            class="uni-input"
            name="username"
            placeholder="这是一个输入框"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">likeNumber</view>
          <slider type="number" value="1" name="likeNumber" show-value></slider>
        </view>
        <view class="uni-btn-v">
          <button form-type="submit">Submit</button>
          <button type="default" form-type="reset">Reset</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageValue: [],
      fileUrl: '',
    }
  },
  onLoad() {},
  methods: {
    onSubmit(e) {
      console.log(e.detail.value)
      uniCloud
        .callFunction({
          name: 'addToData',
          data: { fileUrl: this.fileUrl, list: e.detail.value },
        })
        .then((res) => {
          console.log(res.result)
        })
    },
    formReset: function (e) {
      console.log('清空数据')
    },
    // 获取上传状态
    select(e) {
      console.log('选择文件：', e)
    },
    // 获取上传进度
    progress(e) {
      console.log('上传进度：', e)
    },

    // 上传成功
    success(e) {
      console.log('上传成功', e)
      this.fileUrl = e.tempFilePaths[0]
      console.log(this.fileUrl)
    },

    // 上传失败
    fail(e) {
      console.log('上传失败：', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.uni-form-item .title {
  padding: 20rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .uni-input {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
