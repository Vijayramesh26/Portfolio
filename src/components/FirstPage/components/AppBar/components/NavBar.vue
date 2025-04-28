<template>
  <div class="text-center">
    <v-bottom-sheet v-model="OpenSheet" persistent>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-item v-for="menu in menubar" :key="menu.title" @click="MoveToScreen(menu.to)">
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <!-- <img :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`" :alt="tile.title"> -->
              <v-icon color="teal" v-text="menu.icon"></v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    sheet: false,
    menubar: null,
  }),
  methods: {
    MoveToScreen(value) {
      this.$emit('OpenBottomSheet')
      this.$emit('scrollTo', value)
    }
  },
  mounted(){
    this.menubar= this.$store.state.appbar.menu
  },
  props: {
    OpenSheet: Boolean
  }
}
</script>