<template>
    <div class="contact-section">
        <v-container class="fill-height" :style="{ width: $vuetify.breakpoint.xs ? '90%' : '80%' }">
            <v-row class="d-flex flex-column text-center" no-gutters>
                <v-col>
                    <span class="text-h3 font-weight-bold" v-text="title">

                    </span>
                </v-col>
                <v-col class="d-flex align-center justify-center mt-2 ">
                    <p class="contact-divider"></p>
                </v-col>
                <v-col class="mt-3 d-flex justify-center ">
                    <v-col lg="7" class="">
                        <span class=" text-subtitle-1 grey--text text--lighten-1 text-center" v-text="header">
                        </span>
                    </v-col>

                </v-col>
            </v-row>

            <v-row>


                <v-col cols="12" md="4">

                    <div class="text-h4 font-weight-bold  pb-3">Contact Information</div>
                    <v-card elevation="4" class="pa-2 rounded-xl" color="grey lighten-5">
                        <v-row class="d-flex flex-row">
                            <v-col lg="12" md="12" sm="12" cols="12" v-for="(Contact, index) in ContactInfo"
                                :key="index">
                                <v-card outlined width="100%" height="100%" color="transparent">
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="2" lg="2" md="2"><v-avatar>
                                                    <v-icon class="mb-4" v-text="Contact.icon"></v-icon>
                                                </v-avatar>
                                            </v-col>
                                            <v-col>
                                                <div><span class="text-h6 font-weight-bold mb-1" color="black"
                                                        v-text="Contact.title"></span></div>
                                                <div><a :href="Contact.description"
                                                        v-if="Contact.title != 'Location'">{{
                                                            Contact.description }}</a>
                                                    <p class="grey--text" v-else v-text="Contact.description"></p>
                                                </div>


                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>


                </v-col>
                <v-col justify="center" class="d-flex justify-end">
                    <v-card class="rounded-xl pa-10 " color="grey lighten-5" max-width="700px" elevation="4">
                        <div class="text-h5 font-weight-bold  pb-6 ">Send Me a Message</div>

                        <v-row cols="12">
                            <v-col lg="6" cols="12"><v-text-field rounded-xl outlined label="Your Name"
                                    v-model="form.name" :rules="[() => !!form.name || 'This field is required']"
                                    class="rounded-lg"></v-text-field></v-col>

                            <v-col lg="6 " cols="12"><v-text-field outlined label="Your Email" v-model="form.email"
                                    :rules="[rules.required, rules.email]" class="rounded-lg"></v-text-field></v-col>
                            <v-col lg="12" cols="12"><v-text-field outlined label="Subject" name="input-7-4"
                                    v-model="form.subject" :rules="[() => !!form.subject || 'This field is required']"
                                    class="rounded-lg"></v-text-field></v-col>
                            <v-col lg="12" cols="12"><v-textarea outlined label="Message" name="input-7-4"
                                    v-model="form.message" :rules="[() => !!form.message || 'This field is required']"
                                    class="rounded-lg"> </v-textarea></v-col>
                            <v-col lg="12" class="d-flex justify-end">
                                <v-btn x-large @click="submitForm" color="teal" class="rounded-lg white--text"
                                    block>Submit
                                    Message &nbsp;
                                    <v-icon>mdi-send</v-icon></v-btn>
                            </v-col>
                        </v-row>


                    </v-card>


                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>

export default {
    name: "AboutSection",
    data() {
        return {
            title: this.$store.state.contact.title,
            header: this.$store.state.contact.header,
            form: this.$store.state.contact.form,
            ContactInfo: this.$store.state.contact.ContactInfo,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            }
        }
    },

    methods: {
        async submitForm() {
            const response = await fetch(this.form.formUrl, {
                method: this.form.methodType,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: this.form.access_key,
                    name: this.form.name,
                    email: this.form.email,
                    subject: this.form.subject,
                    message: this.form.message,
                }),
            });
            const result = await response.json();
            if (result.success) {
                console.log(result);
                this.MessageBar("S")
            } else {
                this.MessageBar("E")
            }
        },
    },
    mounted() {

    }
}
</script>
<style scoped>
.contact-divider {
    height: 35%;
    width: 7%;
    background: linear-gradient(teal, rgb(1, 160, 160));
}

.contact-section {
    height: 100%;
}
</style>