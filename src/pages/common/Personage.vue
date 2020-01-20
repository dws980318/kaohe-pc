<template>
  <!-- 个人考核成绩 -->
  <keep-alive>
    <div class="staff pages">
      <el-select v-if="$store.state.home.open" v-model="value" placeholder="请选择考核期数">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-else v-model="value" placeholder="请选择考核期数">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.englishTitle"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-if="$store.state.home.open" v-model="name" placeholder="请选择部门">
        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select v-else v-model="name" placeholder="Please select department">
        <el-option v-for="item in list" :key="item.id" :label="item.englishName" :value="item.id"></el-option>
      </el-select>
      <!-- <button v-if="$store.state.home.open" class="staff-btn" @click="loadallAction">加载全部</button>
      <button v-else class="staff-btn" @click="loadallAction">Load all</button>-->
      <el-button
        size="small"
        type="primary"
        v-if="$store.state.home.open"
        class="staff-btn"
        @click="eachAction"
      >加载</el-button>
      <el-button size="small" type="primary" v-else class="staff-btn" @click="eachAction">Load</el-button>
      <!-- <div class="el-btnn" :data="CourseList"> -->
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <el-button
        class="staff-btn"
        v-if="$store.state.home.open"
        size="small"
        type="primary"
        @click="deriveAction"
      >导出</el-button>
      <!-- </div> -->
      <!-- <download-excel :data="CourseList" name="filename.xls" v-else class="staff-btn"> -->
      <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
      <!-- <div class="el-btnn" :data="CourseList"> -->
      <el-button class="staff-btn" v-else size="small" type="primary" @click="deriveAction">derive</el-button>
      <!-- </div> -->
      <!-- </download-excel> -->
      <el-table
        :header-cell-style="{background:'#f2f2f2',color:'#666'}"
        :data="CourseList"
        border
        style="width: 100%"
        v-if="$store.state.home.open"
      >
        <el-table-column prop="name" label="所属部门" width="auto"></el-table-column>
        <el-table-column prop="username" label="姓名" width="200"></el-table-column>
        <el-table-column prop="staff_id" label="工号" width="160"></el-table-column>
        <el-table-column prop="finishingRate" label="完成率(最新5次)" width="auto"></el-table-column>
        <el-table-column prop="createTime" label="最新一次考核时间" width="auto"></el-table-column>
        <el-table-column type="index" prop="finishingRate" label="线状图(最新5次)" width="320">
          <template slot-scope="scope">
            <Echarts ref="mychild" :courseList="CourseList[scope.$index]"></Echarts>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="detailAction(scope.$index)"
              size="mini"
              type="danger"
              class="el-btn"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :header-cell-style="{background:'#f2f2f2',color:'#666'}"
        :data="CourseList"
        border
        style="width: 100%"
        v-else
      >
        <el-table-column prop="dTEnglishName" label="Subordinate departments" width="auto"></el-table-column>
        <el-table-column prop="englishName" label="name" width="200"></el-table-column>
        <el-table-column prop="staff_id" label="Job number" width="160"></el-table-column>
        <el-table-column
          prop="finishingRate"
          label="percentage complete( latest 5 times)"
          width="auto"
        ></el-table-column>
        <el-table-column prop="createTime" label="time" width="auto"></el-table-column>
        <el-table-column
          type="index"
          prop="finishingRate"
          label="linear graph ( latest 5 times)"
          width="320"
        >
          <template slot-scope="scope">
            <Echarts ref="mychild" :courseList="CourseList[scope.$index]"></Echarts>
          </template>
        </el-table-column>
        <el-table-column label="operation" width="200">
          <template slot-scope="scope">
            <el-button
              @click="detailAction(scope.$index)"
              size="mini"
              type="danger"
              class="el-btn"
            >details</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        max-height="30px"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="this.total"
      ></el-pagination>
    </div>
  </keep-alive>
</template>

<script>
import De from "../BUS/De";
import request from "../../ajax/request";
import Echarts from "../../components/Echarts";
import axios from "axios";
export default {
  components: {
    Echarts
  },
  data() {
    return {
      options: [
        // { value: "", label: "" },
        // { value: "", label: "" }
      ],
      value: "",
      CourseList: [],
      pageSize: 20,
      currentPage: 1,
      pageSizes: 20,
      currentPages: 1,
      name: "",
      list: [],
      total: 0,
      baseurl: "http://192.168.0.252:9095"
    };
  },
  watch: {
    currentPage: function(val, newVal) {
      // this.currentPage = sessionStorage.currentPage || 1;
      this.currentPage =
        this.$route.params.currentPage === undefined
          ? 1
          : this.$route.params.currentPage;
      this.currentPage = val;
      this.eachAction();
    }
  },
  methods: {
    deriveAction() {
      console.log(this.value);
      console.log(this.name);
      this.$confirm("请选择部门，否则会导出失败", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          window.open(
            "http://193.112.173.69:9095/creaAssessCourse/exportSubjecList?duration_id=" +
              this.value +
              "&departmentId=" +
              this.name
          );
          this.$message({
            type: "success",
            message: "导出成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消导出"
          });
        });
      // require.ensure([], () => {
      //   const { export_json_to_excel } = require("../../excel/expor2Excal");
      //   const tHeader = [
      //     "所属部门",
      //     "所属部门英文名",
      //     "姓名",
      //     "姓名英文名",
      //     "工号",
      //     "完成率(最新5次)"
      //   ];
      //   const filterVal = [
      //     "name",
      //     "dTEnglishName",
      //     "username",
      //     "englishName",
      //     "staff_id",
      //     "finishingRate"
      //   ];
      //   const list = this.CourseList;
      //   const data = this.formatJson(filterVal, list);
      //   export_json_to_excel(tHeader, data, "员工成绩"); //对应下载文件的名字
      // });
    },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]));
    // },
    handleCurrentChange(currentPage) {
      // this.currentPage = sessionStorage.currentPage || 1;
      this.currentPage =
        this.$route.params.currentPage === undefined
          ? 1
          : this.$route.params.currentPage;
      this.currentPage = currentPage;
    },
    loadallAction() {
      this.name = "";
      this.eachAction();
    },
    eacoActions() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPages);
      data.append("pageSize", this.pageSizes);
      request
        .post("/creaDepartment/selectCreaDepartmentList", data)
        .then(res => {
          let newData = res.data.data.records.map(item => {
            return {
              englishName: item.englishName,
              name: item.name,
              status: item.status,
              id: item.id,
              assessName: item.assessName,
              assessId: item.assessId,
              dtEnglishName: item.dtEnglishName
            };
          });
          let one = newData;
          console.log(111);
          this.list = [{ name: "所有", id: "0", englishName: "All" }, ...one];
        });
    },
    eacoAction() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPages);
      data.append("pageSize", this.pageSizes);
      request.post("/creaAssessDuration/list", data).then(res => {
        this.options = res.data.data.records.map(item => {
          return {
            englishTitle: item.englishTitle,
            title: item.title,
            id: item.id,
            endTime: item.endTime
          };
        });
        // this.options = newData;
        let a = this.options[0];
        this.value = this.options[0].id;
        console.log(this.value);
        // sessionStorage.setItem("value", this.value);
        this.eachAction(this.value);
      });
    },
    eachAction(value) {
      if (this.value === "") {
        this.value = value;
        // this.value = sessionStorage.getItem("value");
      }
      console.log(this.value);
      var data = new URLSearchParams();
      data.append("id", this.value);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      data.append("departmentId", this.name || 0);
      request
        .post("/creaAssessCourse/selectAssessCourseList", data)
        .then(res => {
          console.log(res);
          let newData = res.data.data.records.map(item => {
            return {
              dTEnglishName: item.dTEnglishName,
              englishName: item.englishName,
              finishingRate:
                item.finishing_rate.length > 6
                  ? item.finishing_rate
                      .split(",")
                      .slice(-5)
                      .join(",")
                  : item.finishing_rate,
              name: item.name,
              username: item.username,
              staff_id: item.staff_id,
              createTime: item.createTime
            };
          });
          this.total = res.data.data.total;
          this.CourseList = newData;
          console.log(this.CourseList);
        });
    },
    detailAction(index) {
      console.log(this.CourseList[index]);
      let val1 = this.value;
      this.$router.push({
        name: "personageDetail",
        params: {
          mentlist: this.CourseList[index].staff_id,
          val1: val1,
          currentPage: this.currentPage
        }
      });
      // sessionStorage.currentPage = this.currentPage;
      console.log(this.currentPage);
    }
  },
  mounted() {},
  created() {
    // this.currentPage = sessionStorage.currentPage || 1;
    this.currentPage =
      this.$route.params.currentPage === undefined
        ? 1
        : Number(this.$route.params.currentPage);
    console.log(this.currentPage);
    this.eacoAction();
    // this.eachAction();
    this.eacoActions();
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
    margin-right: 12px;
  }
  .staff-inline {
    margin-right: 12px;
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
.el-table {
  margin: 10px 0;
}
.el-select {
  margin-right: 5px;
}
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


