<template>
    <div>
        <AppBarMain @scrollTo="scrollToSection" />
        <TapToView @turnOffLotti="turnOffLotti" />
        <div v-if="Lotti" class="pages">
            <div ref="profileSection">
                <ProfileSection @scrollTo="scrollToSection" />
            </div>
            <div ref="aboutSection">
                <AboutSection />

            </div>
            <div ref="projectSection">
                <ProjectSection />

            </div>
            <div ref="experienceSection">
                <Experience />

            </div>
            <div ref="contactSection">
                <ContactUs />

            </div>
            <!-- <div></div> -->


            <FooterMain />
        </div>
        <Snackbar/>
    </div>
</template>

<script>
import Snackbar from '../StaticContent/Snackbar.vue';
import TapToView from './components/TapToView.vue';
// import AppBarMain from './components/AppBar/main.vue';
// import AboutSection from './components/AboutSection.vue';
// import ProfileSection from './components/ProfileSection.vue';
// import ProjectSection from './components/ProjectSection.vue';
// import Experience from './components/Experience.vue';
// import ContactUs from './components/ContactUs.vue';
export default {
    name: "FirstPageMain",
    components: {
        AppBarMain: () => import('./components/AppBar/main.vue'),
        TapToView,
        ProfileSection: () => import('./components/ProfileSection.vue'),
        AboutSection: () => import('./components/AboutSection.vue'),
        ProjectSection : () => import('./components/ProjectSection.vue'),
        Experience: () => import('./components/Experience.vue'),
        ContactUs: () => import('./components/ContactUs.vue'),
        FooterMain: () => import('./components/Footer/main.vue'),
        Snackbar
    },
    data() {
        return {
            Lotti: false
        }
    },
    methods: {
        turnOffLotti(value) {
            this.Lotti = value
        },
        scrollToSection(section) {
            this.$refs[section].scrollIntoView({ behavior: "smooth" });
        }
    }
}
</script>
<style>
.appBarMain{
    position: absolute;
}
.pages{
    position: relative;
}
</style>