<template>
    <v-container fluid class="d-flex flex-column align-center" style="height: 100vh; overflow: hidden;">
      <div class="cards-container">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card-wrapper"
          :style="{
            transform: `translateY(${getOffset(index)}px)`,
            zIndex: cards.length - index,
          }"
        >
          <v-card class="parallax-card" width="350" height="200" elevation="10">
            <v-card-title class="text-center">{{ card.title }}</v-card-title>
            <v-card-text class="text-center text-grey-darken-2">
              {{ card.content }}
            </v-card-text>
          </v-card>
        </div>
      </div>
  
      <!-- Normal scrolling content after cards are fully visible -->
      <v-container v-if="scrollEnabled" class="scroll-content">
        <p class="text-center">Now you can scroll!</p>
        <p v-for="n in 10" :key="n">More content...</p>
      </v-container>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const cards = ref([
    { title: "Card 1", content: "This is the first card." },
    { title: "Card 2", content: "This is the second card." },
    { title: "Card 3", content: "This is the third card." },
    { title: "Card 4", content: "This is the fourth card." },
  ]);
  
  const scrollY = ref(0);
  const scrollEnabled = ref(false);
  
  const handleScroll = () => {
    scrollY.value = window.scrollY;
  
    // Enable scrolling when all cards have been fully revealed
    if (scrollY.value >= (cards.value.length - 1) * 120) {
      scrollEnabled.value = true;
    }
  };
  
  const getOffset = (index) => {
    const baseOffset = index * 80; // Controls how much each card moves up
    const scrollOffset = Math.max(0, scrollY.value - index * 100); // Controls parallax effect
    return baseOffset - scrollOffset;
  };
  console.log(getOffset);
  
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  </script>
  
  <style scoped>
  .cards-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .parallax-card {
    transition: transform 0.3s ease-out;
  }
  
  .scroll-content {
    margin-top: 50px;
    text-align: center;
  }
  </style>
  


<template>
  <v-container class="py-12" fluid>
    <!-- Header -->
    <v-row justify="center" class="text-center mb-8">
      <v-col cols="12" md="8">
        <h1 class="text-4xl font-bold">About Me</h1>
        <p class="text-subtitle-1 mt-2">
          I'm a passionate full-stack developer with expertise in building modern web applications.
          I create seamless, efficient, and scalable solutions for complex problems.
        </p>
      </v-col>
    </v-row>

    <!-- Get to Know Me + Skills -->
    <v-row>
      <!-- Get to Know Me -->
      <v-col cols="12" md="6">
        <h2 class="text-xl font-bold mb-4">🚀 Get to know me!</h2>
        <v-list dense class="text-body-1">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Hey there! I'm a Full Stack Web Developer passionate about crafting dynamic, user-friendly web apps.
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                💡 I share insights on web dev to help others grow. Let's connect on LinkedIn or Instagram!
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                📬 Open to exciting opportunities! Let’s connect if you're building impactful digital experiences.
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Skills -->
      <v-col cols="12" md="6">
        <h2 class="text-xl font-bold mb-4">🧠 My Skills</h2>
        <v-row dense>
          <v-col v-for="(skill, index) in skills" :key="index" cols="4" class="d-flex justify-center mb-4">
            <v-card class="pa-3 d-flex flex-column align-center justify-center" elevation="4"
              style="width: 80px; height: 80px; border-radius: 16px" color="grey lighten-4">
              <v-img :src="skill.icon" width="36" height="36" contain />
              <span class="text-caption mt-2 text-center">{{ skill.name }}</span>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Info Cards -->
    <v-row class="mt-12" dense>
      <v-col v-for="(card, index) in infoCards" :key="index" cols="12" md="6" lg="3" class="mb-4">
        <v-card class="pa-4" elevation="6">
          <v-card-title class="font-weight-bold mb-2">
            <v-icon left class="mr-2">{{ card.icon }}</v-icon>
            {{ card.title }}
          </v-card-title>
          <v-card-text class="text-body-2">{{ card.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
export default {
  data() {
    return {
      skills :[
        { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Nuxt.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
        { name: "Vuetify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Golang", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
        { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-icon.svg" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" }
      ],

 infoCards :[
        {
          title: "My Journey",
          icon: "mdi-laptop",
          description: "My passion for coding began in college and evolved into a career solving real-world problems. I’m constantly learning and improving."
        },
        {
          title: "Work Philosophy",
          icon: "mdi-code-tags-check",
          description: "I write clean, maintainable code that balances performance and user experience. I value collaboration and transparency."
        },
        {
          title: "Education & Learning",
          icon: "mdi-school",
          description: "Bachelor’s degree in IT from Meenakshi Engineering College. I continually learn through online courses, docs, and real projects."
        },
        {
          title: "Beyond Coding",
          icon: "mdi-coffee",
          description: "I enjoy reading tech blogs, experimenting in the kitchen, mentoring juniors, and engaging in local dev meetups."
        }
      ]
    }
  }
}

</script>
