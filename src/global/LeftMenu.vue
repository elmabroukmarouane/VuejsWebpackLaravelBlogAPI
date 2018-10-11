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
        <li :class="[$route.name == 'Posts List' ? 'active':'']">
          <a href="javascript:void(0)" class="waves-effect" @click="$router.push({ path: '/home' })">
            <i class="fa fa-sticky-note-o"></i> <span>Posts</span>
          </a>
        </li>
        <li :class="[($route.name == 'Posts Management' || $route.name == 'Users Management') ? 'active':'']" v-if="this.$store.state.user.user_role == 'super_admin'">
          <a href="javascrip:void(0)" class="waves-effect">
            <i class="fa fa-gears"></i> <span>Configurations</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li :class="[($route.name == 'Posts Management') ? 'active':'']"><a href="javascript:void(0)" @click="$router.push({ path: '/posts' })"><i class="fa fa-sticky-note-o"></i> Posts Management</a></li>
            <li :class="[$route.name == 'Users Management' ? 'active':'']"><a href="javascript:void(0)" @click="$router.push({ path: '/users' })"><i class="fa fa-users"></i> Users Management</a></li>
          </ul>
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
