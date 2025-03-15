

<template>
    <div>
        <ProfileSection />
        <AboutSection/>
    </div>
</template>

<script >
import AboutSection from './components/AboutSection.vue';
import ProfileSection from './components/ProfileSection.vue';
export default {
    name: "FirstPageMain",
    components: {
        ProfileSection,
        AboutSection,
    },
}
</script>