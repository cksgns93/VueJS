<template>
    <div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        created(){
            let url="http://localhost:9090/VueServer/member/logout.jsp"
            axios.get(url)
                .then((res)=>{
                    console.log(JSON.stringify(res.data))
                })
                .catch((err)=>{
                    alert('error: '+err.message);
                })

            //sessionStorage.removeItem('idx');  세션 개별삭제
            sessionStorage.clear();  //세션 전체 삭제
            this.$emit('login-result',null);
            this.$router.push('/');
        }
    }
</script>

<style lang="scss" scoped>

</style>