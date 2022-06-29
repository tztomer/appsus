export default {
    template: `
    <header class="app-header">
       <div class="logo">
           <h3>Appsus!</h3>
       </div>
       <nav class="nav-bar">
            <router-link to="/">Home</router-link>|
            <router-link to="/emails">Mail</router-link>|
            <router-link to="/keep">Keep</router-link>|
            <router-link to="/book">book</router-link>|
            <router-link to="/about">About</router-link>|
        </nav>
    </header>
   `,
}