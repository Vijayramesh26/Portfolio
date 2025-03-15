<template>
    <div class="about-section">
        <v-container class="fill-height">
            <v-row class="d-flex flex-column text-center" no-gutters>
                <v-col>
                    <span class="text-h3 font-weight-bold">
                        About Me
                    </span>
                </v-col>
                <v-col class="d-flex align-center justify-center mt-2 ">
                    <p class="about-divider"></p>
                </v-col>
                <v-col class="mt-3">
                    <span class=" text-subtitle-2 grey--text text--lighten-1">
                        I'm a passionate full-stack developer with expertise in building modern web applications. With a
                        strong foundation in both frontend and backend technologies, I create seamless, efficient, and
                        scalable solutions for complex problems.
                    </span>
                </v-col>
            </v-row>

            <v-row>

                <v-col cols="12" md="6">
                    <v-card outlined height="480px">

                    </v-card>
                </v-col>
                <v-col>
                    <div class="text-h4 font-weight-bold ">What I Do</div>
                    <v-card v-for="(service, index) in services" :key="index" class="mb-4 service-card" outlined
                        elevation="0">
                        <v-card-text>
                            <div class="d-flex">
                                <v-avatar color="teal lighten-5" size="56" class="mr-4 teal--text">
                                    <v-icon size="28">{{ service.icon }}</v-icon>
                                </v-avatar>
                                <div>
                                    <h4 class="text-h6 font-weight-bold mb-1">{{ service.title }}</h4>
                                    <p class="grey--text">{{ service.description }}</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
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
            // About section
            services: [
                {
                    icon: 'mdi-code-tags',
                    title: 'Frontend Development',
                    description: 'Building responsive and interactive user interfaces with Vue.js and modern CSS frameworks.'
                },
                {
                    icon: 'mdi-server',
                    title: 'Backend Development',
                    description: 'Creating robust and efficient server-side applications with Golang and RESTful APIs.'
                },
                {
                    icon: 'mdi-database',
                    title: 'Database Design',
                    description: 'Designing and optimizing database schemas with MariaDB for performance and scalability.'
                },
                {
                    icon: 'mdi-web',
                    title: 'Full-Stack Solutions',
                    description: 'Integrating all layers of application development to deliver complete, end-to-end solutions.'
                }
            ],

        }
    },
    components: {
        SwipeDown
    },

    methods: {

    },
    mounted() {

    }
}
</script>
<style scoped>
.about-divider {
    height: 35%;
    width: 7%;
    background: linear-gradient(teal, rgb(1, 160, 160));
}

.about-section {
    height: 100vh;
}
</style>