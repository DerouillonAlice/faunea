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
    <div class="bg-peach p-8 text-center rounded-xl mx-4 my-8">
      <p class="text-2xl font-bold text-white2">Espèces menacées dans le monde</p>
      <p ref="number" class="font-extrabold text-[60px] text-white2">{{ animatedNumber }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">

      <div ref="card2" class="bg-mint/30 p-6 rounded-xl text-center" data-aos="fade-right" data-aos-duration="1000">
        <p class="text-xl font-semibold text-mint mix-blend-multiply">Forêts détruites/an</p>
        <p ref="number2" class="text-3xl font-bold text-mint mix-blend-multiply">10M <span>ha</span></p>
      </div>

      <div ref="card4" class="bg-coral/30 p-6 rounded-xl text-center" data-aos="fade-right" data-aos-duration="1000">
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
      <a href="./InteractiveMap" class="bg-yellow-500 text-white py-2 px-4 rounded-full mt-4">Explore</a>
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
      barChart: null, // Référence pour le Bar Chart
      doughnutChart: null, // Référence pour le Doughnut Chart
      animatedNumber: 0, // Nombre animé
      targetNumber: 41415, // Valeur finale pour l'animation
      barData: [25, 30, 20, 15, 10], // Données pour le Bar Chart
      doughnutData: [40, 60], // Données pour le Doughnut Chart
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
          } else if (entry.target === this.$refs.number) {
            this.animateNumber();
            observer.unobserve(entry.target);
          }
        }
      });
    });

    observer.observe(this.$refs.barChart);
    observer.observe(this.$refs.doughnutChart);
    observer.observe(this.$refs.number);
  },
  methods: {
    animateNumber() {
      anime({
        targets: this,
        animatedNumber: this.targetNumber,
        round: 1, // Arrondi à l'entier
        easing: 'easeOutExpo',
        duration: 2000,
      });
    },
    initBarChart() {
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
      this.doughnutChart = new Chart(this.$refs.doughnutChart, {
        type: 'doughnut',
        data: {
          labels: ['Pollué', 'Non pollué'],
          datasets: [
            {
              data: this.doughnutData,
              backgroundColor: ['#36A2EB', '#FFCD56'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
          },
          animation: { duration: 1500 },
        },
      });
    },
  },
};

</script>
