<template>
    <nav class="navbar navbar-expand-sm bg-warning navbar-dark">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
        
      <li class="nav-item">
          <router-link to="/" class="nav-link">HOME</router-link>
        <!-- <a class="nav-link" href="#">HOME</a> -->
      </li>
      <li class="nav-item">
         <router-link to="#" v-if="userstatus!=''" class="nav-link  text-success">{{userstatus}}님 로그인중...</router-link>
      </li>   
      <li class="nav-item">
         <router-link to="/login" v-if="userstatus==''" class="nav-link">Login</router-link>
         <router-link to="/logout" v-else class="nav-link">Logout </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/signup" class="nav-link">SignUp</router-link>
      </li>    
      <li class="nav-item">
        <router-link to="/users" class="nav-link">Users</router-link>
      </li>    
    </ul>
  </div>  

</nav>
</template>

<script>
export default {
    props:['userstatus']
}
</script>