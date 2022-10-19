<template>
  <div id="app">

      <router-link to="/index/home"></router-link>
      
    <keep-alive>
     <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    
   <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style scoped>



</style>
