<template>
  <div class="relative w-full overflow-hidden bg-white2">
    <!-- Contenu de la page -->
    <div class="relative">
      <img src="../assets/img/home_header.jpg" alt="Header Image" class="w-full h-[30rem] object-cover">
      <div class="absolute bottom-5 right-5 bg-coral text-white p-4 rounded-md">
        <h1 class="text-2xl font-bold text-white">À la rescousse des Animaux</h1>
      </div>
    </div>

    <!-- Blocs animés -->
    <div class="bg-sky p-8 text-center rounded-xl mx-4 my-8" >
      <p class="text-2xl font-bold text-white2" >Espèces menacées dans le monde</p>
      <p ref="number" class="font-extrabold text-[60px] text-white2">{{ animatedNumber }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">

      <div ref="card2" class="bg-mint/30 p-6 rounded-xl text-center" data-aos="fade-top" data-aos-duration="1000">
        <p class="text-xl font-semibold text-mint mix-blend-multiply">Forêts détruites/an</p>
        <p ref="number2" class="text-3xl font-bold text-mint mix-blend-multiply">10M <span>ha</span></p>
      </div>

      <div ref="card4" class="bg-coral/30 p-6 rounded-xl text-center" data-aos="fade-top" data-aos-duration="1000" data-aos-delay="3000">
        <p class="text-xl font-semibold text-coral mix-blend-multiply">Température +°C</p>
        <p ref="number4" class="text-3xl font-bold text-coral mix-blend-multiply">1.5°C</p>
      </div>
    </div>

    <!-- Espèces menacées -->


    <!-- Bar Chart -->
    <div class="p-6 bg-white shadow-md rounded-xl mx-4 my-6">
      <p class="text-xl font-bold text-center text-peach mb-4">Pourcentage des espèces menacées</p>
      <canvas id="barChart" ref="barChart" class="max-h-[250px]"></canvas>
    </div>

    <!-- Doughnut Chart -->
    <div class="p-6 bg-white shadow-md rounded-xl mx-4 my-6">
      <p class="text-xl font-bold text-center text-sky mb-4">Pollution des océans</p>
      <canvas id="doughnutChart" ref="doughnutChart" class="max-h-[250px]"></canvas>
    </div>

    <!-- Découvrir les animaux -->
    <div class="text-center bg-sky p-8 rounded-xl mx-4 my-8">
      <p class="text-xl font-semibold text-blue-600">Découvre les animaux par région</p>
      <div class="flex justify-center">
    <Icon name="earth" size="120" color="white" strokeWidth="2" />
  </div>
  <router-link
    to="/map"
    class="bg-yellow-500 text-white py-2 px-6 rounded-full mt-6 inline-flex items-center justify-center"
  >
    Explore
  </router-link>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import anime from 'animejs';

Chart.register(...registerables);

export default {
  name: 'HomeViews',
  data() {
    return {
      barChart: null, 
      doughnutChart: null,
      animatedNumber: 0, 
      targetNumber: 41415,
      barData: [25, 30, 20, 15, 10], 
      doughnutData: [0, 100], 
      finalDoughnutData: [40, 60], 
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === this.$refs.barChart) {
            this.initBarChart();
          } else if (entry.target === this.$refs.doughnutChart) {
            this.initDoughnutChart();
            this.animateDoughnutChart(); 
          } else if (entry.target === this.$refs.number) {
            this.animateNumber();
            observer.unobserve(entry.target); // Arrêter l'observation une fois animé
          } else if (entry.target === this.$refs.card2) {
            this.animateCard2();
            observer.unobserve(entry.target); // Arrêter l'observation une fois animé
          } else if (entry.target === this.$refs.card4) {
            this.animateCard4();
            observer.unobserve(entry.target); // Arrêter l'observation une fois animé
          }
        }
      });
    });

    observer.observe(this.$refs.barChart);
    observer.observe(this.$refs.doughnutChart);
    observer.observe(this.$refs.number);
    observer.observe(this.$refs.card2);
    observer.observe(this.$refs.card4);
  },
  methods: {
    animateNumber() {
      anime({
        targets: this,
        animatedNumber: this.targetNumber,
        round: 1, 
        easing: 'easeOutExpo',
        duration: 2000,
      });
    },
    initBarChart() {
      if (this.barChart) {
        this.barChart.destroy();
      }
      this.barChart = new Chart(this.$refs.barChart, {
        type: 'bar',
        data: {
          labels: ['Mammifères', 'Oiseaux', 'Amphibiens', 'Reptiles', 'Poissons'],
          datasets: [
            {
              label: 'Espèces menacées (%)',
              data: this.barData,
              backgroundColor: ['#F78DA7', '#36A2EB', '#4BC0C0', '#FF9F40', '#FFCD56'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          animation: { duration: 1500 },
        },
      });
    },
    initDoughnutChart() {
      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }
      this.doughnutChart = new Chart(this.$refs.doughnutChart, {
        type: 'doughnut',
        data: {
          labels: ['Pollué', 'Non pollué'],
          datasets: [
            {
              data: this.doughnutData, // Données initiales
              backgroundColor: ['#36A2EB', '#FFCD56'], // Bleu pour pollué, jaune pour non pollué
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
          },
          animation: { duration: 0 }, // Pas d'animation par défaut
        },
      });
    },
    animateDoughnutChart() {
      const targetPollution = this.finalDoughnutData[0]; // 40%
      const totalDuration = 2000; // Durée totale de l'animation
      const stepDuration = 50; // Pas entre chaque mise à jour
      const steps = totalDuration / stepDuration; // Nombre d'étapes
      const increment = targetPollution / steps; // Progression à chaque étape

      let currentPollution = 0;

      const interval = setInterval(() => {
        currentPollution += increment;

        if (currentPollution >= targetPollution) {
          currentPollution = targetPollution; // Arrêter à la valeur cible
          clearInterval(interval);
        }

        // Mise à jour des données
        if (this.doughnutChart && this.doughnutChart.data && this.doughnutChart.data.datasets[0]) {
          this.doughnutChart.data.datasets[0].data = [
            currentPollution,
            100 - currentPollution,
          ];
          // Mettre à jour le graphique
          this.doughnutChart.update('none'); // 'none' désactive les animations internes
        }
      }, stepDuration);
    },
    animateCard2() {
      anime({
        targets: this.$refs.card2,
        opacity: [0, 1],
        translateY: [-100, 0],
        easing: 'easeOutExpo',
        duration: 1000,
      });
    },
    animateCard4() {
      anime({
        targets: this.$refs.card4,
        opacity: [0, 1],
        translateY: [-100, 0],
        easing: 'easeOutExpo',
        duration: 1000,
      });
    },
  },
};
</script>

<script setup>
import Icon from '../components/Icon.vue'; 
</script>
