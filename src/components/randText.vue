<template>
  <div v-loading="loading">
    <div v-if="imgUrl">
      <el-image :src="imgUrl" fit="fill" />
    </div>
    <div v-if="text || text_En">
      <div class="text">
        <div v-if="text_En.length > 0">
          <el-text class="mx-1" @click="copyToClipboard(text_En)">{{ text_En }}</el-text>
        </div>
        <div v-if="text.length > 0">
          <el-text class="mx-1" @click="copyToClipboard(text)">{{ text }}</el-text>
        </div>
      </div>
      <div class="btn-bottom">
        <el-button type="primary" @click="getOne">再来一句</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
import tt from "@/static/tutu.json";

export default {
  name: "rand-text",
  props: {
    model: { type: Object },
  },
  data() {
    return {
      loading: false,
      imgUrl: "",
      text: "",
      text_En: "",
      tutuList: tt,
      tutuIndex: 0
    };
  },
  mounted() {
    this.getOne();
  },
  methods: {
    getOne() {
      if (this.model.router == "tutu") {
        this.randTt();
      }
      else {
        this.getText();
      }
    },
    getText() {
      this.loading = true;
      this.$api
        .request(this.model.type, this.model.url, this.model.param)
        .then((res) => {
          if (res.success) {
            if (this.model.router == "text") {
              this.randText(res);
            } else if (this.model.router == "eng") {
              this.randEn(res);
            } else {
              ElMessage.error("请求错误");
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          ElMessage.error(JSON.stringify(err));
          this.loading = false;
        });
    },
    randText(res) {
      this.text = res.data.content;
    },
    randEn(res) {
      this.text = res.data.zh;
      this.text_En = res.data.en;
      this.imgUrl = res.data.pic;
    },
    randTt() {
      // 检查list是否为空
      if (this.tutuList.length === 0) {
        ElMessage.error("暂无语录~");
        return;
      }
      this.loading = true;
      let index = 0;
      do {
        // 计算随机索引
        index = Math.floor(Math.random() * this.tutuList.length);
      }
      while (this.tutuIndex == index)
      // 获取随机元素
      this.text = this.tutuList[index];
      this.tutuIndex = index;
      this.loading = false;
    },
    copyToClipboard(text) {
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement("textarea");
      // 设置元素的值为要复制的文本
      textarea.value = text;
      // 将元素添加到文档中
      document.body.appendChild(textarea);
      // 选中元素中的文本
      textarea.select();
      // 将选中的文本复制到剪贴板
      document.execCommand("copy");
      // 删除临时元素
      document.body.removeChild(textarea);

      ElMessage.success("已复制");
    },
  },
};
</script>
<style scoped>
.btn-bottom {
  margin-top: 10px;
  text-align: center;
}

.text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 40px;
}

.text .el-text {
  cursor: pointer;
}
</style>