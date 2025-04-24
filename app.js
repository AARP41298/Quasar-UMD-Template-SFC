import {user} from '/store/user.mjs'             //user state


//router
import router from '/router.mjs'

router.beforeEach(async (to, from) => {
    if (to.path == '/') return true
    //no match - goto root
    if (!to.matched.length) {to.fullPath = '/'; return true}
    //if not logged -> login dialog
    if (!user.token) {
        setTimeout(function() {user.loginDialog.show = true}, 200)
        await user.token
    }
})
Vue.$router = router


const options = {
    moduleCache: {
        vue: Vue, 'vue-router': VueRouter
    },

    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), {res});

        // make test.js be treated as an mjs file
        if (url.endsWith("/test.js")) {
            return {
                getContentData: async (asBinary) => { // asBinary is unused here, we know it is a text file

                    return await res.text();
                },
                type: ".mjs",
            }
        }

        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },

    addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },

    log(type, ...args) {
        console.log(type, ...args);
    }
}

const {loadModule, version} = window["vue3-sfc-loader"];

const app = Vue.createApp({
    components: {
        // 'layout-adm':layout_adm,
        // 'layout-lnd':layout_lnd,
        // 'landing-page':landing,
        // 'login-dialog':login
        'layout-adm': Vue.defineAsyncComponent(() => loadModule('/layout/admin.vue', options)),
        'layout-lnd': Vue.defineAsyncComponent(() => loadModule('/layout/landing.vue', options)),
        'landing-page': Vue.defineAsyncComponent(() => loadModule('/pages/landing.vue', options)),
        'login-dialog': Vue.defineAsyncComponent(() => loadModule('/components/login.vue', options)),
    },

    setup() {
        const {onMounted} = Vue
        const $q = Quasar.useQuasar()

        onMounted(async () => {
            //auto dark mode
            $q.dark.set('auto')

            //load user from localstorage   
            Object.assign(user, JSON.parse(localStorage.getItem('user')))
        })

        return {user}
    },

    template: `
        <q-layout view="hHh LpR fFf">                             
            <!-- Layout (Header and Drawer) -->
            <layout-adm v-if="user.token"></layout-adm>                        
            <layout-lnd v-if="!user.token"></layout-lnd>
                
            <!-- Main content -->
            <q-page-container>
                <q-page class="row">
                    <div class="col">
                        <div class="column full-height">
                            <q-scroll-area class="col">
                                <router-view v-if="user.token"></router-view>
                                <landing-page v-if="!user.token"></landing-page>
                            </q-scroll-area>
                        </div>
                    </div>
                </q-page>
            </q-page-container>

            <!-- login dialog -->
            <login-dialog></login-dialog>  
        </q-layout>
    `,
});

/*app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('q-')
}*/
app.use(router)
app.use(Quasar)
app.mount('#app')