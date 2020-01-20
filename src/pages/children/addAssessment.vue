<template>
  <div class="pages" style="padding:15px;">
    <!-- 考核期 -->
    <div class="reuse">
      <div v-if="$store.state.home.open" class="title">新增考核期</div>
      <div v-else class="title">add Assessment</div>
      <div class="form_box">
        <form action>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">标题</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp1">
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">title</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp1">
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">开始时间</span>
            <div class="inp-block">
              <el-date-picker
                style="width: 43rem;"
                v-model="value1"
                type="datetime"
                 @change="dateChangebirthday1"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">startTime</span>
            <div class="inp-block">
              <el-date-picker
                style="width: 43rem;"
                v-model="value1"
                type="datetime"
                @change="dateChangebirthday1"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Select date time"
              ></el-date-picker>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">结束时间</span>
            <div class="inp-block">
              <el-date-picker
                style="width: 43rem;"
                v-model="value2"
                type="datetime"
                @change="dateChangebirthday2"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">endTime</span>
            <div class="inp-block">
              <el-date-picker
                style="width: 43rem;"
                v-model="value2"
                type="datetime"
                @change="dateChangebirthday2"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="Select date time"
              ></el-date-picker>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">管理部门</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list[index].id) != -1 }"
              >
                <span class="span">{{item.name}}</span>
                <i></i>
              </div>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">department</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list[index].id) != -1 }"
              >
                <span class="span">{{item.englishName}}</span>
                <i></i>
              </div>
            </div>
          </div>
            <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">状态</span>
            <div class="inp-block">
              <el-select v-model="values" placeholder="启用" ref="inp5">
                <el-option
                  v-for="item in options"
                  :key="item.values"
                  :label="item.label"
                  :value="item.values"
                  class="from-inp"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">status</span>
            <div class="inp-block">
              <el-select v-model="value" placeholder="Activate" ref="inp5">
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="from-inp"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <div class="inp-block" style="text-align: center;margin: 0;">
              <div class="from-btn" @click="addAction">保存</div>
              <div type="reset" class="from-btn from-btn-primary" @click="backAction">返回</div>
            </div>
          </div>
          <div v-else class="from-item">
            <div class="inp-block" style="text-align: center;margin: 0;">
              <div class="from-btn" @click="addAction">save</div>
              <div type="reset" class="from-btn from-btn-primary" @click="backAction">return</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import De from "../BUS/De";
import request from "../../ajax/request";

export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      list: [],
      options: [
        { values: 1, label: "启用" },
        { values: 0, label: "禁用" }
      ],
      option: [
         { value: 1, label: "Activate" },
        { value: 0, label: "Terminate" }
      ],
      value: "",
      values: "",
      mentList: [],
      isArr: [],
      pageSize: 9999,
      currentPage: 1,
      value1: "",
      value2: ""
    };
  },
  methods: {
    showAction(index) {
      let selectIndex = this.isArr.indexOf(this.list[index].id);
      if (selectIndex == -1) {
        this.isArr.push(this.list[index].id);
      } else {
        this.isArr.splice(selectIndex, 1);
      }
      console.log(this.isArr);
    },
    backAction() {
      this.$router.back();
    },
    addAction() {
      let val1 = this.$refs.inp1.value;
      let val5 = this.$refs.inp5.value;
      console.log(this.value1);
      console.log(this.value2);
      let val6 = "";
      if (val5 == "启用") {
        val6 = 1;
      } else {
        val6 = 0;
      }
      console.log(val6)
      let arr = [];
      for (let i = 0; i < this.isArr.length; i++) {
        if (this.isArr[i] != -1) {
          arr.push(this.isArr[i]);
        }
      }
      let arr1 = arr.join(",");

      var data = new URLSearchParams();
      data.append("title", val1);
      data.append("englishTitle", val1); //你要传给后台的参数值 key/value
      data.append("departmentid", arr1);
      data.append("startTime", this.value1);
      data.append("endTime", this.value2);
      data.append("status", val6);
      request.post("/creaAssessDuration/add", data).then(res => {
        console.log(res);
        const { code, message } = res.data;
        if (code == 200) {
          this.$router.go(-1);
          this.$message({
            type: "info",
            message: message
          });
        } else {
          this.$message({
            type: "info",
            message: message
          });
        }
      });
    },
    eachAction() {
      var data = new URLSearchParams();
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request
        .post("/creaDepartment/selectCreaDepartmentList", data)
        .then(res => {
          let newData = res.data.data.records.map(item => {
            return {
              englishName: item.englishName,
              name: item.name,
              status: Boolean(Number(item.status)) ? "启用" : "禁用",
              id: item.id,
              assessName: item.assessName,
              assessId: item.assessId
            };
          });
          this.list = newData;
        });
    },
    dateChangebirthday1(val) {
        this.value1 = val;
    },
     dateChangebirthday2(val) {
        this.value2 = val;
    }
  },
  // watch: {
  //   currentPage: function(val, newVal) {
  //     this.currentPage = val;
  //     this.eachAction();
  //   }
  // },
  created() {
    this.eachAction();
  }
};
</script>

<style lang="scss" scoped>
.from-checkbox:hover i {
  color: #c2c2c2;
}
.from-checkbox:hover span {
  background-color: #c2c2c2;
}
.reuse {
  .active {
    span {
      background-color: #5fb878;
    }
    i {
      color: #5fb878;
    }
  }
  .title {
    text-align: center;
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 800;
  }
  .form_box {
    width: 820px;
    margin: 0 auto;
    .from-item {
      margin-bottom: 15px;
      .from-span {
        float: left;
        display: block;
        padding: 9px 15px;
        width: 100px;
        font-weight: 400;
        line-height: 20px;
        text-align: right;
        font-size: 12px;
      }
      .inp-block {
        min-height: 36px;
        margin-left: 130px;
        position: relative;
        .from-inp {
          display: block;
          width: 100%;
          padding-left: 10px;
          height: 38px;
          line-height: 1.3;
          line-height: 38px\9;
          border-width: 1px;
          border-style: solid;
          background-color: #fff;
          border-radius: 2px;
          border-color: #e6e6e6;
          box-sizing: border-box;
        }
        .from-checkbox {
          margin-top: 4px;
          position: relative;
          height: 30px;
          line-height: 30px;
          margin-right: 10px;
          padding-right: 30px;
          cursor: pointer;
          font-size: 0;
          -webkit-transition: 0.1s linear;
          transition: 0.1s linear;
          box-sizing: border-box;
          display: inline-block;
          background-color: #fff;
          span {
            padding: 0 10px;
            height: 100%;
            font-size: 14px;
            border-radius: 2px 0 0 2px;
            color: #fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .from-btn {
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
          cursor: pointer;
          margin-left: 10px;
          outline: 0;
          transition: all 0.3s;
          box-sizing: border-box;
          &:hover {
            opacity: 0.7;
          }
        }
        .from-btn-primary {
          border: 1px solid #c9c9c9;
          background-color: #fff;
          color: #555;
        }
      }
    }
  }
  .span {
    background-color: #d2d2d2;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 28px;
    border: 1px solid #d2d2d2;
    border-left: none;
    border-radius: 0 2px 2px 0;
    color: #fff;
    font-size: 20px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    &::before {
      content: "\2713";
      width: 10px;
      height: 10px;
      line-height: 10px;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-input__inner {
  display: block;
  padding-left: 10px;
  height: 38px;
  line-height: 1.3;
  line-height: 38px\9;
  border-width: 1px;
  border-style: solid;
  background-color: #fff;
  border-radius: 2px;
  border-color: #e6e6e6;
}
</style>

<style lang="scss">
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
}
.el-input__inner {
  width: 100%;
  height: 100%;
  min-height: 36px;
}
</style>