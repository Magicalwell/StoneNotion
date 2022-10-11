<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      :before-upload="uploadSync"
      action="http://127.0.0.1"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">上传图片</div>
        <small>请勿上传大小超过5M的图片</small>
      </div>
    </a-upload>
    <a-modal
      :visible="previewVisible"
      :title="previewTitle"
      @cancel="handleCancel"
      width="1000px"
    >
      <template #footer>
        <a-button key="back" @click="editVisible = true" v-if="!btnStatus"
          >编辑</a-button
        >
        <a-button key="save" @click="saveImg" v-else>保存</a-button>
        <a-button key="submit" type="primary" @click="addImg"
          >添加到画布</a-button
        >
      </template>

      <div style="max-width: 500px; margin: 0 auto">
        <!-- <PictureEdit :imgData="previewImage" /> -->
        <img style="width: 100%" :src="previewImage" />
      </div>
    </a-modal>
    <a-modal
      :visible="editVisible"
      :title="previewTitle + '支持改名'"
      @cancel="editVisible = false"
      width="100%"
      wrapClassName="picture-edit"
      :destroyOnClose="true"
    >
      <template #footer>
        <a-button key="save" @click="saveChange">保存</a-button>
      </template>

      <PictureEdit :imgData="previewImage" ref="modalEdit" />
      <!-- <img style="width: 100%" :src="previewImage" /> -->
    </a-modal>
  </div>
</template>
<script lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import type { UploadProps } from 'ant-design-vue'
import PictureEdit from '../pictureEdit/edit.vue'
function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default defineComponent({
  components: {
    PlusOutlined,
    PictureEdit
  },
  setup() {
    const store = useStore()
    const previewVisible = ref(false)
    const editVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')
    const btnStatus = ref(false)
    const modalEdit = ref()
    const fileList = ref<UploadProps['fileList']>([
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ])

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
      store.commit('plannerVuex/resetImgFlag')
    }
    const uploadSync: UploadProps['beforeUpload'] = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result as string)
        }
      })
    }
    const handlePreview = async (file) => {
      // 因为目前没有后台接口，暂时使用本地存储，等后续构建一个图床应用
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
        await store.commit('plannerVuex/changeImgFlag', file.preview)
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }
    const addImg = () => {
      store.commit('plannerVuex/changeImgFlag')
    }
    const editImg = () => {
      btnStatus.value = true
    }
    const saveChange = () => {
      // modalEdit.value.savePicture()
      const dataURL = modalEdit.value.inputCvs.toDataURL('image/png')
      console.log(fileList.value)
      previewImage.value = dataURL
      store.commit('plannerVuex/changeImgFlag', dataURL)
      store.commit('plannerVuex/changeImgFlag')
      editVisible.value = false
    }
    return {
      previewVisible,
      previewImage,
      editVisible,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle,
      uploadSync,
      addImg,
      editImg,
      btnStatus,
      modalEdit,
      saveChange
    }
  }
})
</script>
<style lang="scss">
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.picture-edit {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    height: 100vh;
  }
  .ant-modal-body {
    height: calc(100% - 108px);
  }
}
</style>
