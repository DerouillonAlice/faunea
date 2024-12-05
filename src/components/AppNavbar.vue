<template>
  <nav class="flex justify-center items-center gap-16 p-6 bg-peach font-dynapuff">
    <router-link to="/" class="nav-link text-white flex items-center gap-2" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
      <Icon name="Home" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
      <span>Accueil</span>
    </router-link>

    <router-link to="/map" class="nav-link text-white flex items-center gap-2" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
      <Icon name="Map" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
      <span>Carte Interactive</span>
    </router-link>

    <a href="/">
      <img src="../assets/img/logo.png" alt="Logo Faunea" class="w-36">
    </a>

    <router-link to="/quiz" class="nav-link text-white flex items-center gap-2" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
      <Icon name="CircleHelp" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
      <span>Quizz</span>
    </router-link>

    <router-link to="/links" class="nav-link text-white flex items-center gap-2" active-class="scale-[1.2] bg-coral p-2 px-3 rounded-3xl ">
      <Icon name="Link" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
      <span>Actions et Liens</span>
    </router-link>
  </nav>
</template>


<script>
export default {
  name: 'AppNavbar',
}
</script>

<script setup>
import Icon from '../components/Icon.vue'; 
</script>

<!-- <style>
.text-mint-600 { color: #6BCB77; }
.text-coral-500 { color: #F47C7C; }
.bg-sky-100 { background-color: #E3F2FD; }
.border-peach-500 { border-color: #FFA559; }
</style> -->
