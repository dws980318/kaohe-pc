<template>
  <!-- 部门管理 -->
  <div class="staff pages">
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="mentList"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="durationTitle" label="考核期" width="240"></el-table-column>
      <el-table-column prop="username" label="姓名" width="240"></el-table-column>
      <el-table-column prop="assName" label="考核标准" width="220"></el-table-column>
      <el-table-column prop="testName" label="考核方式" width="220"></el-table-column>
      <el-table-column prop="adminName" label="考核者" width="180"></el-table-column>
      <el-table-column prop="finishingRate" label="完成率" width="180"></el-table-column>
      <el-table-column label="操作" width="auto">
        <template slot-scope="scope">
          <!--   slot-scope="scope" -->
          <el-button size="mini" type="danger" class="el-btn" @click="showAction(scope.$index)">详情</el-button>
          <el-button size="mini" type="primary" @click="downAction">收起</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
          <el-button size="mini" type="success" @click="returnAction(scope.$index)">返回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="mentList"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="durationEnglishTitle" label="assessment" width="240"></el-table-column>
      <el-table-column prop="assEnglishName" label="name" width="240"></el-table-column>
      <el-table-column prop="assEnglishName" label="assessment criterion" width="220"></el-table-column>
      <el-table-column prop="testEnglishName" label="evaluation mode " width="220"></el-table-column>
      <el-table-column prop="adminEnglishName" label="assessed" width="180"></el-table-column>
      <el-table-column prop="finishingRate" label="percentage" width="180"></el-table-column>
      <el-table-column label="operation " width="auto">
        <template slot-scope="scope">
          <!--   slot-scope="scope" -->
          <el-button
            size="mini"
            type="danger"
            class="el-btn"
            @click="showAction(scope.$index)"
          >particulars</el-button>
          <el-button size="mini" type="primary" @click="downAction">pack up</el-button>
          <el-button size="mini" type="danger" @click="removeAction(scope.$index)">remove</el-button>
          <el-button size="mini" type="success" @click="returnAction(scope.$index)">return</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div v-if="$store.state.home.open">
        <el-table v-if="show" :data="showList" border style="width: 100%">
          <el-table-column prop="question" label="题目" width="auto"></el-table-column>
          <el-table-column prop="score" label="是否得分" width="160"></el-table-column>
          <el-table-column prop="createTime" label="考核时间" width="300"></el-table-column>
        </el-table>
      </div>

      <div v-else>
        <el-table v-if="show" :data="showList" border style="width: 100%">
          <el-table-column prop="englishQuestion" label="topic" width="auto"></el-table-column>
          <el-table-column prop="score" label="whether grade" width="160"></el-table-column>
          <el-table-column prop="createTime" label="assess time" width="300"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <el-pagination
      max-height="30px"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="this.total"
    ></el-pagination> -->
  </div>
</template>

<script>
import De from "../BUS/De";
import request from "../../ajax/request";

export default {
  data() {
    return {
      show: false,
      mentList: [],
      list: [],
      showList: [],
      val1: "",
      pageSize: 9999,
      currentPage: 1,
      total: 0
    };
  },
  watch: {
    currentPage: function(val, newVal) {
      this.currentPage = val;
      console.log(val);
      this.showAction();
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    returnAction() {
      this.$router.push({path: '/personage/' + this.$route.params.currentPage})
      // this.$router.go(-1);
    },
    removeAction(index) {
      var data = new FormData();
      data.append("id", this.mentList[index].id);
      // data.append("id", 1000);
      request
        .post("/creaAssessCourse/deleCreaAssessCourseById", data)
        .then(res => {
          if (res.data.code == 200) {
            this.commonAction();
            this.$message({
              type: "info",
              message: "操作成功"
            });
          }
        });
      this.mentList.splice(index, 1);
    },
    commonAction() {
      var data = new URLSearchParams();
      data.append("staff_id", this.list);
      data.append("duration_id", this.val1);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request
        .post("/creaAssessCourse/selectAssessDetailsList", data)
        .then(res => {
          let newData = res.data.data.map(item => {
            return {
              assEnglishName: item.assEnglishName,
              englishName: item.englishName,
              finishingRate: item.finishingRate,
              testName: item.testName,
              username: item.username,
              testEnglishName: item.testEnglishName,
              assName: item.assName,
              adminEnglishName: item.adminEnglishName,
              id: item.id,
              adminName: item.adminName,
              durationTitle: item.durationTitle,
              durationEnglishTitle: item.durationEnglishTitle
            };
          });
          this.mentList = newData;
          console.log(this.mentList);
        });
    },

    showAction(index) {
      this.show = true;
      var data = new URLSearchParams();
      console.log(this.mentList[index].id);
      data.append("id", this.mentList[index].id);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaScore/selectCreaScoreList", data).then(res => {
        console.log(res);

        let newData = res.data.data.records.map(item => {
          return {
            issueId: item.issueId,
            score: item.score,
            createTime: item.createTime,
            courseId: item.courseId,
            id: item.id,
            question: item.question,
            englishQuestion: item.englishQuestion
          };
        });
        this.showList = newData;
        console.log(this.showList);
        this.total = res.data.data.total;
      });
    },
    downAction() {
      this.show = false;
    },
    eachAction() {}
  },
  watch: {
    "$route.params": function(val, newval) {
      if (val.mentlist) {
        this.list = val.mentlist;
      }
      if (val.val1) {
        this.val1 = val.val1;
      }
      this.commonAction();
    }
  },
  created() {
    console.log(this.$route.params);
    this.list = this.$route.params.mentlist;
    this.val1 = this.$route.params.val1;
    this.commonAction();

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
</style>

