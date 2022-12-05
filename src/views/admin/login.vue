<template>

  <div class="common-layout">
    <el-container class="main-container">
      <el-main>
        <el-row>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-form :model="loginForm">
                <el-form-item label="账号">
                  <el-input v-model="loginForm.username" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input type="password" v-model="loginForm.password" />
                </el-form-item>

                <el-button v-on:click="login" type="primary">登录</el-button>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
          </el-col>
        </el-row>


      </el-main>
      <el-footer>Awoo@2022</el-footer>
    </el-container>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import router from '~/router/router';

export default defineComponent({
  name: 'login',
  setup() {
    const loginForm = reactive({
      username: '',
      password: ''
    })

    const login = () => {
      router.push('/admin')
    }

    return {
      loginForm,
      login
    }
  },
})
</script>

  
<style>
.main-container {
  padding: 20px 20px 10px 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  height: 200px;
  padding: 60px 20px 10px 10px;
}
</style>
  