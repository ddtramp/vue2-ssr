import Vue from 'vue'
import { createApp } from './app'

// GET DATA METHOD 2
// Vue.mixin({
//     beforeMount () {
//         const { asyncData } = this.$options
//         if (asyncData) {
//             // 将获取数据操作分配给 promise
//             // 以便在组件中，我们可以在数据准备就绪后
//             // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
//             this.dataPromise = asyncData({
//                 store: this.$store,
//                 route: this.$route
//             })
//         }
//     }
// })

// 客户端特定引导逻辑……
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// GET DATA METHOD 1
// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }



        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {

                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    })

    // app.$mount('#app', true) or NODE_ENV = production hydrate will be active;
    // data-server-rendered="true" can be founded at #app element;
    // when development, discard existing DOM  
    app.$mount('#app')
})