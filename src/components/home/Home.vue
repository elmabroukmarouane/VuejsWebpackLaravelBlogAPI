<template>
    <div>
        <div class="row p-3">
            <div class="btn-group" style="text-align: right !important;" role="group">
                  <button type="button" class="btn btn-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Actions
                  </button>
                  <div class="dropdown-menu">
                    <a @click="showAddPostModal()" href="javaScript:void()" class="dropdown-item">Add Post</a>
                    <div class="dropdown-divider"></div>
                    <a @click="getPosts()" href="javaScript:void()" class="dropdown-item">Refresh Posts List</a>
                  </div>
                </div>
        </div>
        <div class="row">
            <div class="col-lg-4" v-for="(post, index) in posts" v-if="posts.length > 0" :key="index">
                <Card :id="getIDCard(index+1)">
                    <img slot="post_image" :src="post.image" class="card-img-top" :alt="post.title">
                    <span slot="post_title">
                    <h5 class="card-title text-primary">{{post.id}} : {{post.title}}</h5>
                    </span>
                    <span slot="post_description">
                        <p class="card-text">{{post.content.substr(0, 100)}} ...</p>
                    </span>
                    <span slot="btn_lire_suite">
                    <a href="javascript:void()" class="btn btn-primary waves-effect waves-light m-1"  @click="$router.push({ path: '/post/' + post.id })"><i class="fa fa-plus"></i> Lire la suite</a>
                    <a href="javascript:void()" class="btn btn-warning waves-effect waves-light m-1"  @click="initUpdatePost(index)" v-if="post.user.id === $store.state.user.id"><i class="fa fa-edit"></i></a>
                    <a href="javascript:void()" class="btn btn-danger waves-effect waves-light m-1"  @click="deletePost(index, post.id)" v-if="post.user.id === $store.state.user.id"><i class="fa fa-trash-o"></i></a>
                    </span>
                    <span slot="nb_comments">
                        <span class="badge badge-info badge-pill">{{post.comments.length}}</span>
                    </span>
                </Card>
            </div>
        </div>
        
    <!-- Begin Modal Logout -->
    <ModalPart id="add-post-modal">
        <div slot="header_modal" class="modal-header">
            <h5 class="modal-title"><i class="fa fa-plus"></i> Add Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div slot="body_modal" class="modal-body">
            <form id="update_user_form" method="post" action="javascript:void(0)">
                <!-- <div class="form-group row">
                    <label for="add_post_user" class="col-sm-2 col-form-label">Users</label>
                    <div class="col-sm-10">
                        <select class="form-control" v-model="post.user_id">
                            <option v-for="(user, userIndex) in users" v-if="users.length > 0" :key="userIndex" :value="user.id">{{ user.name }}</option>
                        </select>
                    </div>
                </div> -->
                <div class="form-group row">
                    <label for="add_post_title" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                        <input v-on:keyup.enter="addPost()" v-model="post.title" type="text" class="form-control" id="add_post_title" name="add_post_title" placeholder="Enter the title !" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="add_post_content" class="col-sm-2 col-form-label">Content</label>
                    <div class="col-sm-10">
                        <textarea v-model="post.content" class="form-control" rows="3" name="add_post_content" id="add_post_content" placeholder="Enter the content !"></textarea>
                    </div>
                </div>
                <div class="form-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">CANCEL</button>
                    <button @click="addPost()" type="submit" class="btn btn-success">ADD POST</button>
                </div>
            </form>
        </div>
    </ModalPart>
    <!-- Begin Modal Logout -->
    <ModalPart id="update-post-modal">
        <div slot="header_modal" class="modal-header">
            <h5 class="modal-title"><i class="fa fa-plus"></i> Update Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div slot="body_modal" class="modal-body">
            <form id="update_user_form" method="post" action="javascript:void(0)">
                <!-- <div class="form-group row">
                    <label for="add_post_user" class="col-sm-2 col-form-label">Users</label>
                    <div class="col-sm-10">
                        <select class="form-control" v-model="post.user_id">
                            <option v-for="(user, userIndex) in users" v-if="users.length > 0" :key="userIndex" :value="user.id">{{ user.name }}</option>
                        </select>
                    </div>
                </div> -->
                <div class="form-group row">
                    <label for="update_post_title" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                        <input v-on:keyup.enter="updatePost()" v-model="update_post.title" type="text" class="form-control" id="update_post_title" name="update_post_title" placeholder="Enter the title !" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="update_post_content" class="col-sm-2 col-form-label">Content</label>
                    <div class="col-sm-10">
                        <textarea v-model="update_post.content" class="form-control" rows="3" name="update_post_content" id="update_post_content" placeholder="Enter the content !"></textarea>
                    </div>
                </div>
                <div class="form-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">CANCEL</button>
                    <button @click="updatePost()" type="submit" class="btn btn-success">UPDATE POST</button>
                </div>
            </form>
        </div>
    </ModalPart>
    </div>
</template>

<script>
/* eslint-disable */
/* import JQuery from 'jquery' */
/* import select2 from 'select2/dist/js/select2' */
import Card from '../../parts/cards/Card.vue'
import ModalPart from '../../parts/modals/Modal'
import http from '../../http/'
/* let $ = JQuery */
export default {
    components: {
        Card,
        ModalPart
    },
    data() {
        return {
            posts: [],
            users: [],
            post: {
                /* user_id: null, */
                title: "",
                content: ""
            },
            update_post: {}
        }
    },
    mounted() {
        this.getPosts();
        /* this.getUsers(); */
    },
    methods: {
        getPosts() {
            http.get('posts', this.$store.state.headers).then(response => {
                this.posts = response.data.posts;
                Event.$emit(
                    "swal-message",
                    "Posts List",
                    response.data.msg,
                    "success",
                    2000
                );
            });
        },
        /* getUsers() {
            this.users = this.$store.state.users[0].text.users
            this.post.user_id = this.users[0].id
        }, */
        addPost() {
            if (
                this.post.title !== '' &&
                this.post.content !== ''
            ) {
                http
                    .post(
                        'posts',
                        {
                            user_id: this.$store.state.user.id,
                            title: this.post.title,
                            content: this.post.content
                        },
                        this.$store.state.headers
                    )
                    .then(response => {
                        this.posts.unshift(response.data.post)
                        Event.$emit("hide-modal-normal", "add-post-modal");
                        this.post.title = ''
                        this.post.content = ''
                        Event.$emit(
                            "swal-message",
                            "Add Post",
                            response.data.msg,
                            "success",
                            2000
                        );
                    })
            }
        },
        initUpdatePost(index) {
            this.update_post = this.posts[index];
            Event.$emit("show-modal-normal", "update-post-modal");
        },
        updatePost() {
            if (
                this.update_post.title != "" &&
                this.update_post.content != ""
            ) {
                http
                    .patch("posts/" + this.update_post.id, this.update_post, this.$store.state.headers)
                    .then(response => {
                        Event.$emit("hide-modal-normal", "update-post-modal");
                        Event.$emit(
                            "swal-message",
                            "Update User",
                            response.data.msg,
                            "success",
                            2000
                        );
                    })
                    .catch(error => {
                        Event.$emit("hide-modal-normal", "update-post-modal");
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
        deletePost(post_index, id) {
            swal({
                title: "Remove Post ?",
                text: "Are you sure? !",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(willDelete => {
                if (willDelete) {
                    http
                        .delete('posts/' + id,
                            this.$store.state.headers)
                        .then(response => {
                            this.posts.splice(post_index, 1)
                            Event.$emit(
                                "swal-message",
                                "Post Delete",
                                response.data.msg,
                                "success",
                                2000
                            );
                        })
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
        showAddPostModal() {
            /* $('.multiple-select').select2(); */
            Event.$emit("show-modal-normal", "add-post-modal");
            /* $('#add-post-modal').modal('show'); */
        },
        getIDCard(index) {
            var card_id = "card_" + index;
            return card_id;
        }
    }
}
</script>
