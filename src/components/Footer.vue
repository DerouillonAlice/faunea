<template>
    <footer class="flex justify-center items-center gap-8 bg-peach text-white py-4 px-6">
      <div class="flex items-center gap-4">
        <img src="../assets/img/logo_2.png" alt="Logo de l'application" class="w-12 h-12">

      </div>
  
      <span class="text-sm">© {{ year }} Tous droits réservés. Crée par Alice Derouillon</span>
    </footer>
  </template>
  
  <script setup>
  const year = new Date().getFullYear();
  </script>
  

  