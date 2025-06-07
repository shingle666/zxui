<template>
  <view class="zx-goods-comment">
    <!-- 评论列表 -->
    <view v-if="commentList.length > 0" class="zx-goods-comment__list">
      <view v-for="(comment, index) in commentList" :key="comment.id || index" class="zx-goods-comment__item" :class="{
        'zx-goods-comment__item--border': showBorder
      }">
        <!-- 用户信息 -->
        <view class="zx-goods-comment__user">
          <view class="zx-goods-comment__avatar">
            <image :src="comment.avatar || defaultAvatar" class="zx-goods-comment__avatar-img" :mode="avatarMode"
              :lazy-load="lazyLoad" />
          </view>
          <view class="zx-goods-comment__user-info">
            <text class="zx-goods-comment__username" :style="{
              'font-size': usernameSize + 'rpx',
              color: usernameColor
            }">
              {{ comment.username || '匿名用户' }}
            </text>
            <view class="zx-goods-comment__meta">
              <!-- 评分 -->
              <view v-if="showRating && comment.rating" class="zx-goods-comment__rating">
                <text v-for="star in 5" :key="star" class="zx-goods-comment__star" :class="{
                  'zx-goods-comment__star--active': star <= comment.rating
                }">
                  ★
                </text>
              </view>
              <!-- 时间 -->
              <text class="zx-goods-comment__time" :style="{
                'font-size': timeSize + 'rpx',
                color: timeColor
              }">
                {{ formatTime(comment.createTime) }}
              </text>
            </view>
          </view>
          <!-- 操作按钮 -->
          <view v-if="showActions" class="zx-goods-comment__actions">
            <view class="zx-goods-comment__action" @click="handleReply(comment, index)">
              <text class="zx-goods-comment__action-text">回复</text>
            </view>
            <view class="zx-goods-comment__action" @click="handleLike(comment, index)">
              <text class="zx-goods-comment__action-text" :class="{
                'zx-goods-comment__action-text--active': comment.isLiked
              }">
                {{ comment.isLiked ? '已赞' : '点赞' }}
              </text>
              <text v-if="comment.likeCount > 0" class="zx-goods-comment__like-count">
                ({{ comment.likeCount }})
              </text>
            </view>
          </view>
        </view>

        <!-- 评论内容 -->
        <view class="zx-goods-comment__content">
          <text class="zx-goods-comment__text" :style="{
            'font-size': contentSize + 'rpx',
            color: contentColor,
            'line-height': lineHeight
          }">
            {{ comment.content }}
          </text>

          <!-- 评论图片 -->
          <view v-if="comment.images && comment.images.length > 0" class="zx-goods-comment__images">
            <image v-for="(img, imgIndex) in comment.images.slice(0, maxImages)" :key="imgIndex" :src="img"
              class="zx-goods-comment__image" :mode="imageMode" :lazy-load="lazyLoad"
              @click="previewImage(comment.images, imgIndex)" />
            <view v-if="comment.images.length > maxImages" class="zx-goods-comment__image-more"
              @click="previewImage(comment.images, maxImages)">
              <text class="zx-goods-comment__image-more-text">
                +{{ comment.images.length - maxImages }}
              </text>
            </view>
          </view>
        </view>

        <!-- 回复列表 -->
        <view v-if="comment.replies && comment.replies.length > 0" class="zx-goods-comment__replies">
          <view v-for="(reply, replyIndex) in comment.replies.slice(0, maxReplies)" :key="reply.id || replyIndex"
            class="zx-goods-comment__reply">
            <text class="zx-goods-comment__reply-user">{{ reply.username }}：</text>
            <text class="zx-goods-comment__reply-content">{{ reply.content }}</text>
          </view>
          <view v-if="comment.replies.length > maxReplies" class="zx-goods-comment__more-replies"
            @click="showMoreReplies(comment, index)">
            <text class="zx-goods-comment__more-text">
              查看更多回复 ({{ comment.replies.length - maxReplies }})
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="zx-goods-comment__empty">
      <view class="zx-goods-comment__empty-icon">💬</view>
      <text class="zx-goods-comment__empty-text">{{ emptyText }}</text>
    </view>

    <!-- 加载更多 -->
    <view v-if="showLoadMore && commentList.length > 0" class="zx-goods-comment__load-more" @click="handleLoadMore">
      <text class="zx-goods-comment__load-more-text">{{ loadMoreText }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * GoodsComment 商品评论组件
 * @description 用于展示商品评论列表，支持评分、图片、回复等功能
 * @tutorial
 * @property {Array} commentList 评论列表数据
 * @property {String} defaultAvatar 默认头像
 * @property {String} avatarMode 头像裁剪模式
 * @property {Boolean} showBorder 是否显示边框
 * @property {Boolean} showRating 是否显示评分
 * @property {Boolean} showActions 是否显示操作按钮
 * @property {Boolean} lazyLoad 图片是否懒加载
 * @property {String} usernameColor 用户名颜色
 * @property {String} timeColor 时间颜色
 * @property {String} contentColor 内容颜色
 * @property {Number/String} usernameSize 用户名字体大小
 * @property {Number/String} timeSize 时间字体大小
 * @property {Number/String} contentSize 内容字体大小
 * @property {String} lineHeight 行高
 * @property {String} imageMode 图片裁剪模式
 * @property {Number} maxImages 最大显示图片数量
 * @property {Number} maxReplies 最大显示回复数量
 * @property {String} emptyText 空状态文本
 * @property {Boolean} showLoadMore 是否显示加载更多
 * @property {String} loadMoreText 加载更多文本
 * @event {Function} reply 点击回复触发
 * @event {Function} like 点击点赞触发
 * @event {Function} imagePreview 点击图片预览触发
 * @event {Function} moreReplies 点击查看更多回复触发
 * @event {Function} loadMore 点击加载更多触发
 */

// 定义事件
const emit = defineEmits([
  'reply',
  'like',
  'imagePreview',
  'moreReplies',
  'loadMore'
])

// 定义 props
const props = defineProps({
  commentList: {
    type: Array,
    default: () => []
  },
  defaultAvatar: {
    type: String,
    default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGNUY1RjUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMzAgMzJDMzAgMjYuNDc3MSAyNS41MjI5IDIyIDIwIDIyQzE0LjQ3NzEgMjIgMTAgMjYuNDc3MSAxMCAzMkgzMFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPC9zdmc+'
  },
  avatarMode: {
    type: String,
    default: 'aspectFill'
  },
  showBorder: {
    type: Boolean,
    default: true
  },
  showRating: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  lazyLoad: {
    type: Boolean,
    default: true
  },
  usernameColor: {
    type: String,
    default: '#333333'
  },
  timeColor: {
    type: String,
    default: '#999999'
  },
  contentColor: {
    type: String,
    default: '#666666'
  },
  usernameSize: {
    type: [Number, String],
    default: 28
  },
  timeSize: {
    type: [Number, String],
    default: 24
  },
  contentSize: {
    type: [Number, String],
    default: 28
  },
  lineHeight: {
    type: String,
    default: '1.5'
  },
  imageMode: {
    type: String,
    default: 'aspectFill'
  },
  maxImages: {
    type: Number,
    default: 3
  },
  maxReplies: {
    type: Number,
    default: 2
  },
  emptyText: {
    type: String,
    default: '暂无评论'
  },
  showLoadMore: {
    type: Boolean,
    default: false
  },
  loadMoreText: {
    type: String,
    default: '加载更多评论'
  }
})

// 格式化时间
const formatTime = (time) => {
  if (!time) return ''

  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return Math.floor(diff / minute) + '分钟前'
  } else if (diff < day) {
    return Math.floor(diff / hour) + '小时前'
  } else if (diff < month) {
    return Math.floor(diff / day) + '天前'
  } else if (diff < year) {
    return Math.floor(diff / month) + '个月前'
  } else {
    return Math.floor(diff / year) + '年前'
  }
}

// 处理回复
const handleReply = (comment, index) => {
  emit('reply', { comment, index })
}

// 处理点赞
const handleLike = (comment, index) => {
  emit('like', { comment, index })
}

// 预览图片
const previewImage = (images, index) => {
  // #ifdef H5
  // H5环境下可以使用自定义预览
  emit('imagePreview', { images, index })
  // #endif

  // #ifndef H5
  // 小程序和APP使用原生预览
  uni.previewImage({
    urls: images,
    current: index
  })
  // #endif
}

// 查看更多回复
const showMoreReplies = (comment, index) => {
  emit('moreReplies', { comment, index })
}

// 加载更多
const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style lang="scss">
$zx-primary: #2979ff !default;
$zx-border-color: #ebeef5 !default;
$zx-text-color: #333333 !default;
$zx-text-color-secondary: #666666 !default;
$zx-text-color-placeholder: #999999 !default;
$zx-bg-color: #f8f9fa !default;
$zx-spacing-xs: 8rpx !default;
$zx-spacing-sm: 16rpx !default;
$zx-spacing-md: 24rpx !default;
$zx-spacing-lg: 32rpx !default;

.zx-goods-comment {
  width: 100%;

  &__list {
    width: 100%;
  }

  &__item {
    padding: $zx-spacing-md $zx-spacing-sm;
    background-color: #ffffff;

    &--border {
      border-bottom: 1px solid $zx-border-color;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__user {
    display: flex;
    align-items: flex-start;
    margin-bottom: $zx-spacing-sm;
  }

  &__avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-right: $zx-spacing-sm;
    flex-shrink: 0;

    &-img {
      width: 100%;
      height: 100%;
    }
  }

  &__user-info {
    flex: 1;
    min-width: 0;
  }

  &__username {
    font-weight: 500;
    margin-bottom: $zx-spacing-xs;
  }

  &__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $zx-spacing-sm;
  }

  &__rating {
    display: flex;
    align-items: center;
  }

  &__star {
    font-size: 24rpx;
    color: #ddd;

    &--active {
      color: #ffb400;
    }
  }

  &__time {
    color: $zx-text-color-placeholder;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $zx-spacing-sm;
    flex-shrink: 0;
  }

  &__action {
    display: flex;
    align-items: center;
    padding: $zx-spacing-xs;

    &-text {
      font-size: 24rpx;
      color: $zx-text-color-placeholder;

      &--active {
        color: $zx-primary;
      }
    }
  }

  &__like-count {
    font-size: 20rpx;
    color: $zx-text-color-placeholder;
    margin-left: 4rpx;
  }

  &__content {
    margin-left: 96rpx;
  }

  &__text {
    line-height: 1.5;
    word-break: break-all;
  }

  &__images {
    display: flex;
    flex-wrap: wrap;
    gap: $zx-spacing-xs;
    margin-top: $zx-spacing-sm;
  }

  &__image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    overflow: hidden;
  }

  &__image-more {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;

    &-text {
      color: #ffffff;
      font-size: 24rpx;
    }
  }

  &__replies {
    margin-top: $zx-spacing-sm;
    margin-left: 96rpx;
    padding: $zx-spacing-sm;
    background-color: $zx-bg-color;
    border-radius: 8rpx;
  }

  &__reply {
    margin-bottom: $zx-spacing-xs;

    &:last-child {
      margin-bottom: 0;
    }

    &-user {
      color: $zx-primary;
      font-size: 24rpx;
    }

    &-content {
      color: $zx-text-color-secondary;
      font-size: 24rpx;
    }
  }

  &__more-replies {
    margin-top: $zx-spacing-xs;

    .zx-goods-comment__more-text {
      color: $zx-primary;
      font-size: 24rpx;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 120rpx $zx-spacing-md;

    &-icon {
      font-size: 80rpx;
      margin-bottom: $zx-spacing-md;
      opacity: 0.3;
    }

    &-text {
      color: $zx-text-color-placeholder;
      font-size: 28rpx;
    }
  }

  &__load-more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $zx-spacing-md;
    background-color: #ffffff;
    border-top: 1px solid $zx-border-color;

    &-text {
      color: $zx-primary;
      font-size: 28rpx;
    }
  }
}
</style>