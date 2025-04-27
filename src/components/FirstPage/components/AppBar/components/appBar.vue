<template>
    <div>
        <v-row no-gutters>
            <v-col class="d-flex align-center container">
                <div class="d-flex align-center avatar">
                    <v-avatar class=" mx-4">
                        <!-- <v-icon color="teal" size="45">
                                    mdi-account-tie
                                 </v-icon> -->
                                 
                        <v-img :src="Profile.imageUrl">

                        </v-img>
                    </v-avatar>
                    <span class="font-weight-bold text-h6" v-text="Profile.name"></span> <!-- VIJAY RAMESH -->
                </div>
                <v-col class="d-flex align-center justify-center" v-if="!$vuetify.breakpoint.smAndDown" >
                    <span v-for="menu,index in menubar" :key="index">

                        <v-btn text class="font-weight-bold mx-5" @click="$emit('scrollTo',menu.to)" v-text="menu.title"></v-btn>
                    </span> 

                </v-col> 
                <v-col class="d-flex align-center justify-end" v-if="$vuetify.breakpoint.smAndDown">
                    <v-btn icon @click="$emit('OpenBottomSheet')" >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn> 
                </v-col>
                   

            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    name: "AppBar",
    data() {
        return {
            Profile: this.$store.state.profile.Profile,
            // OpenBottomSheet:false
            menubar:  this.$store.state.appbar.menu,
        }
    },
    methods: {

    }
}</script>
<style>
.avatar {
    position: absolute;
}

.container {
    position: relative;
}
</style>