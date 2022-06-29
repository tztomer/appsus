import bookApp from '../js/apps/book/pages/book-app.cmp.js';
import homePage from '../js/pages/app-home.cmp.js';
// import aboutPage from './views/about-page.cmp.js';
// import bookDetails from './views/book-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    // {
    //     path: '/about',
    //     component: aboutPage
    // },
    {
        path: '/book',
        component: bookApp
    },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})