// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './http'

window.Event = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
/* eslint-disable */
new Vue({
    el: '#app',
    router,
    store,
    http,
    mounted() {
        this.getStoreData()
    },
    created() {
        Event.$on('logout-app', () => {
            this.logoutApp();
        });
        Event.$on('show-modal-normal', (modalid) => {
            this.showModalNormal(modalid);
        });
        Event.$on('hide-modal-normal', (modalid) => {
            this.hideModalNormal(modalid);
        });
        Event.$on('swal-message', (title, message, icon, timer) => {
            this.sweetAlertMessage(title, message, icon, timer);
        });
    },
    methods: {
        getStoreData() {
            /* this.$store.dispatch('LOAD_POSTS_LIST') */
            this.$store.dispatch('LOAD_USERS_LIST')
        },
        showModalNormal(modalid) {
            $("#" + modalid).modal("show");
        },
        hideModalNormal(modalid) {
            $("#" + modalid).modal("hide");
        },
        logoutApp() {
            $('#logout-modal').modal('hide');
            http.get('logout', this.$store.state.headers)
                .then(() => {
                    let user = {}
                    this.$store.commit('SET_USER', user)
                    this.$router.push({
                        path: '/auth/login'
                    })
                });
        },
        sweetAlertMessage(title, message, icon, timer) {
            swal({
                title: title,
                text: message,
                icon: icon,
                timer: timer
            });
        }
    },
    components: {
        App
    },
    template: '<App/>'
})