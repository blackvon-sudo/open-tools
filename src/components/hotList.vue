<template>
    <div v-loading="loading">
        <el-tabs v-model="activeName" @tab-change="handleClick">
            <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.name" :name="item.name">
                <el-table :data="item.data" style="width: 100%; margin-bottom: 10px;">
                    <el-table-column prop="index" label="#" width="50" />
                    <el-table-column label="标题" width="750">
                        <template #default="scope">
                            <el-link :href="scope.row.url" target="_blank" type="primary">{{ scope.row.title }}</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-text size="small">{{ item.update_time }}</el-text>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
export default {
    name: "hot-list",
    props: {
        model: { type: Object },
    },
    data() {
        return {
            loading: false,
            list: [],
            activeName: ""
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            this.loading = true;
            this.$api
                .request(this.model.type, this.model.url, {})
                .then((res) => {
                    if (res.success) {
                        this.list = res.data;
                        this.activeName = res.data[0].name;
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    ElMessage.error(JSON.stringify(err));
                    this.loading = false;
                });
        },
        handleClick(activeName) {
            console.log(activeName)
            this.activeName = activeName;
            console.log(this.activeName)
        }
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