<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
  .container {
    width: 980px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0 0 15px;
  }

  .animated {
    transition: all .4s;
  }

  .md-tabs {
    width: 100%;
  }

  .md-content.md-tabs-content {
    border: 1px solid #448aff;
    transition: height 0.5s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  .fade-leave-active {
    position: absolute;
  }
</style>
