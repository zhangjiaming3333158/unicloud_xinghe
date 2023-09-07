<!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
<template>
  <view>
    <view>
      <form @submit="onSubmit" @reset="formReset">
        <view class="uni-form-item uni-column">
          <view class="title">picName</view>
          <input
            :value="item[0].picName"
            class="uni-input"
            name="picName"
            placeholder="这是一个输入框"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">username</view>
          <input
            :value="item[0].username"
            class="uni-input"
            name="username"
            placeholder="这是一个输入框"
          />
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">likeNumber</view>
          <slider
            type="number"
            :value="item[0].likeNumber"
            name="likeNumber"
            show-value
          ></slider>
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
      id: '',
      item: [],
    }
  },
  onLoad(options) {
    this.id = options.id
    this.getDocData()
  },
  methods: {
    onSubmit(e) {
      uniCloud
        .callFunction({
          name: 'updateData',
          data: { id: this.id, list: e.detail.value },
        })
        .then((res) => {
          console.log(res.result)
        })
    },
    getDocData() {
      uniCloud
        .callFunction({
          name: 'getDocData',
          data: { id: this.id },
        })
        .then((res) => {
          this.item = res.result.data
        })
    },
    formReset: function (e) {
      console.log('清空数据')
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
