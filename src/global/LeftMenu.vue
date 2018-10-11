<template>
    <!--Start sidebar-wrapper-->
    <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
      <div class="brand-logo">
        <a href="javascript:void(0)">
        <img src="/static/assets/images/logo-icon.png" class="logo-icon" alt="logo icon">
        <h5 class="logo-text">Vue.js Blog API</h5>
      </a>
    </div>
    <ul class="sidebar-menu do-nicescrol">
        <li class="sidebar-header">MENU BLOG</li>
        <li :class="[$route.name == 'Home' ? 'active':'']">
          <a href="javascript:void(0)" class="waves-effect" @click="$router.push({ path: '/home' })">
            <i class="fa fa-sticky-note-o"></i> <span>Posts</span>
          </a>
        </li>
      </ul>
    </div>
    <!--End sidebar-wrapper-->
</template>

<script>
export default {
  name: 'LeftMenu'
}
</script>
