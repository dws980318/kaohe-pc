<template>
  <!-- 考核期 -->
  <div class="staff pages">
    <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
    <button v-else class="staff-btn" @click="addAction">add</button>
    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" placeholder="考核期名称" class="staff-inp" v-model="name">
    </div>
    <div v-else class="staff-inline">
      <input type="text" placeholder="name" class="staff-inp" v-model="englishName">
    </div>
    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">搜索</button>
    <button v-else class="staff-btn" @click="eachAction">search</button>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="DurationList"
      border
      style="width: 100%"
       v-if="$store.state.home.open"
    >
      <el-table-column prop="title" label="考核期名称" width="400"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="280"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="280"></el-table-column>
      <el-table-column prop="status" label="状态" width="200">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" class="el-btn" @click="redactAction(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="DurationList"
      border
      style="width: 100%"
       v-else
    >
      <el-table-column prop="englishTitle" label="name" width="400"></el-table-column>
      <el-table-column prop="startTime" label="start time" width="280"></el-table-column>
      <el-table-column prop="endTime" label="end time " width="280"></el-table-column>
      <el-table-column prop="status" label="status" width="200">
         <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="operation" width="auto">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" class="el-btn" @click="redactAction(scope.$index)">edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      max-height="30px"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="this.total"
    ></el-pagination>
  </div>
</template>

<script>
import De from "../BUS/De";
import request from "../../ajax/request";

export default {
  data() {
    return {
      name: "",
      DurationList: [],
      pageSize: 18,
      currentPage: 1,
      total: 0,
      englishName: ''
    };
  },
  created() {
    this.eachAction();
  },
  watch: {
    currentPage: function(val, newVal) {
      this.currentPage = val;
      this.eachAction();
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    addAction() {
      this.$router.push({ path: "./addAssessment" });
    },
    redactAction(index) {
      this.$router.push({
        name: "redactAssessment",
        params: this.DurationList[index]
      });
    },
    eachAction() {
      var data = new URLSearchParams();
      data.append("name", this.name);
      data.append("englishName", this.englishName);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaAssessDuration/list", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            departmentid: item.departmentid,
            englishTitle: item.englishTitle,
            endTime: item.endTime,
            startTime: item.startTime,
            title: item.title,
            status: item.status,
            id: item.id
          };
        });
        this.total = res.data.data.total;
        this.DurationList = newData;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-btn {
  border: 1px solid #009688;
  background-color: #009688;
}
.staff {
  padding: 15px;
  .staff-btn {
    display: inline-block;
    height: 38px;
    line-height: 38px;
    padding: 0 18px;
    background-color: #009688;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 5px;
  }
  .staff-inline {
    margin-right: 5px;
    position: relative;
    display: inline-block;
    .staff-inp {
      height: 38px;
      line-height: 1.3;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      border-radius: 2px;
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
}
</style>


<style lang="scss" scoped>
// .el-table {
//   margin: 10px 0;
// }
// .el-table th {
//   background-color: #cfd8d773;
//   border: 1px solid #fff;
//   padding: 9px 15px;
//   min-height: 20px;
//   line-height: 20px;
//   font-size: 14px;
// }
// .el-table tr {
//   background-color: #fff;
// }
// .el-table--small td {
//   padding: 9px 15px;
//   min-height: 20px;
//   line-height: 20px;
//   font-size: 14px;
// }
// .el-btn {
//   border: 1px solid #009688;
//   background-color: #009688;
// }
</style>

