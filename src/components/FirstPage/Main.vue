<template>
    <div>
        <!-- ── WebGL 3D Particle Mesh (primary background) ── -->
        <WebGLBackground />

        <!-- ── Floating Glassmorphic Navbar ── -->
        <transition name="fade">
            <AppBarMain v-if="Lotti" @scrollTo="scrollToSection" />
        </transition>

        <!-- ── Terminal bootloader ── -->
        <TapToView v-if="!Lotti" @turnOffLotti="turnOffLotti" />

        <!-- ── Main portfolio sections ── -->
        <transition name="fade">
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
                <FooterMain />
            </div>
        </transition>

        <Snackbar />
    </div>
</template>

<script>
import Snackbar      from '../StaticContent/Snackbar.vue';
import TapToView     from './components/TapToView.vue';
import WebGLBackground from './components/WebGLBackground.vue';

export default {
    name: "FirstPageMain",
    components: {
        AppBarMain:     () => import('./components/AppBar/main.vue'),
        TapToView,
        WebGLBackground,
        ProfileSection: () => import('./components/ProfileSection.vue'),
        AboutSection:   () => import('./components/AboutSection.vue'),
        ProjectSection: () => import('./components/ProjectSection.vue'),
        Experience:     () => import('./components/Experience.vue'),
        ContactUs:      () => import('./components/ContactUs.vue'),
        FooterMain:     () => import('./components/Footer/main.vue'),
        Snackbar,
    },
    data() {
        return { Lotti: false };
    },
    methods: {
        turnOffLotti(value) { this.Lotti = !value; },
        scrollToSection(section) {
            this.$refs[section].scrollIntoView({ behavior: 'smooth' });
        },
    },
};
</script>

<style>
.pages {
    position: relative;
    z-index: 1;       /* sit above WebGL canvas */
}
</style>