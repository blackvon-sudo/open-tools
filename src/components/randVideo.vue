<template>
  <div v-loading="loading">
    <div>
      <video :src="src" style="width: 100%;" autoplay="true" controls></video>
    </div>
    <div class="btn-bottom">
      <el-button type="primary" @click="getvideo">再来一个</el-button>
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
      src: "",
    };
  },
  mounted() {
    this.getvideo();
  },
  methods: {
    getvideo() {
      this.loading = true;
      this.$api
        .request(this.model.type, this.model.url, this.model.param)
        .then((res) => {
          this.randVideo(res);
          this.loading = false;
        })
        .catch((err) => {
          ElMessage.error(JSON.stringify(err));
          this.loading = false;
        });
    },
    randVideo(res) {
      if (res.code == 200) {
        this.src = res.mp4_video;
      }
    }
  },
};
</script>
<style scoped>
.btn-bottom {
  margin-top: 10px;
  text-align: center;
}
</style>