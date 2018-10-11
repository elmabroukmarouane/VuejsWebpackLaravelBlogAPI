<template>
  <!-- Start wrapper-->
  <div id="wrapper">
    <LeftMenu/>
    <TopMenu/>
    <div class="clearfix"></div>
    <div class="content-wrapper">
      <TopPage/>
    </div><!--End content-wrapper-->
    <BackToTop/>
    <Footer/>
    <ModalLogout/>
  </div>
  <!--End wrapper-->
</template>

<script>
/* eslint-disable */
import LeftMenu from '../global/LeftMenu.vue'
import TopMenu from '../global/TopMenu.vue'
import TopPage from '../global/TopPage.vue'
import BackToTop from '../global/BackToTop.vue'
import Footer from '../global/Footer.vue'
import ModalLogout from '../global/ModalLogout.vue'
export default {
  components: {
    LeftMenu,
    TopMenu,
    TopPage,
    BackToTop,
    Footer,
    ModalLogout
  }
}
</script>
