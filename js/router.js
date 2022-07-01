import bookApp from '../js/apps/book/pages/book-app.cmp.js';
import homePage from '../js/pages/app-home.cmp.js';
// import emailsList from '../js/apps/emails/pages/email-app.cmp.js';
import noteDetails from '../js/apps/keep/pages/note-details.cmp.js';
import aboutPage from '../js/pages/app-about.cmp.js';
import keepApp from '../js/apps/keep/pages/note-index.cmp.js';
import bookDetails from '../js/apps/book/pages/book-details.cmp.js';
import emailApp from '../js/apps/emails/pages/email-app.cmp.js';
import emailDetails from '../js/apps/emails/pages/email-details.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  { path: '/email:filter?', component: emailApp },
  { path: '/email/:emailId', component: emailDetails },
  { path: '/email/reply/:emailId', component: emailApp },

  {
    path: '/keep',
    component: keepApp,
  },
  {
    path: '/keep/:noteId',
    component: noteDetails,
    props: true,
  },
  {
    path: '/book/:bookId',
    component: bookDetails,
  },
];

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});
