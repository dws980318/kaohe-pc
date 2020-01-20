<template>
  <div class="pages" style="padding:15px;">
    <!-- 修改管理员 -->
    <div class="reuse">
      <div v-if="$store.state.home.open" class="title">修改管理员</div>
      <div v-else class="title">update Admin</div>
      <div class="form_box">
        <form action>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">名称</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp1" v-model="mentList.name">
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">title</span>
            <div class="inp-block">
              <input type="text" class="from-inp" ref="inp2" v-model="mentList.englishName">
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">用户名</span>
            <div class="inp-block">
              <input type="text" class="from-inp" v-model="mentList.loginName" ref="inp3">
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">name</span>
            <div class="inp-block">
              <input type="text" class="from-inp" v-model="mentList.loginName" ref="inp3">
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">密码</span>
            <div class="inp-block">
              <input type="password" class="from-inp" ref="inp4" v-model="mentList.password">
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">password</span>
            <div class="inp-block">
              <input type="password" class="from-inp" ref="inp4" v-model="mentList.password">
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">部门选择</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list_checked"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list_checked[index].id) != -1 }"
              >
                <span class="span">{{item.name}}</span>
                <i></i>
              </div>
            </div>
          </div>
          <div v-else class="from-item">
            <span class="from-span">Department of choice</span>
            <div class="inp-block">
              <div
                class="from-checkbox"
                v-for="(item, index) in list_checked"
                :key="index"
                @click="showAction(index)"
                :class="{active: isArr.indexOf(list_checked[index].id) != -1 }"
              >
                <span class="span">{{item.englishName}}</span>
                <i></i>
              </div>
            </div>
          </div>
          <div v-if="$store.state.home.open" class="from-item">
            <span class="from-span">状态</span>
            <div class="inp-block">
              <el-select v-model="mentList.status" placeholder="启用" ref="inp5">
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
              <el-select v-model="mentList.status" placeholder="Activate" ref="inp5">
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
              <div class="from-btn" @click="updateAction">保存</div>
              <div type="reset" class="from-btn from-btn-primary" @click="backAction">返回</div>
            </div>
          </div>
          <div v-else class="from-item">
            <div class="inp-block" style="text-align: center;margin: 0;">
              <div class="from-btn" @click="updateAction1">save</div>
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
  data() {
    return {
      list: [],
      options: [{ values: "1", label: "启用" }, { values: "0", label: "禁用" }],
      option: [
        { value: "1", label: "Activate" },
        { value: "0", label: "Terminate" }
      ],
      value: "",
      values: "",
      mentList: [],
      pageSize: 9999,
      currentPage: 1,
      isArr: []
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
      console.log(selectIndex);
    },
    backAction() {
      this.$router.back();
    },
    updateAction() {
      let val1 = this.$refs.inp1.value;
      let val3 = this.$refs.inp3.value;
      let val4 = this.$refs.inp4.value;
      let val5 = this.mentList.status;
      console.log(val5);
      let arr = [];
      for (let i = 0; i < this.isArr.length; i++) {
        if (this.isArr[i] != -1) {
          arr.push(this.isArr[i]);
        }
      }
      let arr1 = arr.join(",");
      var data = new URLSearchParams();
      data.append("name", val1);
      data.append("loginName", val3); //你要传给后台的参数值 key/value
      data.append("departmentid", arr1);
      data.append("password", val4);
      data.append("status", val5);
      data.append("id", this.mentList.id);

      request.post("/creaAdmin/update", data).then(res => {
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
      console.log(data);
      // this.$router.go(-1);
    },
    updateAction1() {
      let val2 = this.$refs.inp2.value;
      let val3 = this.$refs.inp3.value;
      let val4 = this.$refs.inp4.value;
      let val5 = this.mentList.status;
      console.log(val5);
      let arr = [];
      for (let i = 0; i < this.isArr.length; i++) {
        if (this.isArr[i] != -1) {
          arr.push(this.isArr[i]);
        }
      }
      let arr1 = arr.join(",");
      var data = new URLSearchParams();
      data.append("englishName", val2); //你要传给后台的参数值 key/value
      data.append("loginName", val3); //你要传给后台的参数值 key/value
      data.append("departmentid", arr1);
      data.append("password", val4);
      data.append("status", val5);
      data.append("id", this.mentList.id);

      request.post("/creaAdmin/update", data).then(res => {
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
      console.log(data);
      // this.$router.go(-1);
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
              status: item.status,
              id: item.id,
              assessName: item.assessName,
              assessId: item.assessId
            };
          });
          this.list = newData;
          console.log(newData);
        });
    }
  },
  computed: {
    list_checked() {
      var _this = this;
      var list = _this.list;
      var newArr = [];
      for (let i = 0; i < list.length; i++) {
        newArr.push(_this.list[i].id);
      }
      console.log(newArr);
      var two = [];
      var item = [];
      if (_this.mentList.departmentid) {
        let one = _this.mentList.departmentid;
        console.log(one);
        two = one.split(",");
        two.map(data => {
          let newInt = Math.floor(data);
          item.push(newInt);
        });
        console.log(item);
      }

      var newId = [];
      for (let i = 0; i < item.length; i++) {
        newId.push(item[i]);
      }
      console.log(newId);

      this.isArr = newId;
      return list;
    }
  },
  watch: {
    "$route.params": function(val, newval) {
      this.mentList = val;
    },
    currentPage: function(val, newVal) {
      this.currentPage = val;
      // this.eachAction();
    }
  },
  mounted() {
    let _this = this;
    _this.mentList = _this.$route.params;
    console.log(_this.mentList.status);
  },
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
</style>
