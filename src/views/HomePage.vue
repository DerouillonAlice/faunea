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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
      <div ref="card1" class="bg-peach/30 p-6 rounded-xl text-center" data-aos="fade-left" data-aos-duration="1000">
        <p class="text-xl font-semibold text-peach mix-blend-multiply ">Mammifères menacés</p>
        <p ref="number1" class="text-3xl font-bold text-peach mix-blend-multiply ">1,199</p>
      </div>
      <div ref="card2" class="bg-mint/30 p-6 rounded-xl text-center" data-aos="fade-right" data-aos-duration="1000">
        <p class="text-xl font-semibold text-mint mix-blend-multiply ">Forêts détruites/an</p>
        <p ref="number2" class="text-3xl font-bold text-mint mix-blend-multiply ">10M <span>ha</span></p>
      </div>
      <div ref="card3" class="bg-sky/30 p-6 rounded-xl text-center" data-aos="fade-left" data-aos-duration="1000">
        <p class="text-xl font-semibold text-sky mix-blend-multiply">Océans pollués</p>
        <p ref="number3" class="text-3xl font-bold text-sky mix-blend-multiply ">40%</p>
      </div>
      <div ref="card4" class="bg-coral/30 p-6 rounded-xl text-center" data-aos="fade-right" data-aos-duration="1000">
        <p class="text-xl font-semibold text-coral mix-blend-multiply ">Température +°C</p>
        <p ref="number4" class="text-3xl font-bold text-coral mix-blend-multiply">1.5°C</p>
      </div>
    </div>

    <!-- Espèces menacées -->
    <div class="bg-peach p-8 text-center rounded-xl mx-4 my-8">
      <p class="text-2xl font-bold text-white2">Espèces menacées dans le monde</p>
      <p ref="number" class="font-extrabold text-[80px] text-white2">{{ number }}</p>
    </div>

    <!-- Découvrir les animaux -->
    <div class="text-center bg-sky p-8 rounded-xl mx-4 my-8">
      <p class="text-2xl font-semibold text-blue-600">Découvre les animaux par région</p>
      <a href="./InteractiveMap" class="bg-yellow-500 text-white py-2 px-4 rounded-full mt-4">Explore</a>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  name: 'HomeViews',
  data() {
    return {
      number: 0
    };
  },
  mounted() {
    // Observer pour vérifier si l'élément est visible à l'écran
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation des chiffres
          if (entry.target === this.$refs.number) {
            anime({
              targets: this.$refs.number,
              innerText: [0, 41415],
              round: 1,
              easing: 'easeInOutQuad',
              duration: 2000
            });
          } else if (entry.target === this.$refs.number1) {
            anime({
              targets: this.$refs.number1,
              innerText: [0, 1199],
              round: 1,
              easing: 'easeInOutQuad',
              duration: 2000,
            });
          } else if (entry.target === this.$refs.number2) {
            anime({
              targets: this.$refs.number2,
              innerText: [0, 10],
              round: 1,
              easing: 'easeInOutQuad',
              duration: 2000,
              update: (anim) => {
                // Ajoute 'M ha' après le nombre
                entry.target.innerHTML = `${Math.round(anim.animations[0].currentValue)}M ha`;
              }
            });
          } else if (entry.target === this.$refs.number3) {
            anime({
              targets: this.$refs.number3,
              innerText: [0, 40],
              round: 1,
              easing: 'easeInOutQuad',
              duration: 2000
            });
          } else if (entry.target === this.$refs.number4) {
            anime({
              targets: this.$refs.number4,
              innerHTML: [0, 1.5], // Anime la valeur de 0 à 1.5
              easing: 'easeInOutQuad',
              duration: 2000,
              update: (anim) => {
                // Ajoute '°C' après la valeur animée
                this.$refs.number4.innerHTML = `${parseFloat(anim.animations[0].currentValue).toFixed(1)}°C`;
              }
            });
          }

          // Animation des cartes
          anime({
            targets: entry.target,
            translateX: [100, 0], // Déplacer les cartes de la droite vers la position finale
            opacity: [0, 1],       // Fait apparaître les cartes progressivement
            duration: 1000,
            easing: 'easeOutQuad'
          });

          // Une fois l'animation lancée, on arrête d'observer l'élément
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // Lorsque l'élément est visible à 50% de l'écran
    });

    // Observer toutes les cartes et le nombre
    observer.observe(this.$refs.number);
    observer.observe(this.$refs.number1);
    observer.observe(this.$refs.number2);
    observer.observe(this.$refs.number3);
    observer.observe(this.$refs.number4);
    observer.observe(this.$refs.card1);
    observer.observe(this.$refs.card2);
    observer.observe(this.$refs.card3);
    observer.observe(this.$refs.card4);
  }
};
</script>
