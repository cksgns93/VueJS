<template>
    <div class="container p-5">
        <h1>Login</h1>
                <div class="text-danger"> </div>
        <form name="loginF" action="login.jsp" v-on:submit.prevent="loginCheck">
        <div class="row">    
            <div class="col-md-6 offset-md-3">
                
                User NICK: <input type="text" name="nick" ref="nick" v-model="tmpUser.nick"
                placeholder="User ID Name" class="form-control" >    
            </div>
        </div>
        <div class="row"> 
            <div class="col-md-6 offset-md-3">
                PASSWORD: <input type="password" name="pwd" ref="pwd" v-model="tmpUser.pwd"
                placeholder="Password" class="form-control">    
            </div>
        </div>
        <div class="col-md-6 offset-md-3 p-1">
                <button class="btn btn-block btn-primary mt-3">Login</button>
        </div>        
        </form>    
    </div>
</template>

<script>
    import axios from 'axios'; //ajax요청하기 위한 axios 객체 가져오기
    //import eventBus from '../../EventBus.js';
    export default {
        data(){
            return{
                tmpUser:{ //로그인을 시도한 사람의 닉과 비번을 담을 변수
                    nick:'',
                    pwd:''
                },
                user:{//로그인한 사람의 정보를 담을 변수
                    idx:'',
                    name:'',
                    nick:'',
                },
                msg:'',
                isLoginProcess:false,
                isLoginFail:false ,
                isLogin:true
            }   
        },//data() end
        methods:{
            loginCheck(){
                //유효성 체크
                if(!this.tmpUser.nick){
                    alert('닉네임을 입력하세요');
                    this.$refs.nick.focus();
                    return;
                }
                if(!this.tmpUser.pwd){
                    alert('비밀번호를 입력하세요');
                    this.$refs.pwd.focus();
                    return;
                }
                this.requestLogin()
            },
            requestLogin(){
                let url="http://localhost:9090/VueServer/member/loginCheck.jsp";
                let params=new URLSearchParams();
                params.append("nick",this.tmpUser.nick);
                params.append("pwd",this.tmpUser.pwd);
                axios.post(url,params)
                    .then((res)=>{
                        //alert(JSON.stringify(res.data.user));
                        if(!res.data.user.idx){
                            alert('아이디와 비밀번호가 일치하지 않아요');
                            this.$refs.nick.focus();
                            this.tmpUser.nick='';
                            this.tmpUser.pwd='';
                            this.isLoginFail=true;
                            this.isLogin=false;
                            this.user={idx:'',name:'',nick:''}
                        }else{
                            this.user=res.data.user;

                            sessionStorage.setItem('name',this.user.name); //세션에 로그인 정보 담음
                            sessionStorage.setItem('nick',this.user.nick);
                            sessionStorage.setItem('idx',this.user.idx);

                            this.isLoginFail=false;
                            this.isLogin=true;
                            //eventBus.$emit('login-result', this.user.nick); //이벤트를 발생시킴
                            this.$emit('login-result',this.user.nick);
                            this.$router.push('/')
                        }
                    })
                    .catch((err)=>{
                        alert("error: "+err.message);
                    })

            }
        }
    }

</script>

<style lang="scss" scoped>

</style>