<template>
  <view>
    <view v-if="show">
      <view class="list" v-for="item in list" :key="item._id">
        <view class="item" @click="update(item)">
          <view class="item-left">
            <view>likeNumber:{{ item.likeNumber }}</view>
            <view>picName:{{ item.picName }}</view>
            <view>username:{{ item.username }}</view>
          </view>
          <view class="item-right">
            <image
							:src="item.fileUrl"
              mode="aspectFill"
            />
          </view>
        </view>
        <view class="after" @click="deleteData(item)"></view>
      </view>
    </view>
    <view v-else>
      <uni-load-more status="loading"></uni-load-more>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      show: false,
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    getData() {
      uniCloud
        .callFunction({
          name: 'getFromData',
        })
        .then((res) => {
          this.list = res.result.data
          this.show = true
        })
    },
    update(item) {
      uni.navigateTo({
        url: '/subpkg/detail/detail?id=' + item._id,
      })
    },
    deleteData(item) {
      uni.showModal({
        title: '确认删除吗？',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if (confirm) {
            uniCloud
              .callFunction({
                name: 'removeData',
                data: { id: item._id },
              })
              .then((res) => {
                this.getData()
              })
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .item {
    position: relative;
    display: flex;
    background-color: #ccc;
		height: 400rpx;
    .item-left {
      flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-content: center;
    }
    .item-right {
			flex: 1;
			image{
				width: 100%;
				height: 100%;
			}
    }
  }
  .after {
    height: 50rpx;
    width: 100%;
    background-color: red;
  }
}
</style>
