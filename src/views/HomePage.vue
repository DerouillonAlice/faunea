<template>
  <div class="relative w-full overflow-hidden bg-white2">
    <!-- Contenu de la page -->
    <div class="relative">
      <img src="../assets/img/home_header.jpg" alt="Header Image" class="w-full h-[38rem] object-cover">
      <div class="absolute bottom-5 right-5 bg-coral text-white p-4 rounded-md">
        <h1 class="text-2xl font-bold text-white">À la rescousse des Animaux</h1>
      </div>
    </div>

    <!-- Arrow indicating to scroll down -->
    <div class="flex justify-center my-8">
      <button @click="scrollToFirstBlock">
        <svg class="animate-bounce w-24 h-24 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>

    <!-- Blocs animés -->
    <div ref="firstBlock" class="bg-sky p-8 text-center rounded-xl mx-4 my-8">
      <p class="text-2xl font-bold text-white2">Espèces menacées dans le monde</p>
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
      <p class="text-xl font-semibold text-blue-600">Découvre les espèces menacées par pays</p>
      <div class="flex justify-center">
    <Icon name="earth" size="120" color="white" strokeWidth="2" />
  </div>
  <router-link
    to="/map"
    class="bg-yellow-500 text-white py-2 px-6 rounded-full mt-6 inline-flex items-center justify-center font-bold hover:scale-110 transition-transform"
  >
    C'est parti !
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
      targetNumber: 46300,
      barData: [26, 12, 41, 21, 37], 
      doughnutData: [0, 100], 
      finalDoughnutData: [40, 60], 
      animationsCompleted: { // Indicateurs pour les animations
        barChart: false,
        doughnutChart: false,
        number: false,
        card2: false,
        card4: false,
      },
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === this.$refs.barChart && !this.animationsCompleted.barChart) {
            this.initBarChart();
            this.animationsCompleted.barChart = true;
          } else if (entry.target === this.$refs.doughnutChart && !this.animationsCompleted.doughnutChart) {
            this.initDoughnutChart();
            this.animationsCompleted.doughnutChart = true;
          } else if (entry.target === this.$refs.number && !this.animationsCompleted.number) {
            this.animateNumber();
            this.animationsCompleted.number = true;
            observer.unobserve(entry.target);
          } else if (entry.target === this.$refs.card2 && !this.animationsCompleted.card2) {
            this.animateCard2();
            this.animationsCompleted.card2 = true;
            observer.unobserve(entry.target);
          } else if (entry.target === this.$refs.card4 && !this.animationsCompleted.card4) {
            this.animateCard4();
            this.animationsCompleted.card4 = true;
            observer.unobserve(entry.target);
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
    scrollToFirstBlock() {
      this.$refs.firstBlock.scrollIntoView({ behavior: 'smooth' });
    },
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
      const initialData = this.barData.map(() => 0);
      this.barChart = new Chart(this.$refs.barChart, {
        type: 'bar',
        data: {
          labels: ['Mammifères', 'Oiseaux', 'Amphibiens', 'Reptiles', 'Requins & Raies'],
          datasets: [
            {
              label: 'Espèces menacées (%)',
              data: initialData,
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
          animation: {
            onComplete: (animation) => {
              const chart = animation.chart;
              chart.data.datasets[0].data = this.barData;
              chart.update();
            },
            duration: 5000,
          },
        },
      });
    },
    initDoughnutChart() {
      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }
      const initialData = [0, 60];
      this.doughnutChart = new Chart(this.$refs.doughnutChart, {
        type: 'doughnut',
        data: {
          labels: ['Pollué', 'Non pollué'],
          datasets: [
            {
              data: initialData,
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
          animation: {
            onComplete: (animation) => {
              const chart = animation.chart;
              chart.data.datasets[0].data = this.finalDoughnutData;
              chart.update();
            },
            duration: 1000,
          },
        },
      });
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
