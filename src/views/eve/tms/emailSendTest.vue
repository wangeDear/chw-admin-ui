<template>
    <el-container class="container">
        <el-form>
            <el-form-item label="选择环境">
                <el-select v-model="env">
                    <el-option value="测试">测试</el-option>
                    <el-option value="本地测试">本地测试</el-option>
                    <el-option value="正式">正式推送</el-option>
                </el-select>
            </el-form-item>

            <el-popconfirm title="确定推送？" @confirm="confirmSend()">
                <template #reference>
                    <el-button type="primary">确定推送</el-button>
                </template>
            </el-popconfirm>
            
            <el-button @click="queryCompany()">查询推送公司</el-button>
        </el-form>

    </el-container>

    <el-dialog
    v-model="dialogVisible"
    title="查询推送公司"
    width="30%"
  >
    <span>{{company}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios'
import { ElMessage } from 'element-plus';

export default defineComponent({
    setup() {
        const env = ref('测试');

        const confirmSend = () => {
            axios.post('/rpush/tms_email', {
                debugFlag: env.value
            }).then(function(response){
                ElMessage({
                    message: "推送成功",
                    type: "success"
                })
            }).catch(function(err){
                console.info(err)
            })
        };

        const dialogVisible = ref(false);
        const company = ref('');
        const queryCompany = () => {
            axios.get('http://10.1.1.34:9998/eveDl/operation/tmsOrderDiff/isSendMail').then(function(response){
                company.value = response.data.data
                dialogVisible.value = true
            }).catch(function(err){
                console.info(err)
            })
        };

        return {
            env,
            dialogVisible,
            company,

            confirmSend,
            queryCompany
        }
    },
})
</script>

<style scoped>
.container {
    padding: 5rem;
}
</style>
