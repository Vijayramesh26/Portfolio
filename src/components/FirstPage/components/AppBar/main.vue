<template>

    <v-app-bar elevation="0" fixed hide-on-scroll color="transparent" class="mt-7" >
        <v-container>
            <v-card width="100%" elevation="2" outlined class="rounded-xl transparent pa-3">

                <AppBar @scrollTo="scrollToSection" @OpenBottomSheet="OpenBottomSheet" />
                <NavBar :OpenSheet="OpenSheet" @OpenBottomSheet="OpenBottomSheet" @scrollTo="scrollToSection" />

            </v-card>

        </v-container>
    </v-app-bar>

</template>

<script>
import AppBar from './components/appBar.vue';
import NavBar from './components/NavBar.vue';
export default {
    name: "AppBarMain",
    components: {
        AppBar,
        NavBar
    },
    data() {
        return {
            OpenSheet: false,
        }
    },
    methods: {
        scrollToSection(data) {
            this.$emit('scrollTo', data)
        },
        OpenBottomSheet() {
            this.OpenSheet = !this.OpenSheet
        }
    }
}
</script>