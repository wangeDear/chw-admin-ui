<template>
    <div class="common-layout">

        <el-container style="height: 100vh">
            <el-container>
                <el-header style="background-color: #ffffff">
                    <el-row style="height: 60px;" align="middle">
                        <el-col :span="6" :offset="4" style="height: 1.6rem; width: 60px">
                            <HomeFilled style="width: 1.6em; height: 1.6em; color: #17bfa0;" />
                            <Collection style="width: 1.6em; height: 1.6em; margin-left: 5rem;" />
                            <Plus style="width: 1.6em; height: 1.6em; margin-left: 5rem;" />
                        </el-col>

                        <el-col :span="1" :offset="9" style="height: 1.6rem; width: 60px">
                            <UserFilled style="width: 1.6em; height: 1.6em; color: #17bfa0;" />
                        </el-col>

                    </el-row>

                </el-header>
                <el-main>

                    <el-container style="width: 90%;padding-left: 10%">

                        <el-aside style="padding-top: 20px">

                            <el-card>
                                <template #header>
                                    <div class="card-header">
                                        <b>今日待学</b>
                                    </div>
                                </template>
                                <el-row>
                                    <el-col :span="8">
                                        <b>4</b>
                                        <span>新卡</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <b>0</b>
                                        <span>待复习</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <b>1</b>
                                        <span>预计耗时(分)</span>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-aside>

                        <el-main>
                            <el-row>
                                <el-col>
                                    <el-card shadow="hover"> Hover </el-card>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col>
                                    <el-card shadow="hover"> Hover </el-card>
                                </el-col>
                            </el-row>
                        </el-main>
                    </el-container>







                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import {
    Location,
    Document,
    Menu as IconMenu,
    Setting,
    HomeFilled,
    Collection,
    Plus,
    UserFilled
} from '@element-plus/icons-vue'

export default defineComponent({
    name: 'home',
    components: {
        Location,
        Setting,
        Document,
        IconMenu,
        HomeFilled,
        Collection,
        Plus,
        UserFilled
    },
    setup() {

    },
})
</script>

<style scoped>
.el-main .el-row {
    /* margin-top: 20px */
}

.common-layout {
    background-color: #f4f4f4;
}
</style>
  