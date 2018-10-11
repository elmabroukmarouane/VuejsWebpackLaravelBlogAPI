<template>
    <!--Start topbar header-->
  <header class="topbar-nav">
  <nav class="navbar navbar-expand fixed-top bg-white">
    <ul class="navbar-nav mr-auto align-items-center">
      <li class="nav-item">
        <a class="nav-link toggle-menu" href="javascript:void();">
        <i class="icon-menu menu-icon"></i>
      </a>
      </li>
    </ul>
    <ul class="navbar-nav align-items-center right-nav-link">
      <li class="nav-item">
        <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#" id="logout_dropdown">
          <span class="user-profile"><img :src="this.$store.state.user.image" class="img-circle" :alt="this.$store.state.user.name"></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
        <li class="dropdown-item user-details">
          <a href="javaScript:void()">
            <div class="media">
              <div class="avatar"><img class="align-self-start mr-3" :src="this.$store.state.user.image" :alt="this.$store.state.user.name"></div>
              <div class="media-body">
              <h6 class="mt-2 user-title">{{ this.$store.state.user.name }}</h6>
              </div>
            </div>
            </a>
          </li>
          <li class="dropdown-divider"></li>
          <li class="dropdown-item" id="logout_ahref"><a @click="showModalLogout()" href="javascript:void();"><i class="icon-power mr-2"></i> Logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
  </header>
  <!--End topbar header-->
</template>

<script>
/* eslint-disable */
export default {
  name: 'TopMenu',
  mounted() {
    this.initComponentJQuery();
  },
  methods: {
    initComponentJQuery() {

      $(function () {
        "use strict";

        $.sidebarMenu = function (menu) {
          var animationSpeed = 300,
            subMenuSelector = '.sidebar-submenu';
          $(menu).on('click', 'li a', function (e) {
            var $this = $(this);
            var checkElement = $this.next();
            if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
              checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
              });
              checkElement.parent("li").removeClass("active");
            }
            //If the menu is not visible
            else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
              //Get the parent menu
              var parent = $this.parents('ul').first();
              //Close all open menus within the parent
              var ul = parent.find('ul:visible').slideUp(animationSpeed);
              //Remove the menu-open class from the parent
              ul.removeClass('menu-open');
              //Get the parent li
              var parent_li = $this.parent("li");
              //Open the target menu and add the menu-open class
              checkElement.slideDown(animationSpeed, function () {
                //Add the class active to the parent li
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
              });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is(subMenuSelector)) {
              e.preventDefault();
            }
          });
        }

        //sidebar menu js
        $.sidebarMenu($('.sidebar-menu'));

        // === toggle-menu js

        $(".toggle-menu").on("click", function (e) {
          e.preventDefault();
          $("#wrapper").toggleClass("toggled");
        });


        // === sidebar menu activation js

        $(function () {
          for (var i = window.location, o = $(".sidebar-menu a").filter(function () {
            return this.href == i;
          }).addClass("active").parent().addClass("active"); ;) {
            if (!o.is("li")) break;
            o = o.parent().addClass("in").parent().addClass("active");
          }
        }),

          /* Back To Top */

          $(document).ready(function () {
            $(window).on("scroll", function () {
              if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn();
              } else {
                $('.back-to-top').fadeOut();
              }
            });
            $('.back-to-top').on("click", function () {
              $("html, body").animate({ scrollTop: 0 }, 600);
              return false;
            });
          });

        $(function () {
          $('[data-toggle="popover"]').popover()
        })


        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })



      });
    },
    showModalLogout() {
      $('#logout-modal').modal('show');
    }
  }
}
</script>

<style>
#logout_ahref:active {
  background-color: transparent;
}
</style>
