export default {
  template: `
    <section class="main-nav">
  
        <router-link to="/email" @click.native="$emit('clicked')" exact class="nav-link">
        <span class="note-icon-container">
        <i class="fas fa-envelope"></i>
    </span>
      
        </router-link>
        <router-link to="/keep" @click.native="$emit('clicked')" class="nav-link">
        <span class="note-icon-container"><i class="note-icon fas fa-lightbulb"></i></span>
    
        </router-link>
        <router-link to="/book" @click.native="$emit('clicked')" class="nav-link">
        <i class="fas fa-book"></i>
     
         </router-link>
         <router-link to="/" @click.native="$emit('clicked')" exact class="nav-link">
         <i class="home-icon fas fa-home"></i>
      
         </router-link>
        <router-link to="/about" @click.native="$emit('clicked')" class="nav-link">
        <i class="fas fa-address-card"></i>
  
        </router-link>
    </section>
    `,
};
