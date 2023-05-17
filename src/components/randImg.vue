<template>
  <div>
    <el-image
      :src="srcList[0]"
      :zoom-rate="1.2"
      :preview-src-list="srcList"
      :initial-index="0"
      fit="fill"
    />
  </div>
  <div>
    <el-button type="primary">再来一张</el-button>
  </div>
</template>
<script>
export default {
  name: "rand-img",
  props: {
    model: { type: Object },
  },
  data() {
    return {
      srcList: [
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        //"https://cache.4ce.cn/star3/origin/ce410896bc97082c83e68fafc63ef996.png"
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>