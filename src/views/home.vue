<template>
<!--  <router-view name="nav"></router-view>-->
  <div class="common-layout">
    <el-container>
      <el-header>后台管理系统</el-header>
      <el-container>
        <el-aside width="16%">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                router
            >
              <el-menu-item v-for="item in menuList" :index="item.path" :key="item.path">
                <span>{{item.meta.title}}</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import router from "~/router/router";
const menuList = router.getRoutes().filter((v) => v.meta.isShow);
</script>

<style scoped>
.el-aside{
  height: 100vh;
}
.el-menu{
  height: 100vh;
}
.el-header{
  line-height: 80px;
}
</style>