<template>
  <!-- 管理员管理 -->
  <div class="staff pages">
    <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
    <button v-else class="staff-btn" @click="addAction">add</button>

    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" placeholder="名称" class="staff-inp" v-model="name" />
    </div>
    <div v-else class="staff-inline">
      <input type="text" placeholder="name" class="staff-inp" v-model="englishName" />
    </div>

    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" placeholder="用户名" class="staff-inp" v-model="loginName" />
    </div>
    <div v-else class="staff-inline">
      <input type="text" placeholder="user name" class="staff-inp" v-model="loginName" />
    </div>

    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">搜索</button>
    <button v-else class="staff-btn" @click="eachAction">search</button>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="AdminList"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="loginName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="assessName" label="所属部门" width="auto"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" class="el-btn" @click="redactAction(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="AdminList"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="englishName" label="name" width="200"></el-table-column>
      <el-table-column prop="loginName" label="User name" width="180"></el-table-column>
      <el-table-column prop="assessEngName" label="Subordinate departments" width="auto"></el-table-column>
      <el-table-column prop="status" label="status" width="120">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="operation" width="240">
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
import De from "../BUS/De";
import request from "../../ajax/request";

export default {
  data() {
    return {
      name: "",
      AdminList: [],
      pageSize: 20,
      currentPage: 1,
      total: 0,
      navName: "",
      loginName: '',
      englishName: '',
    };
  },
  created() {
    this.eachAction();
    this.eacoAction();
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
      data.append("name", this.name);
      data.append("englishName", this.englishName);
      data.append("loginName", this.loginName);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaAdmin/selectCreaAdminList", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            englishName: item.englishName,
            name: item.name,
            status: item.status,
            id: item.id,
            assessName: item.assessName,
            departmentid: item.departmentid,
            password: item.password,
            assessEngName: item.assessEngName,
            loginName: item.loginName
          };
        });
        this.AdminList = newData;
        this.total = res.data.data.total;
      });
    },
    eacoAction() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request
        .post("/creaDepartment/selectCreaDepartmentList", data)
        .then(res => {
          let newData = res.data.data.records.map(item => {
            return {
              name: item.name,
              id: item.id
            };
          });
          this.navName = newData;
        });
    },
    addAction() {
      this.$router.push({ path: "./addAdministrator" });
    },
    redactAction(index) {
      console.log(this.AdminList[index])
      this.$router.push({
        name: "redactAdministrator",
        params: this.AdminList[index]
      });
    },
    removeAction(index) {
      var data = new URLSearchParams();
      data.append("creaAdminId", this.AdminList[index].id);

      request.post("/creaAdmin/delete", data).then(res => {
         if (res.data.code == 200) {
          if (this.AdminList.length < 1) {
            this.currentPage = this.currentPage-1;
          }
          this.eachAction();
          this.$message({
            type: "info",
            message: '操作成功'
          });
        }
      });
      this.AdminList.splice(index, 1);
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
</style>


