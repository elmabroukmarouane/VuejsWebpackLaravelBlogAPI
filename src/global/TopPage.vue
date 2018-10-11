<template>
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
          <div class="col-sm-12">
            <h4 class="page-title">{{ $route.name }}</h4>
          </div>
      </div>
      <!-- End Breadcrumb-->
        <hr>
        <ContentPage/>
      </div>
      <!-- End container-fluid-->
</template>

<script>
/* eslint-disable */
  import ContentPage from './ContentPage.vue'
  export default {
    components: {
      ContentPage
    }
  }
</script>
