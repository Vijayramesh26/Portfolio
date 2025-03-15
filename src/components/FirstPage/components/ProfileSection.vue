<template>
    <div class="profile-section overflow-x-hidden">
        <v-container fluid class="fill-height ">
            <v-row align="center" justify="center"  >
                <v-col cols="12" md="8" class="text-center">


                    <v-col><v-chip color="teal" outlined>
                            Available for Hire
                        </v-chip></v-col>
                    <v-col><span class="text-h2 font-weight-black">VIJAY RAMESH</span></v-col>
                    <v-col class="mb-4"><span v-text="typeRole" class="text-h4"></span><span
                            class="blink-cursor"><v-divider vertical></v-divider></span></v-col>
                    <v-col><v-btn class="ma-2 rounded-lg white--text" color="teal" x-large>
                            View Projects
                        </v-btn>
                        <v-btn class="ma-2 rounded-lg" outlined color="teal" x-large @click="DownloadResume">
                            Download Resume
                        </v-btn></v-col>
                    <v-col >
                        <v-btn text icon small color="grey lighten-1" class="mx-4"
                            href="https://github.com/vijayramesh26" target="_blank">
                            <v-icon class="grey-text">mdi-github</v-icon>
                        </v-btn>
                        <v-btn text icon small color="grey lighten-1" class="mx-4"
                            href="https://www.linkedin.com/in/vijay-ramesh-7ab042212/" target="_blank">
                            <v-icon>

                                mdi-linkedin
                            </v-icon>
                        </v-btn> 
                    </v-col>
                </v-col>
            </v-row>
            <div class="Main-Color-Ball color-ball1"></div>
            <div class="Main-Color-Ball color-ball2"></div>
            <div class="Main-Color-Ball color-ball3"></div>
            <div class="Main-Color-Ball color-ball4"></div>
            <v-col class="SwipeDown"  justify="center" align="center" >
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
            role: "Full Stack Developer ",
            typeRole: "",
            typeInterval: null,
            typeIndex: 0,

        }
    },
    components: {
        SwipeDown
    },
    methods: {
        DownloadResume() {
            const pdfUrl = "/VijayRamesh.pdf"; // Accessing directly from public folder
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = "VijayRamesh.pdf"; // Change the name if needed
            link.click();
        },
        startTyping() {
            this.typeInterval = setInterval(() => {
                if (this.typeIndex < this.role.length) {
                    this.typeRole += this.role.charAt(this.typeIndex)
                    this.typeIndex++
                } else {
                    clearInterval(this.typeInterval)
                }
            }, 250)
        },
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
    position: relative;
}

.blink-cursor {
    animation: blink 1s step-end infinite;
}

.Main-Color-Ball {
    filter: blur(20px);
    background-color: rgb(0, 217, 255);
    border-radius: 50%;
    opacity: 0.05;
    position: absolute;
}

.color-ball1 {
    top: 70%;
    left: 20%;
    height: 150px;
    width: 150px;
}

.color-ball2 {
    top: 5%;
    left: -10%;
    height: 500px;
    width: 500px;
}

.color-ball3 {
    top: 50%;
    right: -5%;
    height: 350px;
    width: 350px;
}

.color-ball4 {
    top: 25%;
    right: 30%;
    height: 500px;
    width: 500px;
}
</style>