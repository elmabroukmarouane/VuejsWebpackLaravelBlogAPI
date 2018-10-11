<template>
        <div class="card card-primary" :id="id">
            <slot name="post_image"></slot>
            <div class="card-body">
                <slot name="post_title"></slot>
                <slot name="post_description"></slot>
                <hr>
                <slot name="btn_lire_suite"></slot>
            </div>
            <ul class="list-group list-group-flush list shadow-none">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="col-10">
                        <i aria-hidden="true" class="fa fa-comments-o"></i> comments
                    </div>
                    <div class="col-2">
                        <slot name="nb_comments"></slot>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>
/* eslint-disable */
export default {
    props: ["id"]
}
</script>
