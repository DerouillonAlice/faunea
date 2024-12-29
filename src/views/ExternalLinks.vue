<template>
  <div class="p-6 bg-white2 min-h-screen">
    <h1 class="text-3xl font-bold text-coral mb-6 font-dynapuff text-center">Informations supplémentaires</h1>
    <p class="text-lg font-medium text-center mb-6">Découvrez comment vous pouvez aider à protéger les espèces en voie
      de disparition.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-sky p-6 rounded-xl text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Comment aider ?</h2>
        <ul class="text-lg text-white list-disc list-inside">
  <li class="flex items-center gap-2">
    <Icon name="Recycle" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
    Recycle et réduis tes déchets
    <button @click="showMoreInfo('recycle')" class="ml-2 flex items-center justify-center bg-white text-sky-500 h-8 w-8 rounded-full">
      <Icon name="ArrowRight" size="16" color="#0ea5e9" strokeWidth="2" />
    </button>
  </li>
  <li class="flex items-center gap-2">
    <Icon name="ShoppingBag" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
    Utilise moins de plastique
    <button @click="showMoreInfo('plastic')" class="ml-2 flex items-center justify-center bg-white text-sky-500 h-8 w-8 rounded-full">
      <Icon name="ArrowRight" size="16" color="#0ea5e9" strokeWidth="2" />
    </button>
  </li>
  <li class="flex items-center gap-2">
    <Icon name="Plant" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
    Plante des arbres
    <button @click="showMoreInfo('trees')" class="ml-2 flex items-center justify-center bg-white text-sky-500 h-8 w-8 rounded-full">
      <Icon name="ArrowRight" size="16" color="#0ea5e9" strokeWidth="2" />
    </button>
  </li>
  <li class="flex items-center gap-2">
    <Icon name="Droplet" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
    Économise l'eau
    <button @click="showMoreInfo('water')" class="ml-2 flex items-center justify-center bg-white text-sky-500 h-8 w-8 rounded-full">
      <Icon name="ArrowRight" size="16" color="#0ea5e9" strokeWidth="2" />
    </button>
  </li>
  <li class="flex items-center gap-2">
    <Icon name="Heart" size="24" color="white" strokeWidth="2" defaultClass="w-6 h-6" />
    Participe à des programmes de conservation
    <button @click="showMoreInfo('conservation')" class="ml-2 flex items-center justify-center bg-white text-sky-500 h-8 w-8 rounded-full">
      <Icon name="ArrowRight" size="16" color="#0ea5e9" strokeWidth="2" />
    </button>
  </li>
</ul>


      </div>

      <div class="bg-mint p-6 rounded-xl text-center">
        <h2 class="text-2xl font-bold text-white mb-4">Liens utiles</h2>
        <ul class="text-lg text-white list-disc list-inside">
          <li><a href="https://www.wwf.fr/" class="underline hover:text-yellow-500">WWF - Protection des espèces</a>
          </li>
          <li><a href="https://www.nationalgeographic.fr/" class="underline hover:text-yellow-500">National
              Geographic</a></li>
          <li><a href="https://www.iucnredlist.org/" class="underline hover:text-yellow-500">Liste rouge de l'UICN</a>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="moreInfo" class="mt-8 p-6 bg-white shadow-md rounded-xl">
      <h3 class="text-2xl font-bold text-coral mb-4">{{ moreInfo.title }}</h3>
      <p class="text-lg">{{ moreInfo.content }}</p>
      <button @click="closeMoreInfo" class="mt-4 bg-coral text-white py-2 px-4 rounded-full">Fermer</button>
    </div>

    <div class="mt-8 text-center">
      <h2 class="text-2xl font-bold text-coral mb-4">Fun Facts</h2>
      <p class="text-lg font-medium mb-4">Apprenez des faits amusants sur les animaux en voie de disparition !</p>
      <div class="relative w-full max-w-3xl mx-auto">
        <div class="overflow-hidden rounded-xl">
          <div class="flex transition-transform duration-500"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(fact, index) in funFacts" :key="index"
              :class="['min-w-full p-6 text-white text-center', colors[index % colors.length]]">
              <h3 class="text-xl font-bold mb-2">Le savais-tu ?</h3>
              <p>{{ fact }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <button v-for="(fact, index) in funFacts" :key="index" @click="currentSlide = index"
            class="w-4 h-4 mx-1 rounded-full"
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
          content: 'Recyclons pour protéger la planète ! Mets le papier, le plastique, le verre et le métal dans les bonnes poubelles. Utilise des objets réutilisables et transforme les restes de nourriture en compost pour le jardin.'
        },
        plastic: {
          title: 'Utilise moins de plastique',
          content: 'Le plastique pollue les océans et met très longtemps à disparaître. Prends un sac en tissu pour tes courses, une gourde au lieu d’une bouteille en plastique, et dis "non" aux pailles et aux couverts en plastique.'
        },
        trees: {
          title: 'Plante des arbres',
          content: 'Les arbres nettoient l’air et donnent de l’ombre. Plante un arbre avec ta classe ou ta famille ! Ils servent aussi de maison pour des animaux comme les oiseaux et les écureuils.'
        },
        water: {
          title: 'Économise l’eau',
          content: 'L’eau est précieuse, ne la gaspillons pas ! Prends des douches rapides, ferme le robinet quand tu te brosses les dents et arrose les plantes quand il fait frais pour ne pas perdre trop d’eau.'
        },
        conservation: {
          title: 'Aide à protéger les animaux',
          content: 'Beaucoup d’animaux sont en danger. Tu peux les aider ! Dessine des affiches pour en parler ou participe à des activités pour protéger la nature. Chaque geste compte pour sauver les animaux et leurs maisons.'
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

