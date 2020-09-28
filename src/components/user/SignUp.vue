<template>
    <div>
        <!-- <div><h1>처리 중...</h1></div> -->
        <div id="join" class="container p-3">
            <h1>SingUp</h1>
        <template v-if="isProcess==true">
            <div class="alert alert-danger">
                <h3 class='text-primary'>회원 가입 처리 중...</h3>
            </div>
        </template>
        <template v-if="isJoinFail">
            <div class="alert alert-danger">
                <h3 class='text-primary'>회원 가입 실패</h3>
                <h4 class='text-danger'>아이디 중복여부를 체크하세요</h4>
            </div>
        </template>
            <form name="frm" action="join.jsp" method="POST" @submit.prevent="send()"> <!--  @submit.prevent= submit을 막음 -->
        <div class="row">    
            <div class="col-md-6 offset-md-3">
			
            Name: <input type="text" name="userName" v-model="user.name"
             placeholder="Nick Name" class="form-control"> 

            
            </div>
        </div>
        <div class="row">    
            <div class="col-md-6 offset-md-3">
			
            Nick Name: <input type="text" name="userNick" @input="checkNick" v-model="user.nick"
             placeholder="User ID" class="form-control"> 
    
            <div  class="text-danger" v-if="nickErr">아이디는 4자이상 6자 이하 입니다.</div>
            </div>
        </div>
        <div class="row"> 
            <div class="col-md-6 offset-md-3">
                PASSWORD: <input type="text" name="userPwd" v-model="user.pwd"
                @input="checkPwd"
                placeholder="Password" class="form-control">    
                <div class="text-danger" v-if="pwdErr">비밀번호는 4자 이상 8자 이내입니다.</div>
            </div>
        </div>
        <div class="row"> 
            <div class="col-md-6 offset-md-3">
                    PASSWORD Confirm :
                <input type="text" name="userPwd" placeholder="Password Confirm" class="form-control" @input="checkRePwd">    
                <div class="text-danger" v-if="pwdErr2">비밀번호가 일치하지 않아요</div>
            </div>       
        </div> 
        <div class="row"> 
                <div class="col-md-6 offset-md-3">
                        Tel :
                    <input type="text" name="userTel" placeholder="Phone" class="form-control" v-model="user.tel">    
                </div>       
            </div> 
        <div class="row"> 
                <div class="col-md-6 offset-md-3">
                        Address :
                    <input type="text" name="userAddr" placeholder="Address" class="form-control">    
                </div>       
            </div>     
        <div class="row  m-2">
                <div class="col-md-6 offset-md-3 p-1">
                    <button class="btn btn-block btn-outline-success">Signup</buttoN>
                </div>
        </div>

        <div class="row m-5">
            <div class="col-md-6 offset-md-3">

            </div>
			
        </div>
        </form>
    </div>    
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            user:{
                name:'',
                nick:'',
                pwd:'',
                tel:''
            },
            nickErr:false,
            pwdErr:false,
            pwdErr2:false,
            isProcess:false, //회원가입 처리 진행중일 때 true, 처리 완료되면 false
            isJoinFail:false //회원가입 처리 실패시 true
        }
    },//data end
    methods:{
        checkNick(evt){
           // console.log(evt.target.value)
           //let nick=evt.target.value;
           //console.log(nick)
           let nick=evt.target.value;
           let len=nick.length;
           if(len<4||len>6){
               this.nickErr =true;
           }else{
               this.nickErr =false;
           }
        },
        checkPwd(evt){
            let len=evt.target.value.length;
            this.pwdErr =(len<4||len>8)? true:false;
        },
        checkRePwd(evt){
            let pw2=evt.target.value;
            if(this.user.pwd!=pw2){
                this.pwdErr2=true;
            }else{
                this.pwdErr2=false;
            }
        },
        send(){
            //ajax요청
            if(!this.nickErr && !this.pwdErr && !this.pwdErr2){
                this.isProcess=true;
                let vm=this;

                let params=new URLSearchParams(); //json형태 {파라미터명1=값1&파라미터명2=값2} URLSearchParams() = json형태로 만들어주는 함수
                params.append('name',this.user.name);
                params.append('nick',this.user.nick);
                params.append('pwd',this.user.pwd);
                params.append('tel',this.user.tel);
                let url="http://localhost:9090/VueServer/member/userAdd.jsp"; //백엔드에서 실행된 서버 도메인을 가져온다.
                //let url="/api/member/userAdd.jsp" //vue.config.js에 /api에 대한 요청 proxy설정함 
                //let url="/join.json?"+params;

                //axios.get('join.json?'+params)
                axios.post(url, params)
                    .then(function(res){
                        vm.isProcess=false; //회원가입 처리 프로세스 완료
                        //alert(res.data.result);
                        let n=parseInt(res.data.result);
                        vm.isJoinFail=(n>0)?false:true;
                        if(n>0){
                            //회원가입을 성공했다면 로그인 페이지로 넘어가자
                            vm.$router.push('/login')
                        }
                    })
                    .catch(function(err){
                        vm.isProcess=false;//회원가입 처리완료
                        vm.isJoinFail=true;//회원가입 실패
                        alert('error='+err.message); 
                    })
            }
        }//send() end----------------
    }
    
}

</script>