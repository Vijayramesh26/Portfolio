<template>
    <div class="project-section py-5 app-background" id="projectSection">
        <v-container class="fill-height" :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
            <v-row class="d-flex flex-column text-center" no-gutters>
                <v-col>
                    <span class="text-h3 font-weight-bold" v-text="title">

                    </span>
                </v-col>
                <v-col class="d-flex align-center justify-center mt-2 ">
                    <p class="project-divider"></p>
                </v-col>
                <v-col class="my-3 mb-5 d-flex justify-center ">
                    <v-col lg="8" class="">
                        <span class=" text-subtitle-1 grey--text text--lighten-1 text-center" v-text="header">
                        </span>
                    </v-col>

                </v-col>
            </v-row>

            <v-row>
                <v-card class="overflow-x-auto d-flex transparent elevation-0" width="100%" height="100%">
                    <v-col v-for="(project, index) in projects" :key="index" lg="3" md="6" sm="12" cols="12">
                        <v-hover v-slot="{ hover }">
                            <v-card class="d-flex flex-column rounded-xl" color="grey lighten-5" height="100%">
                                <!-- <div class="project-overlay"> -->
                                <v-img height="200" :src="project.image">
                                    <v-expand-transition>
                                        <div v-if="hover"
                                            class="d-flex transition-fast-in-fast-out teal lighten-5 v-card--reveal text-h2 white--text align-end justify-center"
                                            style="height: 100%;">
                                            <v-btn class="ma-3 white" small outlined :href="project.github">
                                                <v-icon small>mdi-github</v-icon>
                                                code
                                            </v-btn>
                                            <v-btn class="ma-3 teal" small :href="project.demo">
                                                <v-icon small>mdi-open-in-new</v-icon>
                                                Demo
                                            </v-btn>
                                        </div>
                                    </v-expand-transition>

                                </v-img>
                                <!-- </div> -->
                                <v-card-title v-text="project.title"> </v-card-title>

                                <v-card-text class="grey--text text--lighten-1">
                                    {{ truncatedDescriptions[index] }}
                                    <span v-if="project.description.length > 50" @click="toggleDescription(index)"
                                        class="blue--text text--darken-2" style="cursor: pointer;">
                                        {{ expandedDescriptions[index] ? ' See Less' : ' See More' }}
                                    </span>
                                </v-card-text>

                                <v-card-text>
                                    <v-chip v-for="(lang, index) in project.language" :key="index" class="mx-2   "
                                        v-text="lang"></v-chip>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-card>
            </v-row>


            <v-col justify="center" align="center">
                <SwipeDown :loading="true" />
            </v-col>
        </v-container>
    </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
    name: "AboutSection",
    data() {
        return {
            expandedDescriptions: {}, // { 0: true, 1: false, ... }
            title: this.$store.state.projects.title,
            header: this.$store.state.projects.header,
            projects: this.$store.state.projects.Projects,
        }
    },
    components: {
        SwipeDown
    },
    computed: {
        truncatedDescriptions() {
            return this.projects.map((project, index) => {
                const isExpanded = this.expandedDescriptions[index];
                if (isExpanded || !project.description) return project.description;
                return project.description.length > 200
                    ? project.description.slice(0, 200) + '...'
                    : project.description;
            });
        }
    },
    methods: {
        toggleDescription(index) {
            this.$set(this.expandedDescriptions, index, !this.expandedDescriptions[index]);
        }
    }


}
</script>
<style scoped>
.project-divider {
    height: 35%;
    width: 7%;
    background: linear-gradient(teal, rgb(1, 160, 160));
}

.project-section {
    height: 100%;
}

.project-overlay {
    border: 2px solid red;
    /* top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    opacity: 0;
    transition: opacity 0.3s ease; */
}

.app-background {
    background-image: url('../../../assets/bg10.png') !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 100vh;

}
</style>