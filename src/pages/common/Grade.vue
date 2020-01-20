<template>
  <!-- 部门考核成绩 -->
  <div class="staff pages">
    <el-select v-if="$store.state.home.open" v-model="value" placeholder="请选择考核期数">
      <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id"></el-option>
    </el-select>
    <el-select v-else v-model="value" placeholder="请选择考核期数">
      <el-option v-for="item in options" :key="item.id" :label="item.englishTitle" :value="item.id"></el-option>
    </el-select>
    <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">加载</button>
    <button v-else class="staff-btn" @click="eachAction">Load</button>
    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="mentList"
      border
      style="width: 100%"
      v-if="$store.state.home.open"
    >
      <el-table-column prop="name" label="部门名称" width="400"></el-table-column>
      <el-table-column prop="number" label="部门人数" width="360"></el-table-column>
      <el-table-column prop="staffId" label="已参与考核人数" width="440"></el-table-column>
      <el-table-column prop="finishingRate" label="总完成率" width="auto"></el-table-column>
    </el-table>

    <el-table
      :header-cell-style="{background:'#f2f2f2',color:'#666'}"
      :data="mentList"
      border
      style="width: 100%"
      v-else
    >
      <el-table-column prop="dTEnglishName" label="title" width="400"></el-table-column>
      <el-table-column prop="number" label="Number of departments" width="360"></el-table-column>
      <el-table-column prop="staffId" label="Participated in the assessment" width="440"></el-table-column>
      <el-table-column prop="finishingRate" label="The total completion" width="auto"></el-table-column>
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
import request from "../../ajax/request";

export default {
  data() {
    return {
      options: [
        // { value: "0", label: "2018第四季度" },
        // { value: "1", label: "2019第一季度" }
      ],
      value: "",
      mentList: [],
      pageSize: 20,
      currentPage: 1,
      total: 0
    };
  },
  watch: {
    currentPage: function(val, newVal) {
      this.currentPage = val;
      console.log(this.currentPage);
      this.eachAction();
    }
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    eachAction(value) {
      if (this.value === "") {
        // this.value = sessionStorage.getItem("value");
        this.value = value;
      }
      var data = new URLSearchParams();
      data.append("id", this.value);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request
        .post("/creaAssessCourse/selectDepartmentCourseList", data)
        .then(res => {
          let newData = res.data.data.records.map(item => {
            return {
              dTEnglishName: item.dTEnglishName,
              englishName: item.englishName,
              finishingRate: item.finishingRate,
              name: item.name,
              username: item.username,
              staffId: item.staffId,
              number: item.number,
              id: item.id
            };
          });
          this.total = res.data.data.total;
          this.mentList = newData;
        });
    },
    eacoAction() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaAssessDuration/list", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            englishTitle: item.englishTitle,
            title: item.title,
            id: item.id
          };
        });
        this.options = newData;
        // console.log(this.options)
        let a = this.options[0];
        this.value = this.options[0].id;
        // sessionStorage.setItem("value", this.value);
        this.eachAction(this.value)
      });
    }
  },
  created() {
    this.eacoAction();
    // this.eachAction();
  }
};
</script>

<style lang="scss" scoped>
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
  }
  .staff-inline {
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
  span {
    padding: 0 10px;
    font-size: 12px;
  }
  a {
    padding: 0 10px;
    color: #000;
    font-size: 12px;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-select {
  margin-right: 5px;
}
.el-table {
  margin: 10px 0;
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


