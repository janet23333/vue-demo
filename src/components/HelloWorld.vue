<template>
    <el-row class="container">
      <el-col :span="4">
         menu
      </el-col>
    <el-button type="success" >logout</el-button>
      <el-col :span="20">
         <h1>{{ msg }}</h1>
        <el-form>
          <el-form-item>
          <span> 请输入,回车键发送</span>
          <el-input v-model="input"  @keyup.enter.native="interactive_response"></el-input>
          </el-form-item>
        <el-form-item>
          服务器返回
          <el-input v-model="response"></el-input>
        </el-form-item>

        </el-form>
      </el-col>
     
     
    </el-row>
  
</template>

<script>
import { HelloWorldTest } from "@/api/hello_world";
import request from "@/utils/requests";
export default {
  name: "HelloWorld",
  data() {
    return {
      input: "",
      response: "",
      msg: "Welcome to Your Vue.js App deiwp"
    };
  },
  methods: {
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          // sessionStorage.removeItem('user');
          _this.$router.push("/");
        })
        .catch(() => {});
    },
    interactive_response() {
      request
        .get(HelloWorldTest, { input: this.input })
        .then(res => {
          this.response = res.res.text;
        })
        .catch(err => {
          console.log("err: ", err);
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
