<template>
    <el-table border :data="tableData" id="tmsTable">
        <el-table-column v-for="value in tableHeaders" :key="value" :prop="value.prop" :label="value.lable">
        </el-table-column>
    </el-table>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus';


export default defineComponent({
    setup() {

        const tableDataUrl = "http://10.1.1.34:9998/eveDl/operation/tmsOrderDiff/queryData";
        const tableData :any = ref([]);
        const tableHeaderUrl = "http://10.1.1.34:9998/eveDl/operation/tmsOrderDiff/tmsTitle";
        const tableHeaders :any = reactive([]);


        axios.get(tableHeaderUrl).then(res => {
            
            if(res.data.code != 200){
                ElMessage({
                    message: "获取表格数据失败，err:" + res.data.message,
                    type: "error"
                })
            }

            for(let i = 0; i < res.data.data.colDesc.length; i++){
                let o = {
                    prop: '',
                    lable: ''
                }
                o.lable = res.data.data.colDesc[i]
                o.prop = res.data.data.colName[i]

                tableHeaders.push(o)
            }

        }).catch((err) =>{
            ElMessage({
                    message: "获取表格数据失败，err:" + err,
                    type: "error"
                })
        })

        axios.get(tableDataUrl).then(res => {
            tableData.value = res.data.data
        })

        return {
            tableHeaders,
            tableData
        }
        
    },
})
</script>

