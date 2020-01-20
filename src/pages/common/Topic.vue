<template>
  <!-- 考核标准管理 -->
  <div class="staff pages">
    <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
    <button v-else class="staff-btn" @click="addAction">add</button>
    <div v-if="$store.state.home.open" class="staff-inline">
      <input type="text" placeholder="搜索" class="staff-inp" v-model="name" />
    </div>
    <div v-else class="staff-inline">
      <input type="text" placeholder="search" class="staff-inp" v-model="englishName" />
    </div>
    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">搜索</button>
    <button v-else class="staff-btn" @click="eachAction">search</button>
    <el-upload
      class="el-btnn"
      action="http://193.112.173.69:9095/creaAssessIssue/importExcel"
      name="file"
      multiple
      v-if="$store.state.home.open"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">导入</el-button>
    </el-upload>
    <el-upload
      class="el-btnn"
      action="http://193.112.173.69:9095/creaAssessIssue/importExcel"
      name="file"
      multiple
      v-else
      :show-file-list="false"
    >
      <el-button size="small" type="primary">Import</el-button>
    </el-upload>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="IssueList"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="question" label="标题" width="540"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template
          slot-scope="scope"
        >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
      </el-table-column>
      <el-table-column label="操作" width="auto">
        <template slot-scope="scope">
          <el-button @click="redactAction(scope.$index)" size="mini" type="danger" class="el-btn">编辑</el-button>
          <!-- <el-button size="mini" type="danger" class="el-btn">查看题目</el-button> -->
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="IssueList"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="englishQuestion" label="title" width="540"></el-table-column>
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
          <!-- <el-button size="mini" type="danger" class="el-btn">查看题目</el-button> -->
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
      mentList: [],
      IssueList: [],
      name: "",
      pageSize: 16,
      currentPage: 1,
      total: 0,
      englishName: "",
      assessId: ""
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
      this.$router.push({
        name: "addTopic",
        params: { id: this.assessId }
      });
    },
    redactAction(index) {
      this.$router.push({ name: "redactTopic", params: this.IssueList[index] });
    },
    removeAction(index) {
      var data = new URLSearchParams();
      data.append("creaAssessIssueId", this.IssueList[index].id);
      request.post("/creaAssessIssue/delete", data).then(res => {
        if (res.data.code == 200) {
          if (this.IssueList.length < 1) {
            this.currentPage = this.currentPage-1;
          }
          this.eachAction();
          this.$message({
            type: "info",
            message: '操作成功'
          });
        }
      });
      this.IssueList.splice(index, 1);
    },
    eachAction() {
      this.mentList = this.$route.params.name;
      var data = new URLSearchParams();
      console.log(this.mentList);

      data.append("assessName", this.mentList);
      data.append("issueName", this.name);
      data.append("issueEnglishName", this.englishName);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaAssessIssue/selectIssueList", data).then(res => {
        let newData = res.data.data.records.map(item => {
          // console.log(res);
          return {
            assessId: item.assessId,
            englishQuestion: item.englishQuestion,
            question: item.question,
            status: item.status,
            id: item.id
          };
        });
        this.assessId = newData[0].assessId;
        this.IssueList = newData;
        this.total = res.data.data.total;
        console.log(newData)
      });
    }
  },
  created() {
    this.eachAction();
  }
};
</script>

<style lang="scss" scoped>
.el-btnn {
  // width: 60px;
  border: 1px solid #009688;
  background-color: #009688;
  height: 38px;
  line-height: 38px;
  padding: 0 5px;
  display: inline-block;
  border-radius: 2px;
  box-sizing: border-box;
}
.el-button--primary {
  background-color: #009688;
  border: none;
}
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
/deep/.el-input--small {
  .el-input__inner {
    height: 38px;
    line-height: 38px;
  }
}
/deep/.el-input {
  .el-input--small {
    .el-input__inner {
      line-height: 38px;
      height: 38px;
    }
  }
}
/deep/.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
/deep/.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
</style>


