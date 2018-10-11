<template>
  <div>
    <div class="row p-3">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-primary waves-effect waves-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dropdown_action_posts">
                    Actions
                  </button>
                  <div class="dropdown-menu">
                    <button @click="refreshTable()" type="button" class="dropdown-item" style="cursor:pointer;"><i class="fa fa-refresh"></i> REFRESH TABLE</button>
                  </div>
                </div>
        </div>
    <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header"><i class="fa fa-table"></i> Posts List</div>
            <div class="card-body">
                <div class="table-responsive">
                    <DataTablePart id="posts_list" :list_datatable_fields="list_datatable_fields">
                        <tr slot="tbody_tr_table" v-for="(post, index) in posts" v-if="posts.length > 0" :key="index">
                            <td>{{ post.user.name }}</td>
                            <td>{{ post.title }}</td>
                            <td>{{ post.content.substr(0, 50) }} ...</td>
                            <td>
                              <a :href="post.image" data-fancybox="images" :data-caption="post.name">
                                    <img :src="post.image" :alt="post.name" class="lightbox-thumb img-thumbnail img-responsive">
                                </a>
                              </td>
                            <td>
                                <button @click="listComments(index)" type="button" class="btn btn-primary waves-effect waves-light m-1"><i class="fa fa-comment"></i></button>
                                <button @click="removepost(index)" type="button" class="btn btn-danger waves-effect waves-light m-1"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    </DataTablePart>
                </div>
            </div>
          </div>
        </div>
      </div><!-- End Row-->
      <ModalListPart id="list-modal">
            <div slot="header_modal" class="modal-header">
                <h5 class="modal-title"><i class="fa fa-list-alt"></i> List Comments</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div slot="body_modal" class="modal-body">
                <div class="table-responsive">
                    <DataTablePart id="comments_list" :list_datatable_fields="list_comments_datatable_fields">
                        <tr slot="tbody_tr_table" v-for="(comment, index) in comments" v-if="comments.length > 0" :key="index">
                            <td>{{ comment.user.name }}</td>
                            <td>{{ comment.post.title }}</td>
                            <td>{{ comment.comment.substr(0, 50) }} ...</td>
                            <td>
                                <button @click="removecomment(index)" type="button" class="btn btn-danger waves-effect waves-light m-1"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    </DataTablePart>
                </div>
            </div>
            <div slot="footer_modal" class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </ModalListPart>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import JQuery from 'jquery'
/* import select2 from 'select2/dist/js/select2' */
import 'jquery-validation'
import ModalListPart from '../../parts/modals/ModalList'
import DataTablePart from '../../parts/tables/DataTable'
import http from '../../http/'
let $ = JQuery
export default {
	components: {
		ModalListPart,
		DataTablePart
	},
	data() {
		return {
			list_datatable_fields: ["Name", "Title", "Content", 'Image', "Actions"],
			list_comments_datatable_fields: ["Name", "Title", 'Comment', "Actions"],
			posts: [],
			comments: [],
			post_index: null
		};
	},
	mounted() {
		this.getposts();
	},
	methods: {
		getposts() {
			http.get("posts", this.$store.state.headers).then(response => {
				this.posts = response.data.posts;
				Vue.nextTick(function () {
					Event.$emit("init-datatable", "posts_list");
				});
			});
		},
		removepost(index) {
			swal({
				title: "Remove post ?",
				text: "Are you sure? !",
				icon: "warning",
				buttons: true,
				dangerMode: true
			}).then(willDelete => {
				if (willDelete) {
					http
						.delete("posts/" + this.posts[index].id, this.$store.state.headers)
						.then(response => {
							this.posts.splice(index, 1);
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
		listComments(post_index) {
			this.post_index = post_index
			http.get("get-comments-by-post-id/" + this.posts[post_index].id, this.$store.state.headers).then(response => {
				this.comments = response.data.comments;
				Vue.nextTick(function () {
					Event.$emit("init-datatable", "comments_list");
					Event.$emit("show-modal-normal", "list-modal");
				});
			});
		},
		removecomment(index) {
			swal({
				title: "Remove Comment ?",
				text: "Are you sure? !",
				icon: "warning",
				buttons: true,
				dangerMode: true
			}).then(willDelete => {
				if (willDelete) {
					http
						.delete("comments/" + this.comments[index].id, this.$store.state.headers)
						.then(response => {
							this.comments.splice(index, 1);
							this.refreshTableComments();
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
			this.getposts();
		},
		refreshTableComments() {
			this.destroyDataTable();
			this.listComments(this.post_index);
		}
	}
};
</script>

<style>
.table > tbody > tr > td {
  vertical-align: middle;
}
</style>