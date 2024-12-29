<template>
  <nav class="flex justify-between md:justify-center items-center p-6 bg-peach font-dynapuff">
    <a href="/" class="flex items-center md:hidden">
      <img src="../assets/img/logo.png" alt="Logo Faunea" class="w-36">
    </a>
    <div class="hidden md:flex justify-center items-center gap-16">
      <router-link to="/" class="nav-link text-white flex items-center gap-2 transition-all hover:scale-[1.2]" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
        <Icon name="Home" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
        <span>Accueil</span>
      </router-link>

      <router-link to="/map" class="nav-link text-white flex items-center gap-2 transition-all hover:scale-[1.2]" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
        <Icon name="Map" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
        <span>Carte Interactive</span>
      </router-link>

      <a href="/" class="flex items-center">
        <img src="../assets/img/logo.png" alt="Logo Faunea" class="w-36">
      </a>

      <router-link to="/quiz" class="nav-link text-white flex items-center gap-2 transition-all hover:scale-[1.2]" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
        <Icon name="CircleHelp" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
        <span>Quizz</span>
      </router-link>

      <router-link to="/links" class="nav-link text-white flex items-center gap-2 transition-all hover:scale-[1.2]" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
        <Icon name="Link" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
        <span>En savoir +</span>
      </router-link>
    </div>
    <div class="md:hidden">
      <button @click="toggleMenu" class="text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full h-full bg-peach flex flex-col items-center justify-center z-50">
      <button @click="toggleMenu" class="absolute top-4 right-4 text-white focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <router-link @click="toggleMenu" to="/" class="nav-link text-white text-2xl my-4">
        Accueil
      </router-link>
      <router-link @click="toggleMenu" to="/map" class="nav-link text-white text-2xl my-4">
        Carte Interactive
      </router-link>
      <router-link @click="toggleMenu" to="/quiz" class="nav-link text-white text-2xl my-4">
        Quizz
      </router-link>
      <router-link @click="toggleMenu" to="/links" class="nav-link text-white text-2xl my-4">
        En savoir +
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<script setup>
import Icon from '../components/Icon.vue'; 
</script>


