<template>
    <v-container fluid class="d-flex flex-column align-center justify-center" style="height: 100vh; overflow: hidden;">
        <!-- <div > -->
            <NotFoundLotti ></NotFoundLotti>
            <div>
                <div>
                   <div class="text-h2 my-5">
                    Oops! Page not found

                   </div> 
                   The page you're looking for doesn't exist or has been moved.
                </div>

                <v-btn outlined to="/" :small="this.$vuetify.breakpoint.smAndDown" class="rounded-lg text-capitalize mt-3">Back to Portfolio</v-btn>
            </div>
        <!-- </div> -->
    </v-container>
</template>

<script>
import NotFoundLotti from '../StaticContent/NotFoundLotti.vue';
export default {
    name: "notFoundMain",
    components: {
        NotFoundLotti
    },
   
}
</script>
