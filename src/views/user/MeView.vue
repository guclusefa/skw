<template>
    <section class="container">
        <h1>{{ user.display_name }}</h1>
        <div class="row">
            <div class="col-lg-4 col-md-12">
                <UserItem :user="user" />
            </div>
            <div class="col-lg-8 col-md-12">

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                            type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                            type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane"
                            type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                        tabindex="0">                {{ user }}</div>
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                        tabindex="0">...</div>
                    <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab"
                        tabindex="0">...</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useAuthStore } from '../../stores/auth';
import UserItem from '../../components/user/UserItem.vue';

export default {
    name: "MeView",
    data() {
        return {
            auth: useAuthStore()
        }
    },
    computed: {
        user() {
            return this.auth.user
        }
    },
    components: {
        UserItem
    },
};
</script>
