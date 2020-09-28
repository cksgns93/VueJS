<template>
    <div class="container">
        <h1 class="text-primary text-center m-5">User List</h1>
        <table class="table">
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>닉네임</th>
                <th>연락처</th>
                <th>가입일</th>
            </tr>
            <tr v-for="user in userList" :key="user.idx">
                <td> {{user.idx}}</td>
                <td> {{user.name}} </td>
                <td> {{user.nick}} </td>
                <td> {{user.tel}} </td>
                <td> {{user.indate}} </td>
            </tr>
        </table>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        created(){
          let url="http://localhost:9090/VueServer/member/userAll.jsp";
          axios.get(url)
            .then((res)=>{
                //alert(JSON.stringify(res.data));
                this.userList =res.data.users;
            })
            .catch((err)=>{
                alert('error: '+err.message);
            })
        },
        data(){
            return{
                userList:[]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>