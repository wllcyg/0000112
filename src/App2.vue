<template>
  <div>
    <div class="update">
      <el-upload
          class="upload-demo"
          drag
          action=""
          :file-list="fileList"
          :on-change="handleChange"
          :auto-upload="false"
          :before-upload="beforeUpload"
          >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button @click="toWorld">生成文件</el-button>
    </div>

  </div>

</template>

<script>
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      fileList:[],
      files:''
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.getData);
  },
  created() {

  },
  methods:{
    handleChange(file, fileList) {
      this.files = file.raw
    },
    toWorld(){
      this.readFileContent(this.files).then(content => {
        console.log(XLSX,'2222')
        const workbook = XLSX.read(content, { type: 'binary' });
        console.log(workbook,'1111')
        const sheetName = workbook.SheetNames[0]; // 获取第一个工作表的名字
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet); // 将工作表转换为JSON对象数组
        console.log(data);
        // 在此处使用转换后的JSON数据进行后续处理
      });
    },
    beforeUpload(file){
      console.log(file)
    },
    async readFileContent(file) {
      console.log(file,'filefilefilefile')
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve(e.target.result);
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.readAsArrayBuffer(file); // 对于Excel文件，需要读取为ArrayBuffer格式
      });
    },
  }
}
</script>
<style>
.update{
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    height: 40px;
    margin-left: 30px;
  }
}
</style>
