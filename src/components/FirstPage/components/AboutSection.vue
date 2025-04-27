<template>
    <div class="about-section py-5" id="aboutSection">
        <v-container class="fill-height" :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
            <v-row class="d-flex flex-column text-center" no-gutters>
                <v-col>
                    <span class="text-h3 font-weight-bold" v-text="title">
                    </span>
                </v-col>
                <v-col class="d-flex align-center justify-center mt-2 ">
                    <p class="about-divider"></p>
                </v-col>
                <v-col class="my-3 mb-5 d-flex justify-center ">
                    <v-col lg="7" class="">
                        <span class=" text-subtitle-1 grey--text text--lighten-1 text-center" v-text="header">

                        </span>
                    </v-col>

                </v-col>
            </v-row>
            <v-row class="my-md-12">

                <v-col cols="12" md="6">

                    <div class="text-h4 font-weight-bold  pb-3">Get to know me!</div>
                    <v-card class="rounded-lg pa-1" elevation="0" color="transparent">
                        <p class="grey--text text--darken-1" v-html="jobContent"></p>


                    </v-card>


                </v-col>
                <v-col>
                    <div class="text-h4 font-weight-bold  pb-3">My Skills</div>

                    <v-card class="rounded-lg pa-1 " elevation="0" color="transparent">
                        <v-row cols="12">
                            <v-col v-for="(skill, index) in Skills" :key="index" cols="4" lg="3">
                                <v-tooltip right>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-card v-bind="attrs" v-on="on"
                                            class="d-flex flex-column align-center justify-center pa-5  service-card rounded-xl elevation-4"
                                            color="grey lighten-4" min-width="80px" min-height="80px" max-width="80px"
                                            max-height="80px">
                                            <v-img :src="skill.img" width="36" height="36" contain />
                                            <span class="text-caption mt-2 text-center">{{ skill.name }}</span>
                                        </v-card>
                                    </template>
                                    <span>Exp: <span class="font-weight-bold">
                                            {{ skill.exp }}
                                        </span></span>
                                </v-tooltip>
                            </v-col>
                        </v-row>


                    </v-card>


                </v-col>
            </v-row>
            <v-row>
                <v-card outlined class="pa-2 " width="100%" height="100%" min-height="280px" color="transparent">
                    <v-row class="d-flex flex-row">
                        <v-col lg="3" md="6" sm="12" cols="12" v-for="(service, index) in Job" :key="index">
                            <v-card outlined width="100%" height="100%" min-height="280px" elevation="3"
                                class="rounded-xl" color="grey lighten-5">
                                <v-card-text>
                                    <div class="d-flex align-start">
                                        <v-avatar>
                                            <v-icon class="mt-2 d-flex align-start" :color="service.color">{{
                                                service.icon
                                                }}</v-icon>
                                        </v-avatar>
                                        <div>
                                            <span class="text-h6 font-weight-bold " color="black">{{ service.title
                                            }}</span>
                                            <p class="grey--text" v-text="typedDescriptions[index]"></p>
                                        </div>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
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
            title: this.$store.state.about.title,
            header: this.$store.state.about.header,
            jobContent: this.$store.state.about.jobContent,
            Skills: this.$store.state.about.skills,
            Job: this.$store.state.about.Job,


            typeJobContent: "",
            typeInterval: null,
            typeIndex: 0,
            typedDescriptions: [], // Array to store the typed text per job
            typeIntervals: [], 



        }
    },
    components: {
        SwipeDown
    },

    methods: {
        startTyping() {
            this.typeInterval = setInterval(() => {
                if (this.typeIndex < this.jobContent.length) {
                    this.typeJobContent += this.jobContent.charAt(this.typeIndex)
                    this.typeIndex++
                } else {
                    clearInterval(this.typeInterval)
                }
            }, 15)
        },

        startTypingEffect() {
            this.Job.forEach((job, index) => {
                let text = job.description;
                this.typedDescriptions[index] = ""; // Initialize with empty text

                let typeIndex = 0;
                this.typeIntervals[index] = setInterval(() => {
                    if (typeIndex < text.length) {
                        this.$set(this.typedDescriptions, index, this.typedDescriptions[index] + text.charAt(typeIndex));
                        typeIndex++;
                    } else {
                        clearInterval(this.typeIntervals[index]);
                    }
                }, 50);
            });
        },
    },
    mounted() {
        this.startTypingEffect();
        this.startTyping()
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
    height: 100%;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
    background-color: rgba(38, 166, 154, 0.1) !important;
}
</style>


<!-- <v-card v-for="(service, index) in services" :key="index" class="mb-4 service-card" outlined>
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

                     /*
                      DATA section
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
             ], */
                    -->