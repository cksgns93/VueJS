<template>
  <div id="app" class="container">
    <header-comp></header-comp>
    <nav-comp v-bind:userstatus="status"></nav-comp>
    <div class="row p-4">
      <div class="col-md-12">
        <router-view v-on:login-result="loginStatus"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import NavComp from './components/NavComp.vue'
export default {
  name: 'App',
  components: {
    'header-comp':HeaderComp,
    NavComp
  },
  data(){
    return{
      status:'',
      isLogin:false,
      loginUser:{
        nick:''
      }
    }
  },
  methods:{
    loginStatus:function(nick){
      //alert(nick);
      if(nick!='' && nick!=null && nick!=undefined){
        this.isLogin=true;
        this.status =nick+"님 로그인 중..."
        this.loginUser.nick=nick;
        sessionStorage.setItem('isLogin', true);
      }else{
        this.isLogin=false;
        this.status='';
        this.loginUser.nick='';
        sessionStorage.setItem('isLogin',false);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
