<template>
    <!-- Begin Modal Logout -->
    <ModalLogoutPart id="logout-modal">
        <div slot="header_modal" class="modal-header">
            <h5 class="modal-title"><i class="fa fa-power-off"></i> Logout !</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div slot="body_modal" class="modal-body">
            <p>Are you sure that you want to exit the application ?</p>
        </div>
        <div slot="footer_modal" class="modal-footer">
            <button type="button" class="btn btn-success" data-dismiss="modal">Nope :D !</button>
            <button @click="logout()" type="button" class="btn btn-danger">Yeah, I'm sure :'( !</button>
        </div>
    </ModalLogoutPart>
</template>

<script>
/* eslint-disable */
import ModalLogoutPart from '../parts/modals/ModalLogoutPart.vue'
export default {
    name: 'ModalLogout',
    components: {
        ModalLogoutPart
    },
    mounted() { },
    methods: {
        logout() {
            Event.$emit("logout-app");
        }
    }
};
</script>
