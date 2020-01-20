<template>
  <!-- 考核标准管理 -->
  <div class="staff pages">
    <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
    <button v-else class="staff-btn" @click="addAction">add</button>

    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" placeholder="名称" class="staff-inp" v-model="name" />
    </div>
    <div v-else class="staff-inline">
      <input type="text" placeholder="name" class="staff-inp" v-model="englishName" />
    </div>
    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">搜索</button>
    <button v-else class="staff-btn" @click="eachAction">search</button>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="CreaAssess"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="name" label="名称" width="auto"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <template slot-scope="scope">
          <el-button @click="redactAction(scope.$index)" size="mini" type="danger" class="el-btn">编辑</el-button>
          <el-button
            @click="topicAction(scope.$index)"
            size="mini"
            type="danger"
            class="el-btn"
          >查看题目</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="CreaAssess"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="englishName" label="name" width="auto"></el-table-column>
      <el-table-column prop="status" label="status" width="180">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="operation" width="auto">
        <template slot-scope="scope">
          <el-button
            @click="redactAction(scope.$index)"
            size="mini"
            type="danger"
            class="el-btn"
          >edit</el-button>
          <el-button
            @click="topicAction(scope.$index)"
            size="mini"
            type="danger"
            class="el-btn"
          >See the title</el-button>
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
    return {
      name: "",
      CreaAssess: [],
      pageSize: 14,
      currentPage: 1,
      total: 0,
      englishName: ""
    };
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
      this.$router.push({ path: "./addStandard" });
    },
    redactAction(index) {
      this.$router.push({
        name: "redactStandard",
        params: this.CreaAssess[index]
      });
    },
    topicAction(index) {
      this.$router.push({
        name: "topic",
        params: { name: this.CreaAssess[index].name }
      });
    },
    removeAction(index) {
      var data = new URLSearchParams();
      data.append("creaAssessId", this.CreaAssess[index].id);
      request.post("/creaAssess/delete", data).then(res => {
        if (res.data.code == 200) {
          if (this.CreaAssess.length < 1) {
            this.currentPage = this.currentPage - 1;
          }
          this.eachAction();
          this.$message({
            type: "info",
            message: "操作成功"
          });
        }
      });
      this.CreaAssess.splice(index, 1);
    },
    eachAction() {
      var data = new URLSearchParams();
      data.append("name", this.name);
      data.append("englishName", this.englishName);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaAssess/selectCreaAssessList", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            englishName: item.englishName,
            name: item.name,
            status: item.status,
            id: item.id,
            assessName: item.assessName
          };
        });
        // console.log(newData);
        this.total = res.data.data.total;
        this.CreaAssess = newData;
      });
    }
  },
  created() {
    this.eachAction();
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


