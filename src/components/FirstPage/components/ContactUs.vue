<template>
  <div class="contact-section py-16" id="contactSection">
    <v-container :style="{ width: $vuetify.breakpoint.xs ? '95%' : '85%' }">

      <!-- ── Consistent Section Heading ── -->
      <div class="text-center mb-12 reveal" ref="heading">
        <div class="code-font text-caption section-comment mb-2">// POST /v1/contact</div>
        <h2 class="section-title mb-0" v-text="title"></h2>
        <div class="section-bar"></div>
        <p class="section-subtitle text-body-1 mt-2" v-text="header"></p>
      </div>

      <!-- ── API Client Window ── -->
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <div class="api-window glass-panel pa-0 reveal from-bottom delay-1" ref="apiWindow">

            <!-- Window chrome -->
            <div class="api-chrome d-flex align-center px-5 py-3 border-bottom">
              <span class="ide-dot red mr-1"></span>
              <span class="ide-dot yellow mr-1"></span>
              <span class="ide-dot green mr-3"></span>
              <span class="code-font text-caption font-weight-bold grey--text text--darken-3">REST API CLIENT — web3forms</span>
              <v-spacer></v-spacer>
              <span class="teal-dot pulse-dot mr-1"></span>
              <span class="code-font text-caption teal--text font-weight-bold" style="font-size:10px;">Connected</span>
            </div>

            <!-- URL bar -->
            <div class="url-bar px-5 py-4 d-flex flex-wrap align-center border-bottom">
              <div class="url-row d-flex flex-grow-1 rounded-lg overflow-hidden border mr-md-4 mb-2 mb-md-0">
                <div class="method-pill px-4 py-2 white--text code-font font-weight-bold d-flex align-center">POST</div>
                <input disabled value="https://api.web3forms.com/submit"
                  class="url-input flex-grow-1 px-3 code-font text-caption"/>
              </div>
              <!-- Desktop Send Button (Hidden on Mobile) -->
              <v-btn depressed class="send-btn d-none d-md-inline-flex rounded-xl font-weight-bold white--text px-6 py-5"
                color="teal darken-1" :loading="submitting" @click="submitForm">
                <v-icon left small>mdi-send-outline</v-icon> Send Request
              </v-btn>
            </div>

            <!-- Body: Form + JSON -->
            <v-row class="ma-0" no-gutters>

              <!-- LEFT: form -->
              <v-col cols="12" md="5" class="pa-5 form-col">
                <div class="code-font text-caption font-weight-bold grey--text text--darken-2 mb-4 d-flex align-center">
                  <v-icon x-small class="mr-1" color="teal">mdi-tune-variant</v-icon> REQUEST PARAMS
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="form.name" outlined dense color="teal" class="rounded-lg mb-1 code-font"
                    label='name  (String)' :rules="[v => !!v || 'Required']"/>
                  <v-text-field v-model="form.email" outlined dense color="teal" class="rounded-lg mb-1 code-font"
                    label='email  (Email)' :rules="[rules.required, rules.email]"/>
                  <v-text-field v-model="form.subject" outlined dense color="teal" class="rounded-lg mb-1 code-font"
                    label='subject  (String)' :rules="[v => !!v || 'Required']"/>
                  <v-textarea v-model="form.message" outlined dense color="teal" class="rounded-lg code-font mb-4"
                    label='message  (Text)' rows="4" :rules="[v => !!v || 'Required']"/>
                    
                  <!-- Mobile Send Button (Hidden on Desktop) -->
                  <v-btn depressed block class="send-btn d-flex d-md-none rounded-xl font-weight-bold white--text py-5"
                    color="teal" :loading="submitting" @click="submitForm">
                    <v-icon left small>mdi-send-outline</v-icon> Send Request
                  </v-btn>
                </v-form>

                <!-- Contact info -->
                <div class="border-top pt-4 mt-2 d-flex flex-column">
                  <div v-for="info in ContactInfo" :key="info.title"
                    class="d-flex align-center mb-2 text-caption grey--text text--darken-2">
                    <v-icon x-small color="teal" class="mr-2">{{ info.icon }}</v-icon>
                    <span class="font-weight-medium">{{ info.description }}</span>
                  </div>
                </div>
              </v-col>

              <!-- Vertical divider -->
              <v-divider vertical class="d-none d-md-flex"></v-divider>

              <!-- RIGHT: JSON preview + response -->
              <v-col cols="12" md="7" class="d-flex flex-column pa-0">

                <!-- Request body preview -->
                <div class="pa-5 border-bottom">
                  <div class="code-font text-caption font-weight-bold grey--text text--darken-2 mb-3 d-flex align-center">
                    <v-icon x-small class="mr-1" color="indigo">mdi-code-braces</v-icon> REQUEST BODY (Live Preview)
                  </div>
                  <div class="json-block pa-4 rounded-lg code-font text-caption">
                    <div>{</div>
                    <div class="pl-4"><span class="syntax-prop">"name"</span>: <span class="syntax-string">"{{ form.name || '…' }}"</span>,</div>
                    <div class="pl-4"><span class="syntax-prop">"email"</span>: <span class="syntax-string">"{{ form.email || '…' }}"</span>,</div>
                    <div class="pl-4"><span class="syntax-prop">"subject"</span>: <span class="syntax-string">"{{ form.subject || '…' }}"</span>,</div>
                    <div class="pl-4"><span class="syntax-prop">"message"</span>: <span class="syntax-string">"{{ form.message || '…' }}"</span></div>
                    <div>}</div>
                  </div>
                </div>

                <!-- Response panel -->
                <div class="pa-5 flex-grow-1">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <div class="code-font text-caption font-weight-bold grey--text text--darken-2 d-flex align-center">
                      <v-icon x-small class="mr-1" color="orange darken-1">mdi-console</v-icon> RESPONSE
                    </div>
                    <span v-if="submitted"
                      class="status-chip code-font text-caption font-weight-bold px-3 py-1 rounded-lg"
                      :class="success ? 'status-ok' : 'status-err'">
                      {{ success ? '✓ HTTP 200 OK' : '✗ HTTP 500 ERROR' }}
                    </span>
                  </div>

                  <!-- Idle -->
                  <div v-if="!submitting && !submitted" class="json-block pa-4 rounded-lg code-font text-caption grey--text">
                    { <div class="pl-4"><span class="syntax-prop">"status"</span>: <span class="syntax-string">"awaiting_request"</span></div> }
                  </div>

                  <!-- Loading -->
                  <div v-if="submitting" class="json-block pa-4 rounded-lg d-flex align-center justify-center" style="min-height:90px;">
                    <v-progress-circular indeterminate size="22" width="2" color="teal" class="mr-3"></v-progress-circular>
                    <span class="teal--text code-font text-caption font-weight-bold">Dispatching…</span>
                  </div>

                  <!-- Success -->
                  <transition name="fade">
                    <div v-if="!submitting && submitted && success" class="json-block pa-4 rounded-lg code-font text-caption success-block">
                      {
                      <div class="pl-4"><span class="syntax-prop">"code"</span>: <span class="syntax-num">200</span>,</div>
                      <div class="pl-4"><span class="syntax-prop">"status"</span>: <span class="syntax-string">"success"</span>,</div>
                      <div class="pl-4"><span class="syntax-prop">"message"</span>: <span class="syntax-string">"Dispatched! I'll reply soon 🚀"</span></div>
                      }
                    </div>
                  </transition>

                  <!-- Error -->
                  <transition name="fade">
                    <div v-if="!submitting && submitted && !success" class="json-block pa-4 rounded-lg code-font text-caption error-block">
                      {
                      <div class="pl-4"><span class="syntax-prop">"code"</span>: <span class="syntax-num">500</span>,</div>
                      <div class="pl-4"><span class="syntax-prop">"status"</span>: <span class="syntax-string">"failed"</span>,</div>
                      <div class="pl-4"><span class="syntax-prop">"fallback"</span>: <span class="syntax-string">"vijayramesh26301@gmail.com"</span></div>
                      }
                    </div>
                  </transition>
                </div>

              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      title:       this.$store.state.contact.title,
      header:      this.$store.state.contact.header,
      ContactInfo: this.$store.state.contact.ContactInfo,
      form: { ...this.$store.state.contact.form },
      valid: false, submitting: false, submitted: false, success: false,
      rules: {
        required: v => !!v || 'Required.',
        email:    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email.',
      },
    };
  },
  mounted() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.1 });
    this.$el.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) return;
      this.submitting = true; this.submitted = false;
      try {
        const res = await fetch(this.$store.state.contact.form.formUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: this.$store.state.contact.form.access_key,
            name: this.form.name, email: this.form.email,
            subject: this.form.subject, message: this.form.message,
          }),
        });
        const r = await res.json();
        this.success = !!r.success;
        if (this.success) {
          this.form.name = ''; this.form.email = '';
          this.form.subject = ''; this.form.message = '';
          this.$refs.form.resetValidation();
        }
      } catch { this.success = false; }
      finally { this.submitting = false; this.submitted = true; }
    },
  },
};
</script>

<style scoped>
.contact-section { background: transparent !important; min-height: 100vh; }

/* API window */
.api-window { border-radius: 16px !important; overflow: hidden; }
.api-chrome { background: rgba(241,245,249,0.65); }
.url-bar { background: rgba(253,254,255,0.9); }
.url-row { border-color: rgba(226,232,240,0.9) !important; overflow: hidden; }
.method-pill { background: #0d9488; font-size: 11px; min-width: 56px; }
.url-input { background: rgba(248,250,252,0.5); border: none; outline: none; font-size: 12px; color: #475569; }
.send-btn { letter-spacing: 0.4px; text-transform: capitalize; }

/* Form */
.form-col { background: rgba(253,254,255,0.95); }
.border-top { border-top: 1px solid rgba(226,232,240,0.8); }
.border-bottom { border-bottom: 1px solid rgba(226,232,240,0.8); }

/* JSON */
.json-block {
  background: rgba(248,250,252,0.85);
  border: 1px solid rgba(226,232,240,0.9);
  line-height: 1.75; min-height: 76px;
}
.success-block { border-color: rgba(22,163,74,0.35) !important; background: rgba(240,253,244,0.8) !important; }
.error-block   { border-color: rgba(220,38,38,0.35) !important;  background: rgba(254,242,242,0.8) !important; }

/* Status badge */
.status-chip { font-size: 10px; }
.status-ok  { background: rgba(22,163,74,0.1);  color: #16a34a; border: 1px solid rgba(22,163,74,0.25); }
.status-err { background: rgba(220,38,38,0.1); color: #dc2626; border: 1px solid rgba(220,38,38,0.25); }
</style>