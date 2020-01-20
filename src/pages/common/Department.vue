<template>
  <!-- 部门管理 -->
  <div class="staff pages">
    <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
    <button v-else class="staff-btn" @click="addAction">add</button>
    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" v-model="name" placeholder="搜索" class="staff-inp" ref="inp1">
    </div>
    <div v-else class="staff-inline">
      <input type="text" v-model="englishName" placeholder="search" class="staff-inp" ref="inp1">
    </div>
    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">搜索</button>
    <button v-else class="staff-btn" @click="eachAction">search</button>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="departmentList"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="name" label="标题" width="200"></el-table-column>
      <el-table-column prop="number" label="部门人数" width="300"></el-table-column>
      <el-table-column prop="assessName" label="考核标准" width="auto"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" class="el-btn" @click="redactAction(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="departmentList"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="englishName" label="title" width="200"></el-table-column>
      <el-table-column prop="number" label="Number of departments" width="300"></el-table-column>
      <el-table-column prop="assessEngName" label="Assessment criteria" width="auto"></el-table-column>
      <el-table-column prop="status" label="state" width="120">
       <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="operation" width="240" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            class="el-btn"
            @click="redactAction(scope.$index)"
          >edit</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">delete</el-button>
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
import { mapState } from "vuex";
import De from "../BUS/De";
import request from "../../ajax/request";

export default {
  data() {
    const item = {
      id: 1,
      name: "dssdd",
      englishName: "kjsdg",
      assessName: "fjsdfksd ",
      status: 0
    };
    return {
      data: Array(32).fill(item),
      departmentList: [],
      name: "",
      pageSize: 17,
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
    eachAction() {
      var data = new URLSearchParams();
      data.append("engDepartment", this.englishName);
      data.append("department", this.name);
      console.log(this.englishName)
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request
        .post("/creaDepartment/selectCreaDepartmentList", data)
        .then(res => {
          let newData = res.data.data.records.map(item => {
            // console.log(item.status);
            return {
              englishName: item.englishName,
              name: item.name,
              status: item.status,
              id: item.id,
              assessName: item.assessName,
              assessId: item.assessId,
              number: item.number,
              assessEngName: item.assessEngName
            };
          });
          this.departmentList = newData;
          // console.log(newData);
          this.total = res.data.data.total;
        });
    },
    addAction() {
      this.$router.push({ path: "/addDepartment" });
    },
    redactAction(index) {
      this.$router.push({
        name: "redactDepartment",
        params: this.departmentList[index]
      });
    },
    removeAction(index) {
      var data = new URLSearchParams();
      data.append("creaDepartmentId", this.departmentList[index].id);
      request.post("/creaDepartment/delete", data).then(res => {
        if (res.data.code == 200) {
          if (this.departmentList.length < 1) {
            this.currentPage = this.currentPage-1;
          }
          this.eachAction();
          this.$message({
            type: "info",
            message: '操作成功'
          });
        }
      });
      this.departmentList.splice(index, 1);
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
    margin-right: 5px;
    cursor: pointer;
  }
  .staff-inline {
    position: relative;
    display: inline-block;
    margin-right: 5px;
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


<style lang="scss">
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
// .el-table_1_column_1  {
//   display: none;
// }
</style>

