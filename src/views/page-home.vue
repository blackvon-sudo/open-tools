<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-affix>
          <div class="content">
            <div class="box">
              <el-menu mode="horizontal" :ellipsis="false" :router="true">
                <el-menu-item disabled class="no-click-style">
                  <img src="../assets/logo.png" style="height: 28px" alt="OpenTools" />
                  <span class="logo">
                    <a href="/">OpenTools</a>
                  </span>
                </el-menu-item>
                <el-menu-item disabled class="no-click-style">
                  <el-space spacer="|">
                    <el-input
                      v-model="searchKey"
                      clearable
                      placeholder="搜索工具~"
                      style="min-width: 150px"
                      @change="querySearch"
                    ></el-input>
                    <el-button type="primary" @click="querySearch">搜索</el-button>
                  </el-space>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </el-affix>
      </el-col>
    </el-row>
    <div class="main">
      <el-row>
        <el-col v-for="(item, index) in list" :key="index" :span="20" :offset="2">
          <el-row>
            <el-col :span="24">
              <h4>{{ item.name }}</h4>
            </el-col>
          </el-row>
          <el-row :gutter="12">
            <el-col v-for="(itemChild, indexChild) in item.list" :key="indexChild" :span="span">
              <el-card shadow="always" @click="chooseCard(itemChild)">
                <p class="title">{{ itemChild.name }}</p>
                <div class="content">
                  <p class="description">{{ itemChild.description }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
  <el-dialog
    :width="dialogWidth"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    v-model="dialogShow"
    :title="model.name"
  >
    <randImg :model="model" />
  </el-dialog>
</template>
  
  <script>
//import { ElMessage, ElMessageBox } from "element-plus";
import randImg from "@/components/randImg";
import { isMobile } from "@/utils/common";
import conf from "@/config/conf.json";

export default {
  name: "page-home",
  components: {
    randImg,
  },
  data() {
    return {
      dialogShow: false,
      dialogWidth: isMobile() ? "90%" : "500px",
      span: isMobile() ? 24 : 4,
      searchKey: "",
      list: conf,
      listAll: conf,
      model: {},
    };
  },
  mounted() {},
  methods: {
    querySearch() {
      this.list = this.searchKey ? this.filter(this.searchKey) : this.listAll;
    },
    filter(str) {
      let list = [];
      this.listAll.forEach((element) => {
        let itemList = element.list.filter(function (item) {
          return item.name.toLowerCase().indexOf(str.toLowerCase()) >= 0;
        });
        if (itemList.length > 0) {
          list.push({
            name: element.name,
            list: itemList,
          });
        }
      });
      return list;
    },
    chooseCard(item) {
      this.model = item;
      switch (this.model.openType) {
        case "new-tab":
          this.openNewTab(this.model.url);
          break;
        case "router":
          this.dialogShow = true;
          break;
      }
    },
    openNewTab(url) {
      var link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.setAttribute("href", url);
      link.click();
    },
  },
};
</script>

<style>
.no-click-style {
  border-bottom: none !important;
  opacity: 1 !important;
  cursor: pointer !important;
}
.logo {
  font-size: 16px;
  margin-left: 5px;
}
.logo a {
  text-decoration: none;
  color: #000000;
}
.content {
  overflow: hidden;
}
.box {
  overflow-y: auto; /*可滑动*/
}

.main {
  margin: 10px;
}
.main .el-card {
  margin-bottom: 10px;
  height: 95px;
}
.main .el-card__body .content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 15px;
}
.main .el-card__body {
  cursor: pointer;
  padding: 0 20px;
}
.main .el-card__body .title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0;
}
.main .el-card__body .description {
  font-size: 14px;
  color: #797d79;
  margin-top: 5px;
}
/* 滚动条整体样式 */
::-webkit-scrollbar {
  width: 5px; /* 宽度 */
  height: 5px; /* 高度 */
}

/* 滚动条轨道样式 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* 背景颜色 */
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #c1c1c1; /* 滑块颜色 */
  border-radius: 5px; /* 圆角 */
}

/* 滚动条滑块悬停样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #a1a1a1; /* 悬停颜色 */
}
</style>