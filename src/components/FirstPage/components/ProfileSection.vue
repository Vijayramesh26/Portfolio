<template>
    <div class="profile-section overflow-x-hidden app-background">
        <v-container fluid class="fill-height ">
            <v-row align="center" justify="center">
                <v-col cols="12" md="8" class="text-center">

                    <v-col><v-chip color="teal" outlined v-text="Profile.hireOption">
                        </v-chip></v-col>
                    <v-col><span class="text-h2 font-weight-black" v-text="Profile.name"></span></v-col>
                    <v-col class="mb-4"><span v-text="typeRole" class="text-h4"></span><span
                            class="blink-cursor"><v-divider vertical></v-divider></span></v-col>
                    <v-col class="SocialIcon">
                        <v-btn class="ma-2 rounded-lg white--text" color="teal" x-large @click="emitScroll">
                            View Projects
                        </v-btn>
                        <v-btn class="ma-2 rounded-lg" outlined color="teal" x-large @click="DownloadResume">
                            Download Resume
                        </v-btn>

                    </v-col>
                    <v-col class="SocialIcon">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text icon small color="grey lighten-1" class="mx-4" :href="Profile.github"
                                    v-bind="attrs" v-on="on" target="_blank">
                                    <v-icon class="grey-text">mdi-github</v-icon>
                                </v-btn>
                            </template>
                            <span>GitHub Profile</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text icon small color="grey lighten-1" class="mx-4" :href="Profile.linkedin"
                                    v-bind="attrs" v-on="on" target="_blank">
                                    <v-icon> mdi-linkedin </v-icon>
                                </v-btn>
                            </template>
                            <span>LinkedIn Profile</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="openPdf" color="grey lighten-1" small text v-bind="attrs" v-on="on">
                                    <v-icon>
                                        mdi-file-account
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>View Resume</span>
                        </v-tooltip>
                    </v-col>
                </v-col>
            </v-row>
            <v-col class="SwipeDown" justify="center" align="center">
                <SwipeDown :loading="true" />
            </v-col>
        </v-container>
    </div>
</template>

<script>
import SwipeDown from '../../StaticContent/SwipeDown.vue';

export default {
    name: "ProfilSection",
    data() {
        return {
            typeRole: "",
            typeInterval: null,
            typeIndex: 0,
            Profile: this.$store.state.profile.Profile

        }
    },
    components: {
        SwipeDown
    },
    methods: {
        DownloadResume() {
            const pdfUrl = this.Profile.resumeURL; // Accessing directly from public folder
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = this.Profile.resumeName; // Change the name if needed
            link.click();
        },
        openPdf() {
            // Replace with your actual PDF path
            const pdfUrl = this.Profile.resumeURL;
            window.open(pdfUrl, '_blank');
        },
        startTyping() {
            this.typeInterval = setInterval(() => {
                if (this.typeIndex < this.Profile.role.length) {
                    this.typeRole += this.Profile.role.charAt(this.typeIndex)
                    this.typeIndex++
                } else {
                    clearInterval(this.typeInterval)
                }
            }, 250)
        },
        emitScroll() {
            this.$emit("scrollTo", "projectSection")
        }
    },
    mounted() {
        this.startTyping()
    }
}
</script>
<style scoped>
.SwipeDown {
    position: absolute;
    bottom: 1%;
}

.profile-section {
    height: 100vh;
    /* background-color: rgb(242, 245, 248); */
    /* position: relative; */
}

.blink-cursor {
    animation: blink 1s step-end infinite;
}

.SocialIcon {
    z-index: 2 !important;
}

.app-background {
    background-image: url('../../../assets/bg10.png') !important;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 100vh;

}
</style>