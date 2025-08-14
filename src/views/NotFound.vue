<!--  <template>
  <div align="center" justify="center">
    <NotFound404 width="400px" />
  </div>
</template>

<script>
import NotFound404 from '../components/NotFound404/NotFound404.vue';


export default {
  name: "NotFoundView",
  components: {
    NotFound404
  }
}
</script>

<style scoped></style>
 -->
 <template>
  <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
    <div class="d-flex text-h1 font-weight-black error-code">
      <span class="px-5">4</span>
      <span class="px-5 black--text">0</span>
      <span class="px-5">4</span>
    </div>
    <h2 class="headline mt-3 mb-2">Oops! Page not found</h2>
    <p class="grey--text text--lighten-1 mb-6">The page you're looking for doesn't exist or has been moved.</p>
    <v-btn color="BgColor" dark elevation="3" to="/">
      Back To Portfolio
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
.error-code { 
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
