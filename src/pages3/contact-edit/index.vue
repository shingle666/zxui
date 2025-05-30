<template>
  <view class="container">
    <view class="content">
      <zx-title type="line" title="基础用法"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">添加联系人</text>
          <zx-contact-edit @save="onSave" />
        </view>
      </view>

      <zx-title type="line" title="编辑联系人"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">编辑模式</text>
          <zx-contact-edit 
            :is-edit="true"
            :contact-info="editContact"
            @save="onEditSave"
            @delete="onDelete"
          />
        </view>
      </view>

      <zx-title type="line" title="显示默认联系人开关"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">带默认联系人开关</text>
          <zx-contact-edit 
            :show-set-default="true"
            set-default-label="设为默认联系人"
            :contact-info="defaultContact"
            @save="onDefaultSave"
            @change-default="onChangeDefault"
          />
        </view>
      </view>

      <zx-title type="line" title="加载状态"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">保存加载状态</text>
          <zx-contact-edit 
            :is-saving="saving"
            :contact-info="loadingContact"
            @save="onSavingTest"
          />
        </view>
        
        <view class="demo-item">
          <text class="demo-label">删除加载状态</text>
          <zx-contact-edit 
            :is-edit="true"
            :is-deleting="deleting"
            :contact-info="deletingContact"
            @save="onSave"
            @delete="onDeletingTest"
          />
        </view>
      </view>

      <zx-title type="line" title="自定义验证"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">支持座机号码</text>
          <zx-contact-edit 
            :tel-validator="customTelValidator"
            tel-placeholder="请输入手机号或座机号"
            @save="onCustomSave"
          />
        </view>
      </view>

      <zx-title type="line" title="禁用状态"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">禁用表单</text>
          <zx-contact-edit 
            :disabled="true"
            :contact-info="disabledContact"
            @save="onSave"
          />
        </view>
      </view>

      <zx-title type="line" title="自定义文案"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">自定义按钮文案</text>
          <zx-contact-edit 
            :is-edit="true"
            save-text="确认保存"
            delete-text="确认删除"
            name-placeholder="请填写真实姓名"
            tel-placeholder="请填写常用手机号"
            :contact-info="customTextContact"
            @save="onSave"
            @delete="onDelete"
          />
        </view>
      </view>

      <zx-title type="line" title="隐藏必填星号"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">隐藏星号</text>
          <zx-contact-edit 
            :hide-required-asterisk="true"
            @save="onSave"
          />
        </view>
      </view>

      <zx-title type="line" title="不显示清除按钮"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">禁用清除功能</text>
          <zx-contact-edit 
            :clearable="false"
            :contact-info="noClearContact"
            @save="onSave"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 编辑联系人数据
const editContact = reactive({
  name: '张三',
  tel: '13800138000',
  isDefault: false
})

// 默认联系人数据
const defaultContact = reactive({
  name: '李四',
  tel: '13900139000',
  isDefault: true
})

// 加载状态测试数据
const loadingContact = reactive({
  name: '王五',
  tel: '13700137000',
  isDefault: false
})

const deletingContact = reactive({
  name: '赵六',
  tel: '13600136000',
  isDefault: false
})

// 禁用状态数据
const disabledContact = reactive({
  name: '钱七',
  tel: '13500135000',
  isDefault: false
})

// 自定义文案数据
const customTextContact = reactive({
  name: '孙八',
  tel: '13400134000',
  isDefault: false
})

// 无清除按钮数据
const noClearContact = reactive({
  name: '周九',
  tel: '13300133000',
  isDefault: false
})

// 加载状态
const saving = ref(false)
const deleting = ref(false)

// 自定义手机号验证函数
function customTelValidator(tel) {
  // 支持手机号和座机号
  const mobileReg = /^1[3-9]\d{9}$/
  const phoneReg = /^0\d{2,3}-?\d{7,8}$/
  return mobileReg.test(tel) || phoneReg.test(tel)
}

// 基础保存
function onSave(contactInfo) {
  console.log('保存联系人:', contactInfo)
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
}

// 编辑保存
function onEditSave(contactInfo) {
  console.log('编辑保存:', contactInfo)
  // 更新数据
  Object.assign(editContact, contactInfo)
  uni.showToast({
    title: '编辑成功',
    icon: 'success'
  })
}

// 默认联系人保存
function onDefaultSave(contactInfo) {
  console.log('默认联系人保存:', contactInfo)
  Object.assign(defaultContact, contactInfo)
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
}

// 自定义验证保存
function onCustomSave(contactInfo) {
  console.log('自定义验证保存:', contactInfo)
  uni.showToast({
    title: '验证通过，保存成功',
    icon: 'success'
  })
}

// 删除联系人
function onDelete(contactInfo) {
  console.log('删除联系人:', contactInfo)
  uni.showModal({
    title: '确认删除',
    content: `确定要删除联系人"${contactInfo.name}"吗？`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

// 默认联系人状态改变
function onChangeDefault(isDefault) {
  console.log('默认联系人状态:', isDefault)
  uni.showToast({
    title: isDefault ? '已设为默认' : '已取消默认',
    icon: 'none'
  })
}

// 保存加载测试
async function onSavingTest(contactInfo) {
  console.log('保存加载测试:', contactInfo)
  saving.value = true
  
  try {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    Object.assign(loadingContact, contactInfo)
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '保存失败',
      icon: 'error'
    })
  } finally {
    saving.value = false
  }
}

// 删除加载测试
async function onDeletingTest(contactInfo) {
  console.log('删除加载测试:', contactInfo)
  
  const res = await new Promise(resolve => {
    uni.showModal({
      title: '确认删除',
      content: `确定要删除联系人"${contactInfo.name}"吗？`,
      success: resolve
    })
  })
  
  if (!res.confirm) return
  
  deleting.value = true
  
  try {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    uni.showToast({
      title: '删除成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '删除失败',
      icon: 'error'
    })
  } finally {
    deleting.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.demo-section {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 32rpx;
  overflow: hidden;
}

.demo-item {
  padding: 32rpx;
  border-bottom: 1rpx solid #ebedf0;
  
  &:last-child {
    border-bottom: none;
  }
}

.demo-label {
  display: block;
  font-size: 28rpx;
  color: #323233;
  margin-bottom: 24rpx;
  font-weight: 500;
}
</style>