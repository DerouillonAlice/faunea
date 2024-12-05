<template>
    <div class="relative w-full h-full overflow-hidden bg-white2">
  <div class="quiz p-4 max-w-3xl mx-auto text-center ">
    <h1 class="text-3xl font-bold text-coral mb-4 font-dynapuff">Quiz : Teste tes connaissances sur les espèces menacées !</h1>
    <p class="text-lg font-medium">Question {{ currentQuestionIndex + 1 }}/{{ questions.length }}</p>
    <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div 
      class="bg-peach h-4 rounded-full transition-all duration-300" 
      :style="{ width: progress + '%' }"
      ></div>
    </div>
    
    <p class="text-xl font-semibold my-4">{{ currentQuestion?.question }}</p>


    <div v-if="questions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button 
        v-for="(option, index) in currentQuestion.options" 
        :key="index" 
        @click="checkAnswer(option.isCorrect)"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {{ option.text }}
      </button>
    </div>

    <p v-if="message" class="text-lg font-semibold mt-4" :class="{'text-green-500': isCorrect, 'text-red-500': !isCorrect}">
      {{ message }}
    </p>

    <div v-if="quizCompleted" class="mt-8">
      <h2 class="text-2xl font-bold">Quiz terminé !</h2>
      <p class="text-lg font-medium">Ton score : {{ score }}/{{ questions.length }}</p>
      <button 
        @click="resetQuiz" 
        class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
      >
        Recommencer
      </button>
    </div>
  </div>
</div>
</template>

<script>
import questionsData from "../assets/questions.json"; 

export default {
  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      message: '',
      isCorrect: false,
      quizCompleted: false,
      questions: []
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
      }
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
