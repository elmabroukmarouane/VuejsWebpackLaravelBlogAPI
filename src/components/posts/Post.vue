<template>
    <div class="row">
        <!-- Post Content Column -->
        <div class="col-lg-12">

          <!-- Title -->
          <h1 class="mt-4">{{ post.title }}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{ post_user.name }}</a>
          </p>

          <hr>

          <!-- Date/Time -->
          <p>Posted on {{ post.updated_at || moment}}</p>

          <hr>

          <!-- Preview Image -->
          <img class="img-fluid rounded" :src="post.image" alt="">

          <hr>

          <!-- Post Content -->
          <p class="lead">{{ post.content }}</p>

          <hr>

          <!-- Comments Form -->
          <div class="card my-4">
            <h5 class="card-header">Leave a Comment:</h5>
              <div class="card-body">
                <div :class="color_alert" role="alert">
                  <div :class="icon_alert">
                    <i class="icon-info"></i>
                  </div>
                  <div class="alert-message">
                    <span><strong>{{ msg_login_success }}</strong> </span>
                  </div>
              </div>
              <form id="commentForm" action="javascript:void(0)">
                <div class="form-group">
                  <textarea v-model="comment" class="form-control" rows="3" name="comment" id="comment" placeholder="Leave a comment !"></textarea>
                </div>
                <button @click="submitComment()" type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>

          <!-- Single Comment -->
          <div class="border border-primary rounded p-3 media mb-4" v-for="(comment, index) in post.comments" v-if="post.comments.length > 0 && show_comment_form == false" :key="index">
            <img class="img-responsive d-flex mr-3 rounded-circle" :src="comment.user.image" height="50" width="50" alt="">
            <div class="media-body">
              <h5 class="mt-0 border-bottom border-primary p-3">{{ comment.user.name }}, commented at {{ comment.updated_at || moment }} <span class="text-right" v-if="comment.user.id === $store.state.user.id"><button @click="getUpdatedComment(comment.id, comment.comment, index)" type="button" class="btn btn-warning waves-effect waves-light m-1"><i class="fa fa-edit"></i></button><button @click="deleteComment(index, comment.id)" type="button" class="btn btn-danger waves-effect waves-light m-1"><i class="fa fa-trash-o"></i></button></span></h5>
              <span class=" p-t-xs">{{ comment.comment }}</span>
            </div>
          </div>
          <div class="border border-primary rounded p-3 mb-4" v-if="show_comment_form == true">
            <h5 class="mt-0 p-3">Update Comment <button @click="show_comment_form = false" type="button" class="btn btn-danger waves-effect waves-light m-1"><i class="fa fa-close"></i></button></h5>
            <form id="updateCommentForm" action="javascript:void(0)">
                <div class="form-group">
                  <textarea v-model="updateComment" class="form-control" rows="3" name="updateComment" id="updateComment" placeholder="Leave a comment !"></textarea>
                </div>
                <button @click="updateCommentFunction()" type="submit" class="btn btn-primary">Submit</button>
              </form>
          </div>
        </div>
      </div>
      <!-- /.row -->
</template>

<script>
/* eslint-disable */
import JQuery from 'jquery'
import 'jquery-validation'
import moment from 'moment'
import swal from 'sweetalert'
import http from '../../http/'
let $ = JQuery
export default {
	data() {
		return {
			color_alert: 'alert alert-icon-info alert-dismissible alert-round',
			icon_alert: 'alert-icon icon-part-info icon-part-round',
			msg_login_success: 'Please Leave a comment !',
			post_id: 0,
			post: {},
			post_user: {},
			comment: '',
			show_comment_form: false,
			updateComment: '',
			index_comment: null,
			id_comment: null
		}
	},
	created() {
		this.post_id = this.$route.params.id;
	},
	mounted() {
		this.init_validate_comment_form();
		this.loadPost();
	},
	methods: {
		init_validate_comment_form() {
			$('#commentForm').validate({
				rules: {
					comment: 'required'
				},
				messages: {
					comment: 'Please enter your comment'
				}
			})
		},
		getUpdatedComment(id_comment, comment, index_comment) {
			this.id_comment = id_comment
			this.updateComment = comment
			this.index_comment = index_comment
			this.show_comment_form = true
		},
		loadPost() {
			http.get('posts/' + this.post_id, this.$store.state.headers).then(response => {
				this.post = response.data.post;
				this.post_user = this.post.user;
				Event.$emit(
					"swal-message",
					"Post Details",
					response.data.msg,
					"success",
					2000
				);
			});
		},
		submitComment() {
			if (
				this.comment !== ''
			) {
				http
					.post(
						'comments',
						{
							user_id: this.$store.state.user.id,
							post_id: this.post.id,
							comment: this.comment
						},
						this.$store.state.headers
					)
					.then(response => {
						this.comment = ''
						this.color_alert =
							'alert alert-icon-success alert-dismissible alert-round'
						this.icon_alert = 'alert-icon icon-part-success icon-part-round'
						this.msg_login_success = 'Votre commentaire a été ajouté avec succès !'
						setTimeout(this.restartAlert, 2000)
						let comment_obj = {};
						comment_obj.comment = response.data.comment.comment
						comment_obj.created_at = response.data.comment.created_at
						comment_obj.id = response.data.comment.id
						comment_obj.post_id = response.data.comment.post_id
						comment_obj.updated_at = response.data.comment.updated_at
						comment_obj.user_id = response.data.comment.user_id
						comment_obj.user = this.$store.state.user
						this.post.comments.push(comment_obj)
						Event.$emit(
							"swal-message",
							"Post Details",
							response.data.msg,
							"success",
							2000
						);
					})
					.catch(error => {
						this.comment = ''
						this.color_alert =
							'alert alert-icon-danger alert-dismissible alert-round'
						this.icon_alert = 'alert-icon icon-part-danger icon-part-round'
						this.msg_login_success = 'Please enter your comment !'
					})
			}
		},
		updateCommentFunction() {
			if (
				this.updateComment !== ''
			) {
				http
					.patch(
						'comments/' + this.id_comment,
						{
							id: this.id_comment,
							user_id: this.$store.state.id,
							post_id: this.post.id,
							comment: this.updateComment
						},
						this.$store.state.headers
					)
					.then(response => {
						this.color_alert =
							'alert alert-icon-success alert-dismissible alert-round'
						this.icon_alert = 'alert-icon icon-part-success icon-part-round'
						this.msg_login_success = 'Votre commentaire a été modifié avec succès !'
						this.show_comment_form = false
						setTimeout(this.restartAlert, 2000)
						this.post.comments[this.index_comment].comment = response.data.comment.comment
						Event.$emit(
							"swal-message",
							"Post Details",
							response.data.msg,
							"success",
							2000
						);
					})
			}
		},
		deleteComment(comment_index, id) {
			swal({
				title: "Remove Comment ?",
				text: "Are you sure? !",
				icon: "warning",
				buttons: true,
				dangerMode: true
			}).then(willDelete => {
				if (willDelete) {
					http
						.delete('comments/' + id,
							this.$store.state.headers)
						.then(response => {
							this.color_alert =
								'alert alert-icon-success alert-dismissible alert-round'
							this.icon_alert = 'alert-icon icon-part-success icon-part-round'
							this.msg_login_success = 'Votre commentaire a été supprimé avec succès !'
							this.post.comments.splice(comment_index, 1)
							setTimeout(this.restartAlert, 2000)
							Event.$emit(
								"swal-message",
								"Post Details",
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
		moment() {
			return moment()
		},
		restartAlert() {
			this.color_alert =
				'alert alert-icon-info alert-dismissible alert-round'
			this.icon_alert = 'alert-icon icon-part-info icon-part-round'
			this.msg_login_success = 'Please Leave a comment !'
		}
	},
	filters: {
		moment(date) {
			if (moment(date).format('YYYY') !== '2018') {
				return '2018 - ' + moment(date).format('YYYY')
			}
			return moment(date).format('YYYY')
		}
	}
}
</script>
