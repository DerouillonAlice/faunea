<template>
  <div class="relative w-full min-h-screen bg-white2 flex items-center justify-center p-4">
    <div class="quiz bg-white shadow-xl rounded-xl p-6 max-w-2xl text-center flex flex-col items-center">
      <h1 v-if="!quizCompleted" class="text-3xl font-bold text-coral mb-6 font-dynapuff">
        Quiz : Teste tes connaissances sur les espèces menacées !
      </h1>
      <p v-if="!quizCompleted" class="text-lg font-medium text-gray-600">
        Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}
      </p>
      <div v-if="!quizCompleted" class="w-full bg-gray-200 rounded-full h-4 my-4">
        <div 
          class="bg-coral h-4 rounded-full transition-all duration-300" 
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <img v-if="!quizCompleted && currentQuestion?.image" 
           :src="currentQuestion?.image" 
           alt="Question Image" 
           class="w-full h-48 object-cover rounded-lg mb-6">

      <p v-if="!quizCompleted" class="text-xl font-semibold mb-4 text-gray-700">
        {{ currentQuestion?.question }}
      </p>

      <div v-if="!quizCompleted && questions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          v-for="(option, index) in currentQuestion.options" 
          :key="index" 
          @click="checkAnswer(option.isCorrect)"
          class="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
        >
          {{ option.text }}
        </button>
      </div>

      <p v-if="message && !quizCompleted" 
         class="text-lg font-semibold mt-6" 
         :class="{'text-green-500': isCorrect, 'text-red-500': !isCorrect}">
        {{ message }}
      </p>

      <div v-if="quizCompleted" class="mt-8 text-center">
        <h2 class="text-4xl font-bold text-orange-600 mb-4">Quiz terminé ! 🎉</h2>
        <p class="text-3xl font-bold text-green-500 mb-4">Ton score : {{ score }}/{{ questions.length }}</p>
        <p class="text-lg font-medium text-gray-700 mb-6">{{ finalMessage }}</p>
        <div class="flex justify-center gap-4">
          <button 
            @click="resetQuiz" 
            class="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
          >
            Recommencer
          </button>
          <a href="/links" 
            class="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Découvrir plus
          </a>
        </div>
      </div>
      <canvas ref="confettiCanvas" class="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
    </div>
  </div>
</template>


<script>
import questionsData from "../assets/questions.json"; 
import confetti from 'canvas-confetti';

export default {
  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      message: '',
      isCorrect: false,
      quizCompleted: false,
      questions: [],
      finalMessage: ''
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    progress() {
      return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    }
  },
  methods: {
    async loadQuestions() {
      this.questions = questionsData; 
    },
    checkAnswer(isCorrect) {
      this.isCorrect = isCorrect;
      if (isCorrect) {
        this.score++;
        this.message = "Bonne réponse ! 🎉";
      } else {
        this.message = "Mauvaise réponse. 😢";
      }
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      this.message = '';
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.quizCompleted = true;
        this.finalMessage = this.getFinalMessage();
        this.launchConfetti();
      }
    },
    getFinalMessage() {
      if (this.score <= 3) {
        return "Pas grave, c'est un bon début ! On apprend plein de choses en essayant. Tu peux recommencer pour améliorer ton score ! 🌱";
      } else if (this.score <= 6) {
        return "Bravo ! Tu connais déjà pas mal de choses sur les espèces menacées. Continue à apprendre pour devenir un expert ! 🐾";
      } else if (this.score <= 9) {
        return "Super ! Tu es presque un spécialiste des animaux menacés. Encore un peu d'effort pour atteindre la perfection ! 🌟";
      } else {
        return "Félicitations ! Tu es un véritable protecteur des animaux et un as des connaissances sur les espèces menacées ! 🏆🐼";
      }
    },
    launchConfetti() {
      const duration = 5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#bb0000', '#ffffff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#bb0000', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    },
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.message = '';
      this.quizCompleted = false;
    }
  },
  created() {
    this.loadQuestions();
  }
};
</script>
