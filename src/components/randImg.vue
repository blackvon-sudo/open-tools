<template>
  <div v-loading="loading">
    <div class="image">
      <el-image :src="srcList[index]" :zoom-rate="1.2" :preview-src-list="srcList" :initial-index="index" fit="fill" />
    </div>
    <div class="btn-bottom">
      <el-button type="primary" @click="getImage">再来一张</el-button>
    </div>
  </div>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
  name: "rand-img",
  props: {
    model: { type: Object },
  },
  data() {
    return {
      loading: false,
      srcList: [],
      index: 0,
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    getImage() {
      this.loading = true;
      this.$api
        .request(this.model.type, this.model.url, this.model.param)
        .then((res) => {
          if (this.model.router == "pic") {
            this.randImg(res);
          } else if (this.model.router == "bing") {
            this.randBing(res);
          } else {
            ElMessage.error("请求错误");
          }
          this.loading = false;
        })
        .catch((err) => {
          ElMessage.error(JSON.stringify(err));
          this.loading = false;
        });
    },
    randImg(res) {
      if (res.success == true) {
        this.srcList.push(res.url);
        this.index = this.srcList.length == 0 ? 0 : this.srcList.length - 1;
      }
    },
    randBing(res) {
      if (res.success == true) {
        this.srcList.push(res.data.url);
        this.index = this.srcList.length == 0 ? 0 : this.srcList.length - 1;
      }
    },
  },
};
</script>
<style scoped>
.btn-bottom {
  margin-top: 10px;
  text-align: center;
}

.image {
  text-align: center;
}
</style>