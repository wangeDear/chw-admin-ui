<template>
  <div style="padding: 2rem; background-color: white;" v-show="hasAuthority">
    <el-row class="search-row">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="工号">
          <el-input v-model="searchForm.fcode" placeholder="请输入工号"/>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.fname" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateTableData">查询</el-button>
        </el-form-item>
      </el-form>

      <el-button type="primary"
                 @click="dialogFormVisible = true, dialogFormType = 'add', dialogForm.fcode = '', dialogForm.fname = '', roleIds = [], dialogForm.id = ''">
        新增
      </el-button>
    </el-row>

    <el-row class="table-row">
      <el-table :data="tableUserData.data" border style="width: 100%">
        <el-table-column prop="account" label="工号" width="180"/>
        <el-table-column prop="name" label="姓名" width="180"/>
        <el-table-column prop="createTime" label="创建时间" width="180"/>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-link size="small" @click="handleCheck(scope.row)">查看</el-link>&nbsp;&nbsp;
            <el-link size="small" @click="handleUpdate(scope.row)">编辑</el-link>&nbsp;&nbsp;
            <el-link size="small" type="danger" @click="handleDelete(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

  </div>

  <el-dialog v-model="dialogFormVisible" title="账号权限配置">
    <el-form :model="dialogForm" :rules="dialogFormRules">
      <el-form-item>
        <el-input v-model="dialogForm.id" type="hidden" :readonly=true></el-input>
      </el-form-item>
      <el-form-item label="工号" required prop="fcode">
        <el-autocomplete v-model="dialogForm.fcode" style="width: 100%" :fit-input-width=true value-key="fcode"
                         :fetch-suggestions="queryFcodeAsync" placeholder="请输入工号" @select="handleFcodeSelect"/>
      </el-form-item>
      <el-form-item label="姓名" required>
        <el-input v-model="dialogForm.fname" placeholder="请先输入选择工号后自动匹配" :readonly=true></el-input>
      </el-form-item>

      <el-form-item label="权限" required prop="roleIds">
        <el-tree-select style="width: 100%" show-checkbox placeholder="请选择数据权限" v-model="roleIds"
                        :data="treeData.data" multiple :render-after-expand="false"/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-show="dialogFormType != 'check'" type="primary" @click="submitDialogForm()">
                    提交
                </el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import axios from 'axios'
import {defineComponent, reactive, ref, toRefs} from 'vue'
import {ElMessage, ElMessageBox, ElLoading} from 'element-plus'
import router from '~/router/router'
import {SearchFormData} from '~/types/li/index'
import {addUser, deleteUser, getTreeData, getUser, listUsers, queryFcode} from "~/request/li";

export default defineComponent({
  setup() {
    const hasAuthority = ref(false)
    const searchForm = reactive(new SearchFormData())

    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    const dialogForm = ref({
      fcode: '',
      fname: '',
      id: ''
    })

    const dialogFormRules = reactive({
      fcode: [
        {
          required: true,
          message: "请输入工号",
          trigger: "blur"
        },
      ],
      roleIds: [
        {
          required: true,
          message: "请选择数据权限",
          trigger: "blur"
        }
      ]
    })

    const dialogFormVisible = ref(false)
    const dialogFormType = ref('add')

    const tableUserData: any = reactive({
      data: []
    })

    const treeData: any = reactive({
      data: []
    })
    const roleIds: any = ref([])

    return {
      ...toRefs(searchForm),
      tableUserData,
      dialogFormVisible,
      dialogForm,
      dialogFormType,
      treeData,
      roleIds,
      loading,
      hasAuthority,
      dialogFormRules
    }

  },

  mounted() {
    this.judgeAuthority()
    this.updateTableData()
    this.updateTreeData()
  },

  methods: {
    updateTableData() {
      listUsers(this.searchForm.fcode, this.searchForm.fname).then((resp) => {
        this.tableUserData.data = resp.data
        this.loading.close()
      })
    },

    updateTreeData() {
      getTreeData().then((resp) => {
        this.treeData.data = resp.data
      })
    },

    handleFcodeSelect(data: any) {
      this.dialogForm.fcode = data.fcode
      this.dialogForm.fname = data.fname
    },

    queryFcodeAsync(queryStr: string, cb: (arg: any) => void) {
      queryFcode(queryStr).then(resp => {
        cb(resp.data)
      })
    },

    submitDialogForm() {
      this.loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.dialogFormVisible = false
      let roleIds = this.roleIds.join(",")
      let data = {
        roleIds: roleIds,
        fcode: this.dialogForm.fcode,
        fname: this.dialogForm.fname,
        id: this.dialogForm.id
      }

      addUser(data).then(resp => {
        this.loading.close()
        this.updateTableData()
        ElMessage({
          message: resp.data,
          type: 'success'
        })
      })

    },

    handleCheck(row: any) {
      this.dialogFormVisible = true
      this.dialogFormType = 'check'

      getUser(row.id).then((resp) => {
        this.dialogForm.fcode = row.account
        this.dialogForm.fname = row.name
        this.roleIds = resp.data
      })
    },

    handleUpdate(row: any) {
      this.dialogFormVisible = true
      this.dialogFormType = 'update'
      getUser(row.id).then((resp) => {
        this.dialogForm.fcode = row.account
        this.dialogForm.fname = row.name
        this.dialogForm.id = row.id
        this.roleIds = resp.data
      })
    },

    handleDelete(row: any) {
      ElMessageBox.confirm(
          '确认删除?',
          '提示信息',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        deleteUser(row.id).then((resp) => {
          this.updateTableData()
          ElMessage({
            message: resp.data,
            type: 'success'
          })
        }).catch(() => {
          ElMessage({
            type: 'error',
            message: '删除失败',
          })
        })
      })

    },

    judgeAuthority() {
      axios.get(`http://10.1.1.34:9998/eveDl/operation/li/judgeAdminByFcode?fcode=${router.currentRoute.value.query.account}`)
          .then((resp) => {
            if (!resp.data.data) {
              window.location.href = "/fr403.html"
            }
            this.hasAuthority = true
          }).catch(() => {
        window.location.href = "/fr403.html"
      })
    }


  }
})
</script>

<style scoped>
.search-row {
  margin-top: 1rem;

}
</style>
