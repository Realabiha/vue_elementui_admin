<template>
    <el-upload
        class="upload-demo"
        :show-file-list="false"
        action=""
        multiple
        :limit="3"
        :file-list="fileList"
        :on-change="onFileChange"
        :http-request="httpRequest"
    >
    <el-button type="primary">点击上传</el-button>
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
</template>
<script>
  export default {
    name: 'Uploader',
    data() {
      return {
        fileList: [],
        fd: new FormData()
      };
    },
    methods: {
        onFileChange(_, fileList){
            this.fileList = fileList
        },
        httpRequest({file}){
            this.fd.append('files', file)
            console.log(this.fd.getAll('files'))
        }
    }
  }
</script>