<template>
  <view class="container">
    <view class="content">
      <zx-title title="基础用法" type="line"></zx-title>
      <zx-uploader @after-read="afterRead" />

      <zx-title title="文件预览" type="line"></zx-title>
      <zx-uploader v-model="fileList" multiple @delete="handleDelete" />

      <zx-title title="上传状态" type="line"></zx-title>
      <zx-uploader v-model="statusFileList" :after-read="afterReadWithStatus" @delete="handleDeleteStatusFile" />

      <zx-title title="限制上传数量 (最大3个)" type="line"></zx-title>
      <zx-uploader v-model="limitCountList" multiple :max-count="3" />

      <zx-title title="限制上传大小 (最大1MB)" type="line"></zx-title>
      <zx-uploader v-model="limitSizeList" multiple :max-size="1024 * 1024" @oversize="onOversize" />

      <zx-title title="自定义上传样式" type="line"></zx-title>
      <zx-uploader>
        <zx-button icon="upload" type="primary" size="small">上传文件</zx-button>
      </zx-uploader>

      <zx-title title="自定义预览大小 (100x100)" type="line"></zx-title>
      <zx-uploader v-model="customPreviewSizeList" preview-size="100" />
      
      <zx-title title="禁用状态" type="line"></zx-title>
      <zx-uploader v-model="disabledFileList" disabled />

      <zx-title title="只读状态" type="line"></zx-title>
      <zx-uploader v-model="readonlyFileList" readonly />

      <zx-title title="图片和视频混合上传" type="line"></zx-title>
      <zx-uploader v-model="mediaList" accept="media" multiple />

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([
  { url: 'https://img01.yzcdn.cn/vant/leaf.jpeg' },
  { url: 'https://img01.yzcdn.cn/vant/tree.jpeg' },
]);

const statusFileList = ref([
  {
    url: 'https://img01.yzcdn.cn/vant/sand.jpeg',
    status: 'uploading',
    message: '上传中...',
  },
  {
    url: 'https://img01.yzcdn.cn/vant/tree.jpeg',
    status: 'failed',
    message: '上传失败',
  },
  {
    url: 'https://img01.yzcdn.cn/vant/leaf.jpeg',
    status: 'done',
  },
]);

const limitCountList = ref([]);
const limitSizeList = ref([]);
const customPreviewSizeList = ref([
    { url: 'https://img01.yzcdn.cn/vant/leaf.jpeg' },
]);
const disabledFileList = ref([
    { url: 'https://img01.yzcdn.cn/vant/leaf.jpeg' },
]);
const readonlyFileList = ref([
    { url: 'https://img01.yzcdn.cn/vant/leaf.jpeg' },
]);
const mediaList = ref([]);

const afterRead = (event) => {
  console.log('afterRead:', event);
  // uni.showToast({
  //   title: `读取文件数量: ${event.file.length || 1}`,
  //   icon: 'none'
  // });
  // event.file 可能是一个对象或数组，需要根据实际情况处理
  const files = Array.isArray(event.file) ? event.file : [event.file];
  files.forEach(f => {
    // 模拟上传
    setTimeout(() => {
        // 如果是手动维护 fileList，需要在这里更新
        // 对于 v-model 绑定的 fileList，组件内部会自动处理
    }, 1000);
  });
};

const afterReadWithStatus = (event) => {
  console.log('afterReadWithStatus:', event);
  const files = Array.isArray(event.file) ? event.file : [event.file];

  files.forEach(fileItem => {
    // 查找 statusFileList 中对应的项并更新，或者新增
    // 这里简化处理，直接操作传入的 fileItem，实际项目中可能需要更复杂的逻辑
    // 如果组件内部没有自动将新读取的文件加入 statusFileList，需要手动添加
    // 假设组件会把新读取的文件包装好后，通过 afterRead 事件传出，并且如果用了 v-model，会自动更新
    // 我们这里主要是模拟上传过程中的状态变化

    // 找到 statusFileList 中是否有这个文件（通过临时 ID 或其他唯一标识）
    // 如果是新文件，它应该已经被组件添加到 statusFileList (通过v-model)
    // 我们只需要找到它并更新状态
    const currentFileInList = statusFileList.value.find(f => f.tempFilePath === fileItem.tempFilePath || f.url === fileItem.url );
    
    if (currentFileInList) {
        currentFileInList.status = 'uploading';
        currentFileInList.message = '上传中...';

        // 模拟上传
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
            currentFileInList.status = 'done';
            currentFileInList.message = '上传成功';
            // 实际项目中，上传成功后服务器会返回一个真实的url，需要更新
            // currentFileInList.url = 'real_server_url.jpg'; 
            } else {
            currentFileInList.status = 'failed';
            currentFileInList.message = '上传失败';
            }
        }, 2000);
    } else {
        // 如果是基础用法，没有v-model，afterRead 返回的就是新文件，需要自己管理
        // 但这里我们用了 v-model="statusFileList"，所以新文件应该已经由组件添加
        // 如果没有，说明组件的 v-model + afterRead 逻辑需要调整
        // 为了演示，我们假设它已经被添加，只是没有初始状态
        // 实际上，组件在 afterRead 之前就应该把文件对象（包含tempFilePath, size等）加入到 v-model 的数组中
        // 然后 afterRead 只是一个通知事件
        // 我们这里手动添加一个新项到 statusFileList 来模拟，如果组件的v-model已经做了，这步会重复
        const newFileEntry = {
            ...fileItem, // 包含组件读取文件后赋予的属性，如 tempFilePath
            url: fileItem.tempFilePath, // 初始预览用本地路径
            status: 'uploading',
            message: '上传中...'
        };
        statusFileList.value.push(newFileEntry);
        // 模拟上传
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                newFileEntry.status = 'done';
                newFileEntry.message = '上传成功';
            } else {
                newFileEntry.status = 'failed';
                newFileEntry.message = '上传失败';
            }
        }, 2000);
    }
  });
};

const handleDelete = (event) => {
  console.log('delete:', event);
  // fileList.value.splice(event.index, 1); // v-model 会自动处理
  uni.showToast({
    title: `删除了文件: ${event.file.url}`,
    icon: 'none'
  });
};

const handleDeleteStatusFile = (event) => {
  console.log('delete status file:', event);
  // statusFileList.value.splice(event.index, 1); // v-model 会自动处理
   uni.showToast({
    title: `删除了文件: ${event.file.url}`,
    icon: 'none'
  });
}

const onOversize = (event) => {
  console.log('oversize:', event);
  uni.showToast({
    title: '文件大小超过限制',
    icon: 'none',
  });
};

</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.content {
  padding: 20rpx;
}

// 确保 zx-title 下方的 zx-uploader 有上边距
::v-deep .zx-title + .zx-uploader,
::v-deep .zx-uploader + .zx-title {
  margin-top: 20rpx;
}

// 如果zx-uploader内部没有处理好间距，可以在这里调整
::v-deep .zx-uploader {
    // margin-bottom: 20rpx; // 根据需要添加
}
</style>