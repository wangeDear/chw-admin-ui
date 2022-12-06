<template>
  <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
    <el-form-item label="ID">
      <el-input v-model="queryFormData.id.value" placeholder="请输入查询id" />
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="queryFormData.name.value" placeholder="请输入查询账号名称">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitSearch">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="tableData.listData" border style="width: 100%">
    <el-table-column prop="fcode" label="ID" width="180" />
    <el-table-column prop="fname" label="姓名" width="180" />
    <el-table-column prop="fsex" label="密码" />
  </el-table>

  <el-pagination background @current-change="pageChange" layout="prev, pager, next" :page-size="tableData.pageSize" :total="tableData.count" />

</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, toRefs, watch} from "vue";
import {QueryFormData, TableData} from "~/types/admin/goods";
import {GoodsApi} from "~/api/admin";

let queryForm = reactive(new QueryFormData().formData);
const queryFormData = {
  ...toRefs(queryForm)
}

let goodsApi = new GoodsApi()
let updateListGoods = ()=>{
  goodsApi.listGoods(queryForm).then(resp => {
    tableData.listData = resp.data.list
    tableData.count = resp.data.total
  })
}
const tableData = reactive(new TableData())

const pageChange = (page: number) => {
  queryForm.page = page
  goodsApi.listGoods(queryForm).then(resp => {
    tableData.listData = resp.data.list
    tableData.count = resp.data.total
  })
}
const onSubmitSearch = ()=>{
  updateListGoods()
}

onMounted(()=>{
  updateListGoods()
})

watch([()=>queryForm.id, ()=>queryForm.name], function (){
  if (queryForm.id === '' && queryForm.name === '') {
    updateListGoods()
  }
})
</script>