<template>
  <div>
    <div v-for="item in tabls" :key="item.key">
      <el-table
          :ref="item.key"
          :data="item.value"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
          <template slot-scope="scope">
            {{getPage(scope.row.address)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tabls:[
        {
          key:1,
          value:[]
        },
        {
          key:2,
          value:[]
        }
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.getData);
  },
  created() {
    console.log('created');
    setTimeout(() => {
      this.tabls[0].value = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
      this.tabls[1].value = [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]

    }, 1000)
  },
  methods:{
    getData(e){
      if (document.hidden) {
        console.log('页面变为隐藏状态');
      } else {
        this.tabls[0].value[0].address = '张三'
        // this.$set(this.tabls[0].value[0], 'address', '张三')
        console.log('页面变为可见状态');
      }
    },
    getPage(val){
      if (val === '张三'){
        return '李四'
      }
      return val
    }
  }
}
</script>
