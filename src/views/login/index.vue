// 用户登录
<template>
  <div class="sykj-login_wrap justify-content_center">
    <h2>{{ constant.TITLE }}</h2>
    <el-col
      :span="6"
      style="
        background: #fff;
        padding: 2.2rem 70px 1rem 0;
        margin-bottom: 12rem;
      "
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-tooltip
            class="item"
            effect="dark"
            content="账号: admin或user或lawyer; 密码: 随意非空"
            placement="top-start"
          >
            <el-button>账号</el-button>
          </el-tooltip>
        </el-form-item>

        <el-form-item>
          <el-input type="color" v-model="ruleForm.color" @change="changeSkin"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <copy-right></copy-right> -->
  </div>
</template>
<style
  lang="scss"
  scoped
>
.sykj-login_wrap {
  @include flex-column;
  width: 100%;
  align-items: center;
  height: 100%;
  @include skin;
}
</style>
<script>
import CopyRight from "@/components/copyright/index";
import constant from "../../constant";
import { SET_USERINFO_ACTION } from "@/store/userInfo/type";
import { SET_DYNAMICROUTE_ACTION } from "@/store/route/type";

export default {
  name: "Login",
  components: {
    "copy-right": CopyRight
  },
  data() {
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
      // setTimeout(() => {
      //   if (!Number.isInteger(value)) {
      //     callback(new Error('请输入数字值'));
      //   } else {
      //     if (value < 18) {
      //       callback(new Error('必须年满18岁'));
      //     } else {
      //       callback();
      //     }
      //   }
      // }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        // checkPass: '',
        account: "",
        color: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        account: [{ validator: checkAccount, trigger: "blur" }]
      },
      constant
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const map = {
              user: "user",
              lawyer: "lawyer",
              admin: "admin",
              vistor: "vistor"
            },
            account = this.ruleForm.account;

          // 模拟登录
          const userInfo = await {
            isAdmin: map[account] == "admin",
            role: map[account] || "vistor",
            name: map[account],
            token: "asdqjweq123"
          };

          await this.$store.dispatch(
            SET_USERINFO_ACTION,
            Object.freeze(userInfo)
          );
          // 模拟请求权限信息
          await this.$store.dispatch(SET_DYNAMICROUTE_ACTION, userInfo);

          const redirect = function() {
            const routes = {
              admin: "/layout/welcome",
              user: "/layout/welcome",
              lawyer: "/layout/welcome",
              vistor: "/layout/welcome"
            };

            this.$router
              .push({ path: routes[userInfo.role] })
              .catch(err => console.log(err, "err"));
          };

          // token过期登录后重定向到过期页
          const path = this.$route.query.redirect;
          if (path) return this.$router.replace({ path });
          // 正常登录跳转
          redirect.call(this);
        } else {
          this.$notify({
            title: "提示",
            message: "登录失败",
            type: "error",
            duration: 800
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeSkin() {
      // const skin = document.documentElement.getAttribute("data-skin");
      // const newSkin = skin === "default-skin" ? "second-skin" : "default-skin";
      // document.documentElement.setAttribute("data-skin", newSkin);

      document
        .querySelector(":root")
        .style.setProperty("--default-background-color", this.ruleForm.color);
    }
  }
};
</script>
