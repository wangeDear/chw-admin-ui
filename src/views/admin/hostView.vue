<template>
  <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
    <el-form-item label="主机名称">
      <el-input v-model="queryFormData.hostName" placeholder="请输入查询主机名称" />
    </el-form-item>
    <el-form-item label="IP">
      <el-input v-model="queryFormData.ip" placeholder="请输入查询IP">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitSearch">查询</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="data.list" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="hostName" label="主机名称" width="180" />
    <el-table-column prop="password" label="密码" />
  </el-table>

</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";
import {listHost} from "~/api/admin/solonApi";
import {InitHostData} from "~/types/admin/hostTypes";

const data = reactive(new InitHostData())
const queryFormData = {...toRefs(data.queryFormData)}


let updateListData = ()=>{
  listHost(data.queryFormData).then(resp => {
    data.list = resp.data
  })
}

const onSubmitSearch = ()=>{
  updateListData()
}

onMounted(()=>{
  updateListData()
})

</script>