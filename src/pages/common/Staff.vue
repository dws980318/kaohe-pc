<template>
  <!-- 员工管理 -->
  <div class="home">
    <div class="staff pages">
      <el-select v-if="$store.state.home.open" v-model="value" placeholder="请选择部门">
        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select v-else v-model="value" placeholder="Please select department">
        <el-option v-for="item in list" :key="item.id" :label="item.englishName" :value="item.name"></el-option>
      </el-select>
      <div v-if="$store.state.home.open" class="staff-inline">
        <input type="text" placeholder="工号" class="staff-inp" v-model="number" />
      </div>
      <div v-else class="staff-inline">
        <input type="text" placeholder="Job number" class="staff-inp" v-model="number" />
      </div>

      <div v-if="$store.state.home.open" class="staff-inline">
        <input type="text" placeholder="名称" class="staff-inp" v-model="name" />
      </div>
      <div v-else class="staff-inline">
        <input type="text" placeholder="name" class="staff-inp" v-model="englishName" />
      </div>

      <button v-if="$store.state.home.open" class="staff-btn" @click="addAction">新增</button>
      <button v-else class="staff-btn" @click="addAction">add</button>

      <button v-if="$store.state.home.open" class="staff-btn" @click="eachAction">加载</button>
      <button v-else class="staff-btn" @click="eachAction">Load</button>
      <el-upload
        class="el-btnn"
        action="http://193.112.173.69:9095/creaUser/importExcel"
        name="file"
        v-if="$store.state.home.open"
        :on-success="img2"
        :show-file-list="false"
      >
        <!-- :on-change="upload"
        accept=".xls, .xlsx"
        :auto-upload="false"
        :show-flie-list="false"-->
        <el-button size="small" type="primary">导入</el-button>
      </el-upload>
      <el-upload
        class="el-btnn"
        action="http://193.112.173.69:9095/creaUser/importExcel"
        name="file"
        :show-file-list="false"
        v-else
      >
        <el-button size="small" type="primary">Import</el-button>
      </el-upload>
      <!-- <button class="staff-btn" @click="importAction"></button> -->
      <el-table
        :header-cell-style="{background:'#f2f2f2',color:'#666'}"
        :data="CreaUser"
        border
        style="width: 100%"
        v-if="$store.state.home.open"
      >
        <el-table-column prop="employeeNumber" label="工号" width="200"></el-table-column>
        <el-table-column prop="username" label="名称" width="280"></el-table-column>
        <el-table-column prop="name" label="所属部门" width="280"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template
            slot-scope="scope"
          >{{$store.state.home.open ? (Boolean(Number(scope.row.status)) ? "启用" : "禁用") : (Boolean(Number(scope.row.status)) ? "Activate" : "Terminate")}}</template>
        </el-table-column>
        <el-table-column label="操作" width="auto">
          <template slot-scope="scope">
            <el-button
              @click="redactAction(scope.$index)"
              size="mini"
              type="danger"
              class="el-btn"
            >编辑</el-button>
            <el-button size="mini" type="danger" @click="removeAction(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :header-cell-style="{background:'#f2f2f2',color:'#666'}"
        :data="CreaUser"
        border
        style="width: 100%"
        v-else
      >
        <el-table-column prop="employeeNumber" label="job number" width="200"></el-table-column>
        <el-table-column prop="englishName" label="name" width="280"></el-table-column>
        <el-table-column prop="dtEnglishName" label="Subordinate departments" width="280"></el-table-column>
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

      <!-- <input
        id="upload"
        type="file"
        @change="importfxx(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >

      <el-upload
        ref="upload"
        action="http://192.168.0.197:9095/creaUser/importExcel"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
      >
        <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
      </el-upload>

      <input
        id="upload"
        type="file"
        @change="importfxx(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      >

      <input type="file" :id="id" name="image" @change="preview($event)">-->
    </div>
  </div>
</template>

<script>
import De from "../BUS/De";
import request from "../../ajax/request";
import XLSX from "xlsx";
import axios from "axios";

export default {
  data() {
    return {
      list: [],
      value: "",
      CreaUser: [],
      name: "",
      number: "",
      pageSize: 20,
      currentPage: 1,
      total: 0,
      englishValue: "",
      englishName: "",
      fileList: "",
      id: ""
    };
  },
  created() {
    this.eachAction();
    this.echoAction();
  },
  watch: {
    currentPage: function(val, newVal) {
      // console.log(val);
      this.currentPage = val;
      this.eachAction();
    },
    CreaUser: function(val, newVal) {
      this.CreaUser = val;
    }
  },
  methods: {
    // preview(event) {
    //   let files = document.getElementById(this.id).file[0];
    //   this.imgDataUrl = this.getObjectURL(files);
    // },
    // getObjectURL(file) {
    //   let url = null;
    //   if (window.createObjectURL != undefined) {
    //     // basic
    //     url = window.createObjectURL(file);
    //   } else if (window.webkitURL != undefined) {
    //     // webkit or chrome
    //     url = window.webkitURL.createObjectURL(file);
    //   } else if (window.URL != undefined) {
    //     // mozilla(firefox)
    //     url = window.URL.createObjectURL(file);
    //   }
    //   return url;
    // },
    // importfxx(obj) {
    //   let _this = this;
    //   let inputDOM = this.$refs.inputer;
    //   // 通过DOM取文件数据
    //   this.file = event.currentTarget.files[0];
    //   var rABS = false; //是否将文件读取为二进制字符串
    //   var f = this.file;
    //   var reader = new FileReader();
    //   //if (!FileReader.prototype.readAsBinaryString) {
    //   FileReader.prototype.readAsBinaryString = function(f) {
    //     var binary = "";
    //     var rABS = false; //是否将文件读取为二进制字符串
    //     var pt = this;
    //     var wb; //读取完成的数据
    //     var outdata;
    //     var reader = new FileReader();
    //     reader.onload = function(e) {
    //       var bytes = new Uint8Array(reader.result);
    //       var length = bytes.byteLength;
    //       for (var i = 0; i < length; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //       }
    //       var XLSX = require("xlsx");
    //       if (rABS) {
    //         wb = XLSX.read(btoa(fixdata(binary)), {
    //           //手动转化
    //           type: "base64"
    //         });
    //       } else {
    //         wb = XLSX.read(binary, {
    //           type: "binary"
    //         });
    //       }
    //       outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
    //       console.log(outdata);
    //       this.CreaUser = outdata;
    //     };
    //     reader.readAsArrayBuffer(f);
    //   };
    //   if (rABS) {
    //     reader.readAsArrayBuffer(f);
    //   } else {
    //     reader.readAsBinaryString(f);
    //   }
    // },
    // importExcel(file) {
    //   // let file = file.files[0] // 使用传统的input方法需要加上这一步
    //   const types = file.name.split(".")[1];
    //   const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
    //     item => item === types
    //   );
    //   if (!fileType) {
    //     this.$message("格式错误！请重新选择");
    //     return;
    //   }
    //   this.file2Xce(file).then(tabJson => {
    //     if (tabJson && tabJson.length > 0) {
    //       this.xlsxJson = tabJson;
    //       console.log("数据", this.xlsxJson[0]);
    //       this.CreaUser = this.xlsxJson[0].sheet;
    //       // xlsxJson就是解析出来的json数据,数据格式如下
    //       // [
    //       //   {
    //       //     sheetName: sheet1
    //       //     sheet: sheetData
    //       //   }
    //       // ]
    //     }
    //   });
    // },
    // file2Xce(file) {
    //   return new Promise(function(resolve, reject) {
    //     const reader = new FileReader();
    //     reader.onload = function(e) {
    //       const data = e.target.result;
    //       this.wb = XLSX.read(data, {
    //         type: "binary"
    //       });
    //       const result = [];
    //       this.wb.SheetNames.forEach(sheetName => {
    //         result.push({
    //           sheetName: sheetName,
    //           sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
    //         });
    //       });
    //       resolve(result);
    //     };
    //     reader.readAsBinaryString(file.raw);
    //     // reader.readAsBinaryString(file) // 传统input方法
    //   });
    // },
    // upload(file, fileList) {
    //   console.log("file", file);
    //   console.log("fileList", fileList);
    //   let files = { 0: file.raw };
    //   this.readExcel1(files);
    // },
    // readExcel1(files) {
    //   //表格导入
    //   var that = this;
    //   console.log(files);
    //   if (files.length <= 0) {
    //     //如果没有文件名
    //     return false;
    //   } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    //     this.$Message.error("上传格式不正确，请上传xls或者xlsx格式");
    //     return false;
    //   }

    //   const fileReader = new FileReader();
    //   fileReader.onload = ev => {
    //     try {
    //       const data = ev.target.result;
    //       const workbook = XLSX.read(data, {
    //         type: "binary"
    //       });
    //       console.log(workbook);
    //       const wsname = workbook.SheetNames[0]; //取第一张表
    //       const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
    //       console.log(ws);

    //       this.CreaUser = ws;
    //       console.log(this.CreaUser);
    //       // that.peopleArr = [];//清空接收数据
    //       // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
    //       //     that.peopleArr = [];
    //       // }
    //       //重写数据
    //       try {
    //       } catch (err) {
    //         console.log(err);
    //       }

    //       this.$refs.upload.value = "";
    //     } catch (e) {
    //       return false;
    //     }
    //   };
    //   fileReader.readAsBinaryString(files[0]);
    // },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    addAction() {
      this.$router.push({ path: "./addStaff" });
    },
    redactAction(index) {
      this.$router.push({
        name: "redactStaff",
        params: this.CreaUser[index]
      });
    },
    importAction() {
      var data = new URLSearchParams();
      data.append("name");
      request.get("/creaUser/importUser", data).then(res => {});
    },
    eachAction() {
      var data = new URLSearchParams();
      data.append("department", this.value);
      data.append("employee_number", this.number);
      data.append("username", this.name);
      data.append("englishName", this.englishName);
      data.append("currentPage", this.currentPage);
      data.append("pageSize", this.pageSize);
      request.post("/creaUser/selectCreaUserList", data).then(res => {
        let newData = res.data.data.records.map(item => {
          return {
            englishName: item.englishName,
            name: item.name,
            status: item.status,
            id: item.id,
            employeeNumber: item.employeeNumber,
            departmentid: item.departmentid,
            username: item.username,
            dtEnglishName: item.dtEnglishName
          };
        });
        this.CreaUser = newData;
        console.log(this.CreaUser);
        this.total = res.data.data.total;
      });
    },
    echoAction() {
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
              assessId: item.assessId,
              dtEnglishName: item.dtEnglishName
            };
          });
          this.list = newData;
          // console.log(newData);
          // this.value = newData[0].name;
          this.englishValue = newData[0].englishName;
        });
    },
    removeAction(index) {
      var data = new URLSearchParams();
      data.append("creaUserId", this.CreaUser[index].id);
      request.post("/creaUser/delete", data).then(res => {
        if (res.data.code == 200) {
          if (this.CreaUser.length < 1) {
            this.currentPage = this.currentPage-1;
          }
          this.eachAction();
          this.$message({
            type: "info",
            message: '操作成功'
          });
        }
      });
      this.CreaUser.splice(index, 1);
    },
    img2(response, file, fileList) {
      console.log(response);
    }
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
.el-select {
  margin-right: 5px;
}
.el-table {
  margin: 10px 0;
}
/* .el-table th {
  background-color: #cfd8d773;
  border: 1px solid #fff;
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.el-table tr {
  background-color: #fff;
}
.el-table--small td {
  padding: 9px 15px;
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.el-btn {
  border: 1px solid #009688;
  background-color: #009688;
}
.el-select .el-input__inner:focus {
  border-color: #dcdfe6;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #dcdfe6;
} */
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
