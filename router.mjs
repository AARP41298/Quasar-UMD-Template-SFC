//admin pages
import home from '/pages/admin/home.js'

import page2 from '/pages/admin/page2.js'
import page3 from '/pages/admin/page3.js'
import page4 from '/pages/admin/page4.js'

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
const {loadModule} = window["vue3-sfc-loader"];


function load(path) {
    return loadModule(path, options);
}

export default VueRouter.createRouter({
    // history: VueRouter.createWebHistory(),
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: '/', component: home, meta: {title: 'Home', icon: 'home'}},
        {path: '/page1', component: () => load('/pages/admin/page1.vue'), meta: {title: 'Page 1', icon: 'info'}},
        {path: '/page2', component: page2, meta: {title: 'Page 2', icon: 'lightbulb'}},
        {path: '/page3', component: page3, meta: {title: 'Page 3', icon: 'face'}},
        {path: '/page4', component: page4, meta: {title: 'Page 4', icon: 'settings'}},
    ]
})
