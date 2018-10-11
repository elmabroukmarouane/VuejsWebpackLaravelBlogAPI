<template>
  <div>
    <div class="row p-3">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdown_action_users">
                    Actions
                  </button>
                  <div class="dropdown-menu">
                    <button @click="initAdduser()" type="button" class="dropdown-item" style="cursor:pointer;"><i class="fa fa-plus"></i> ADD USER</button>
                    <div class="dropdown-divider"></div>
                    <button @click="refreshTable()" type="button" class="dropdown-item" style="cursor:pointer;"><i class="fa fa-refresh"></i> REFRESH TABLE</button>
                  </div>
                </div>
        </div>
    <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><i class="fa fa-table"></i> Users List</div>
            <div class="card-body">
                <div class="table-responsive">
                    <DataTablePart id="users_list" :list_datatable_fields="list_datatable_fields">
                        <tr slot="tbody_tr_table" v-for="(user, index) in users" v-if="users.length > 0" :key="index">
                            <td>{{ user.name }}</td>
                            <td>{{ user.birthdate | moment }}</td>
                            <td><a :href="user.email">{{ user.email }}</a></td>
                            <td>
                              <a :href="user.image" data-fancybox="images" :data-caption="user.name">
                                    <img :src="user.image" :alt="user.name" class="lightbox-thumb img-thumbnail img-responsive">
                                </a>
                              </td>
                            <td>
                                <button @click="initUpdateUser(index)" type="button" class="btn btn-warning waves-effect waves-light m-1"><i class="fa fa-edit"></i></button>
                                <button @click="removeUser(index)" type="button" class="btn btn-danger waves-effect waves-light m-1"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    </DataTablePart>
                </div>
            </div>
          </div>
        </div>
        <ModalPart id="add-modal">
            <div slot="header_modal" class="modal-header">
                <h5 class="modal-title"><i class="fa fa-plus"></i> Add User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div slot="body_modal" class="modal-body">
                <form id="add_user_form" method="post" action="javascript:void(0)">
                    <div class="form-group row">
                        <label for="add_user_name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="addUser()" v-model="user.name" type="text" class="form-control" id="add_user_name" name="add_user_name" placeholder="Name"  required>
                        </div>
                    </div>
                    <div class="form-group row">
                      <label for="add_user_birthdate" class="col-sm-2 col-form-label">Birthdate</label>
                        <div class="col-sm-10">
                            <datepicker v-on:keyup.enter="addUser()" v-model="user.birthdate" input-class="form-control" placeholder="Click here !" format="dd/MM/yyyy" :language="fr" name="add_user_birthdate" id="add_user_birthdate"></datepicker>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="add_user_email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="addUser()" v-model="user.email" type="email" name="add_user_email" id="add_user_email" class="form-control" placeholder="E-mail address" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="add_user_password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="addUser()" v-model="user.password" type="password" name="add_user_password" id="add_user_password" class="form-control" placeholder="Password" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="add_user_role" class="col-sm-2 col-form-label">Role</label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model="user.user_role" id="add_user_role" required>
                                <option value="super_admin">Super Administrator</option>
                                <option value="user" selected>User</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">CANCEL</button>
                        <button @click="addUser()" type="submit" class="btn btn-success">ADD</button>
                    </div>
                </form>
            </div>
        </ModalPart>
        <ModalPart id="update-modal">
            <div slot="header_modal" class="modal-header">
                <h5 class="modal-title"><i class="fa fa-edit"></i> Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div slot="body_modal" class="modal-body">
                <form id="update_user_form" method="post" action="javascript:void(0)">
                    <div class="form-group row">
                        <label for="update_user_name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="updateUser()" v-model="user_update.name" type="text" class="form-control" id="update_user_name" name="update_user_name" placeholder="Name" required>
                        </div>
                    </div>
                    <div class="form-group row">
                      <label for="update_user_birthdate" class="col-sm-2 col-form-label">Birthdate</label>
                        <div class="col-sm-10">
                            <datepicker v-on:keyup.enter="updateUser()" v-model="user_update.birthdate" input-class="form-control" placeholder="Click here !" format="dd/MM/yyyy" :language="fr" name="update_user_birthdate" id="add_user_birthdate"></datepicker>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="update_user_email" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="updateUser()" v-model="user_update.email" type="email" name="update_user_email" id="update_user_email" class="form-control" placeholder="E-mail address" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="update_user_password" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input v-on:keyup.enter="updateUser()" v-model="user_update.password" type="password" name="update_user_password" id="update_user_password" class="form-control" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="update_user_role" class="col-sm-2 col-form-label">Role</label>
                        <div class="col-sm-10">
                            <select class="form-control" v-model="user_update.user_role" name="update_user_role" id="update_user_role" required>
                                <option value="super_admin">Super Administrator</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">CANCEL</button>
                        <button @click="updateUser()" type="submit" class="btn btn-success">UPDATE</button>
                    </div>
                </form>
            </div>
        </ModalPart>
      </div><!-- End Row-->
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import JQuery from 'jquery'
/* import select2 from 'select2/dist/js/select2' */
import 'jquery-validation'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
import fr from 'vuejs-datepicker/dist/locale/translations/fr'
import ModalPart from '../../parts/modals/Modal'
import DataTablePart from '../../parts/tables/DataTable'
import http from '../../http/'
let $ = JQuery
export default {
  components: {
    ModalPart,
    DataTablePart,
    Datepicker
  },
  data() {
    return {
      user: {
        name: "",
        birthdate: "",
        email: "",
        password: "",
        user_role: ""
      },
      user_update: {},
      list_datatable_fields: ["Name", "Birthdate", "Email", 'Image', "Actions"],
      users: [],
      fr: fr
    };
  },
  mounted() {
    this.init_components_forms();
    this.getUsers();
  },
  methods: {
    init_components_forms() {
      $("#add_user_form").validate({
        rules: {
          add_user_name: 'required',
          add_user_birthdate: {
            required: true,
            date: true
          },
          add_user_email: {
            required: true,
            email: true
          },
          add_user_password: {
            required: true,
            minlength: 6
          },
          add_user_role: 'required'
        },
        messages: {
          add_user_name: 'Please enter the name',
          add_user_birthdate: {
            required: 'Please enter your birthdate',
            date: 'Please enter a valid date'
          },
          add_user_email: {
            required: 'Please enter your email address',
            email: 'Please enter a valid email address'
          },
          add_user_password: {
            required: 'Please provide a password',
            minlength: 'Your password must be at least 6 characters long'
          },
          add_user_role: 'Please enter the post content'
        }
      });
      $("#update_user_form").validate({
        rules: {
          update_user_name: 'required',
          update_user_birthdate: {
            required: true
          },
          update_user_email: {
            required: true,
            email: true
          },
          update_user_role: 'required'
        },
        messages: {
          update_user_name: 'Please enter the name',
          update_user_birthdate: {
            required: 'Please enter your birthdate',
            date: 'Please enter a valid date'
          },
          update_user_email: {
            required: 'Please enter your email address',
            email: 'Please enter a valid email address'
          },
          update_user_role: 'Please enter the post content'
        }
      });
    },
    getUsers() {
      http.get("users", this.$store.state.headers).then(response => {
        this.users = response.data.users;
        Vue.nextTick(function () {
          Event.$emit("init-datatable", "users_list");
        });
      });
    },
    initAdduser() {
      Event.$emit("show-modal-normal", "add-modal");
    },
    addUser() {
      if (
        this.user.name != "" &&
        this.user.birthdate != "" &&
        this.user.email != "" &&
        this.user.password != "" &&
        this.user.user_role != ""
      ) {
        http
          .post("users", {
            name: this.user.name,
            birthdate: this.user.birthdate,
            email: this.user.email,
            password: this.user.password,
            user_role: this.user.user_role
          }, this.$store.state.headers)
          .then(response => {
            this.reset();
            this.refreshTable();
            Event.$emit("hide-modal-normal", "add-modal");
            Event.$emit(
              "swal-message",
              "Add User",
              response.data.msg,
              "success",
              2000
            );
          })
          .catch(error => {
            Event.$emit("hide-modal-normal", "add-modal");
            Event.$emit(
              "swal-message",
              "Add User",
              "Error Axios ! " + error,
              "error",
              2000
            );
          });
      }
    },
    initUpdateUser(index) {
      this.user_update = this.users[index];
      this.user_update['password'] = ''
      Event.$emit("show-modal-normal", "update-modal");
    },
    updateUser() {
      if (
        this.user_update.name != "" &&
        this.user_update.birthdate != "" &&
        this.user_update.email != "" &&
        this.user_update.user_role != ""
      ) {
        http
          .patch("users/" + this.user_update.id, this.user_update, this.$store.state.headers)
          .then(response => {
            this.user_update = response.data.user
            Event.$emit("hide-modal-normal", "update-modal");
            Event.$emit(
              "swal-message",
              "Update User",
              response.data.msg,
              "success",
              2000
            );
          })
          .catch(error => {
            Event.$emit("hide-modal-normal", "update-modal");
            Event.$emit(
              "swal-message",
              "Update User",
              "Error Axios ! " + error,
              "error",
              2000
            );
          });
      }
    },
    removeUser(index) {
      swal({
        title: "Remove User ?",
        text: "Are you sure? !",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          http
            .delete("users/" + this.users[index].id, this.$store.state.headers)
            .then(response => {
              this.users.splice(index, 1);
              this.refreshTable();
              Event.$emit(
                "swal-message",
                "Remove",
                response.data.msg,
                "success",
                2000
              );
            })
            .catch(error => { });
        } else {
          Event.$emit(
            "swal-message",
            "Canceled",
            "Action canceled !",
            "error",
            2000
          );
        }
      });
    },
    destroyDataTable() {
      Event.$emit("destroy-datatable");
    },
    refreshTable() {
      this.destroyDataTable();
      this.getUsers();
    },
    reset() {
      this.user.name = "";
      this.user.birthdate = "";
      this.user.email = "";
      this.user.password = "";
      this.user.user_role = "";
    },
    moment: function () {
      return moment()
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
};
</script>

<style>
.table > tbody > tr > td {
  vertical-align: middle;
}
</style>