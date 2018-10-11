<template>
    <!--Start footer-->
    <footer class='footer'>
        <div class='container'>
          <div class='text-center'>
            <p class='footer-text'>{{ this.date_now | moment }} - Vue.js Webpack Laravel REST API Blog by <a href='mailto:elmabroukmarouane@gmail.com'>Marouane EL MABROUK</a>.</p>
          </div>
        </div>
      </footer>
    <!--End footer-->
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      date_now: new Date()
    }
  },
  methods: {
    moment: function () {
      return moment()
    }
  },
  filters: {
    moment: function (date) {
      if (moment(date).format('YYYY') !== '2018') {
        return '2018 - ' + moment(date).format('YYYY')
      }
      return moment(date).format('YYYY')
    }
  }
}
</script>
