<template>
  <div class="p-6 bg-white2 min-h-screen">
    <h1 class="text-4xl font-bold text-coral mb-8 font-dynapuff text-center">Sauvons les animaux ensemble !</h1>
    <p class="text-lg font-medium text-center mb-10 text-gray-700">Découvre comment tu peux contribuer à la protection des espèces en voie de disparition.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
  <!-- Section "Comment Aider ?" -->
  <div class="bg-sky shadow-lg p-8 rounded-2xl">
    <h2 class="text-3xl font-bold text-white mb-6">Comment devenir un super-héros de la nature ? 🦸‍♂️
    </h2>
    <ul class="space-y-6">
      <li class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="Recycle" size="28" color="#0ea5e9" strokeWidth="2" />
        </div>
        <div class="text-white text-lg font-medium">Recycle et réduis tes déchets</div>
        <button @click="showMoreInfo('recycle')" class="ml-auto bg-white text-sky-500 h-10 w-10 rounded-full shadow-md flex items-center justify-center">
          <Icon name="ArrowRight" size="20" color="#0ea5e9" strokeWidth="2" />
        </button>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="ShoppingBag" size="28" color="#0ea5e9" strokeWidth="2" />
        </div>
        <div class="text-white text-lg font-medium">Utilise moins de plastique</div>
        <button @click="showMoreInfo('plastic')" class="ml-auto bg-white text-sky-500 h-10 w-10 rounded-full shadow-md flex items-center justify-center">
          <Icon name="ArrowRight" size="20" color="#0ea5e9" strokeWidth="2" />
        </button>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="TreePine" size="28" color="#0ea5e9" strokeWidth="2" />
        </div>
        <div class="text-white text-lg font-medium">Plante des arbres</div>
        <button @click="showMoreInfo('trees')" class="ml-auto bg-white text-sky-500 h-10 w-10 rounded-full shadow-md flex items-center justify-center">
          <Icon name="ArrowRight" size="20" color="#0ea5e9" strokeWidth="2" />
        </button>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="Droplet" size="28" color="#0ea5e9" strokeWidth="2" />
        </div>
        <div class="text-white text-lg font-medium">Économise l'eau</div>
        <button @click="showMoreInfo('water')" class="ml-auto bg-white text-sky-500 h-10 w-10 rounded-full shadow-md flex items-center justify-center">
          <Icon name="ArrowRight" size="20" color="#0ea5e9" strokeWidth="2" />
        </button>
      </li>
      <li class="flex items-center gap-4">
        <div class="bg-white p-4 rounded-full shadow-lg flex items-center justify-center">
          <Icon name="Heart" size="28" color="#0ea5e9" strokeWidth="2" />
        </div>
        <div class="text-white text-lg font-medium">Participe à des programmes de conservation</div>
        <button @click="showMoreInfo('conservation')" class="ml-auto bg-white text-sky-500 h-10 w-10 rounded-full shadow-md flex items-center justify-center">
          <Icon name="ArrowRight" size="20" color="#0ea5e9" strokeWidth="2" />
        </button>
      </li>
    </ul>
  </div>

  <!-- Section "Liens Utiles" -->
  <div class="bg-mint shadow-lg p-8 rounded-2xl">
  <h2 class="text-3xl font-bold text-white mb-6">Pour en savoir plus ! 📚</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <a href="https://www.wwf.fr/" target="_blank" class="block bg-white transition-all hover:scale-[110%] p-6 rounded-xl shadow-md hover:shadow-lg text-center">
      <div class="text-mint-600 text-2xl font-bold mb-4">WWF</div>
      <p class="text-gray-700">Protection des espèces</p>
    </a>
    <a href="https://www.nationalgeographic.fr/" target="_blank" class="block bg-white transition-all hover:scale-[110%] p-6 rounded-xl shadow-md hover:shadow-lg text-center">
      <div class="text-mint-600 text-2xl font-bold mb-4">National Geographic</div>
      <p class="text-gray-700">Explorer le monde</p>
    </a>
    <a href="https://www.iucnredlist.org/" target="_blank" class="block bg-white transition-all hover:scale-[110%] p-6 rounded-xl shadow-md hover:shadow-lg text-center">
      <div class="text-mint-600 text-2xl font-bold mb-4">Liste Rouge</div>
      <p class="text-gray-700">UICN - Espèces menacées</p>
    </a>
  </div>
</div>

</div>


    <div v-if="moreInfo" class="mt-12 p-8 bg-white shadow-xl rounded-2xl">
      <h3 class="text-3xl font-bold text-coral mb-6">{{ moreInfo.title }}</h3>
      <p class="text-lg text-gray-700">{{ moreInfo.content }}</p>
      <button @click="closeMoreInfo" class="mt-6 bg-coral text-white py-3 px-6 rounded-full shadow-md hover:bg-coral-dark">Fermer</button>
    </div>

    <div class="mt-16 text-center">
      <h2 class="text-3xl font-bold text-coral mb-6">Découvre des faits incroyables !</h2>
      <p class="text-lg font-medium text-gray-700 mb-6">Apprend des faits amusants sur les animaux en voie de disparition !</p>
      <div class="relative w-full max-w-3xl mx-auto">
        <div class="overflow-hidden rounded-2xl shadow-lg">
          <div class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(fact, index) in funFacts" :key="index"
              :class="['min-w-full p-8 text-white text-center', colors[index % colors.length]]">
              <h3 class="text-2xl font-bold mb-4">Le savais-tu ? 🤔</h3>
              <img :src="fact.image" alt="Fun fact image" class="mx-auto mb-4 w-32 h-32 object-cover border-4 border-white rounded-full">
              <p>{{ fact.text }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-6">
          <button v-for="(fact, index) in funFacts" :key="index" @click="currentSlide = index"
            class="w-5 h-5 mx-1 rounded-full"
            :class="{ 'bg-coral': currentSlide === index, 'bg-gray-300': currentSlide !== index }"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import funFacts from '../assets/funFacts.js';

export default {
  name: 'LinksViews',
  data() {
    return {
      currentSlide: 0,
      funFacts,
      colors: ['bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500'],
      moreInfo: null,
      infoContent: {
        recycle: {
          title: 'Recycle et réduis tes déchets',
          content: 'Deviens un super-héros du recyclage ! Trie tes déchets dans les bonnes poubelles et transforme les restes de nourriture en super-compost pour le jardin ! 🦸‍♂️'
        },
        plastic: {
          title: 'Utilise moins de plastique',
          content: 'Le plastique pollue les océans et met très longtemps à disparaître. Prends un sac en tissu pour tes courses, une gourde au lieu d’une bouteille en plastique, et dis "non" aux pailles et aux couverts en plastique.'
        },
        trees: {
          title: 'Plante des arbres',
          content: 'Deviens ami avec la nature ! Plante des arbres et des fleurs pour créer des maisons pour les animaux et les insectes ! 🌳'
        },
        water: {
          title: 'Économise l’eau',
          content: 'Chaque goutte compte ! Ferme le robinet quand tu te brosses les dents et prends une douche rapide comme un ninja ! '
        },
        conservation: {
          title: 'Aide à protéger les animaux',
          content: 'Rejoins le club des protecteurs des animaux ! Participe à des actions pour aider les espèces menacées avec ta famille ! ❤️'
        }
      }
    };
  },
  methods: {
    showMoreInfo(type) {
      this.moreInfo = this.infoContent[type];
    },
    closeMoreInfo() {
      this.moreInfo = null;
    }
  }
}
</script>

<script setup>
import Icon from '../components/Icon.vue'; 
</script>
