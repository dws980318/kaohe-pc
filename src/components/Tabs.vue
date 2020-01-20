<template>
  <div class="home">
    <!-- 侧边栏 -->
    <div class="sild" id="sild">
      <div class="sild-scroll">
        <ul class="sild-tree">
          <li class="sild-tree-item" v-for="(item, index) in group" :key="index">
            <div v-if="$store.state.home.open">
              <router-link :to="item.path">
                <span>{{item.title}}</span>
                <span class="sild-bar"></span>
              </router-link>
            </div>

            <el-tooltip v-else effect="dark" :content="item.enflishTitle" placement="right">
              <router-link :to="item.path">
                <span>{{item.enflishTitle}}</span>
                <span class="sild-bar"></span>
              </router-link>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>

    <!-- 尾部 -->
    <div v-if="$store.state.home.open" class="footer">© layui.com - 底部固定区域</div>
    <div v-else class="footer">© layui.com - Bottom fixed area</div>
  </div>
</template>

<script>
export default {
  name: "pc-tabs",
  data() {
    return {
      group: [
        {
          path: "/department",
          title: "部门管理",
          enflishTitle: "Departmental management"
        },
        {
          path: "/administrator",
          title: "管理员管理",
          enflishTitle: "Administrator Management"
        },
        {
          path: "/staff",
          title: "员工管理",
          enflishTitle: "Employee management"
        },
        {
          path: "/standard",
          title: "考核标准管理",
          enflishTitle: "Assessment Standard Management"
        },
        {
          path: "/serve",
          title: "基本服务要素",
          enflishTitle: "Elements of basic services"
        },
        {
          path: "/brand",
          title: "品牌标准审查问题",
          enflishTitle: "Brand Standard Review"
        },
        {
          path: "/assessment",
          title: "考核期",
          enflishTitle: "Assessment period"
        },
        {
          path: "/personage/1",
          title: "个人考核成绩",
          enflishTitle: "Individual assessment results"
        },
        {
          path: "/grade",
          title: "部门考核成绩",
          enflishTitle: "Departmental Assessment Achievements"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home .sild .sild-scroll .sild-tree .sild-tree-item:hover span {
  box-sizing: border-box;
  transition: all 0.2s;
  opacity: 1;
  width: 200px;
  height: 100%;
}
.sild-tree-item:hover a {
  color: #fff;
  background-color: #4e5465;
}
.home {
  .sild-tree-item {
    .router-link-active {
      background-color: #009688;
      color: #fff;
      a {
        background-color: #009688;
      }
    }
  }
  .sild {
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    z-index: 999;
    width: 200px;
    overflow-x: hidden;
    background-color: #393d49 !important;
    .sild-scroll {
      position: relative;
      width: 220px;
      height: 100%;
      overflow-x: hidden;
      .sild-tree {
        position: relative;
        background-color: #393d49;
        color: #fff;
        border-radius: 2px;
        font-size: 12px;
        box-sizing: border-box;
        width: 200px;
        padding: 0;

        .sild-tree-item {
          position: relative;
          zoom: 1;
          line-height: 60px;
          display: block;
          width: 200px;
          line-height: 45px;
          box-sizing: border-box;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .sild-bar {
            border-left: 5px solid #009688;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            transition: all 0.2s;
            width: 0;
            height: 5px;
          }
        }
      }
    }
  }

  a {
    display: block;
    padding: 0 20px;
    color: #fff;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .footer {
    position: fixed;
    left: 200px;
    right: 0;
    bottom: 0;
    height: 44px;
    line-height: 44px;
    font-size: 12px;
    padding: 0 15px;
    background-color: #eee;
  }
}
</style>


