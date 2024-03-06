<template>
  <div>

    <img src="" alt="" v-for="(item,index) in fileList" :key="index" :src="item.src">
    <el-button @click="export_txt_to_zip(fileList)">点击压缩</el-button>
  </div>

</template>

<script>
import QRCode from 'qrcode'
import {export_txt_to_zip} from "@/util";
const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}
export default {
  data() {
    return {
      fileList:[
        {
          url:'111',
          name:'001',
          src:''
        },
          {
          url:'222',
          name:'002',
            src:''
        },
          {
          url:'333',
          name:'003',
            src:''
        }
      ],
    }
  },
  mounted() {
    this.code()
  },
  created() {

  },
  methods:{
    export_txt_to_zip,
    code(){
      let  promise = []
      this.fileList.forEach(e => {
        promise.push(generateQR(e.url))
      })
      Promise.all(promise).then(res => {
        console.log(res)
        this.fileList.forEach((e,i) => {
          e.src = res[i]
        })
        console.log(this.fileList)
      })
    }
  }
}
</script>
<style>
  img{
    width: 200px;
    height: 200px;
  }
</style>
