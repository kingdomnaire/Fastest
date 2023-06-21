<template>
    <main class="flex h-screen items-center justify-center bg-gray-200">
      <!-- quiz container -->
  
      <div
        class="overflow-hidden bg-white flex-none container relative shadow-lg rounded-lg px-12 py-6"
      >
        
  
        <!-- contents -->
        <div class="relative z-20">
          <!-- score container -->
          <div class="text-right text-gray-800">
            <p class="float-left font-bold">Fastest Fingers</p>
            <p class="text-sm leading-3">Score</p>
            <p class="font-bold">{{ score }}</p>
          </div>
  
          <!-- timer container -->
          <div class="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
            <div class="bg-blue-700 rounded-full w-11/12 h-full"></div>
          </div>
  
          <!-- question container -->
          <div
            class="rounded-lg bg-gray-100 p-2 neumorph-1 text-center font-bold text-gray-800 mt-8"
          >
            <div class="bg-white p-5">
              {{ currentQuestion.question }}
            </div>
          </div>
  
          <!-- options container -->
  
          <div class="mt-8">
            <!-- option container -->
            <div v-for="(choice, item) in currentQuestion.choices" :key="item">
              <div
              class="neumorph-1 option-default bg-gray-100 p-2 rounded-lg mb-3 relative"
              :ref="optionChosen"
              @click="onOptionClicked(choice,item)"
            >
              <div
                class="bg-blue-700 p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold absolute right-0 top-0 shadow-md"
              >
                <p class="transform -rotate-45">+1</p>
              </div>
              <div class="rounded-lg font-bold flex p-2">
                <!-- option ID -->
                <div class="p-3 rounded-lg">{{ item }}</div>
  
                <!-- option name -->
                <div class="flex items-center pl-6">{{ choice }}</div>
              </div>
            </div>
            </div>
          </div>
  
          <!-- progress indicator container -->
          <div class="mt-8 text-center">
            <div class="h-1 w-12 bg-gray-800 rounded-full mx-auto"></div>
            <p class="font-bold text-gray-800">{{questionCounter}}/{{questions.length}}</p>
          </div>
        </div>
      </div>
    </main>
  </template>

<script>
import { onMounted, ref } from 'vue'
export default{
    name:'QuickGame',
    setup(){
      //data
      let canClick = true;
      let score = ref(0);

      let questionCounter = ref(0);
      const currentQuestion = ref({
        question:"",
        answer:1,
        choices:[]
      })

      const questions = [
        {
          question: "Who was the father of Methuselah?",
          answer: 3,
          choices: ["Adam","Noah","Enoch","Lamech"],
        },
        {
          question: "Who was the first king of Israel?",
          answer: 1,
          choices: ["Saul","David","Solomon","Samuel"],
        },
        {
          question: "Who wrote the book of Job?",
          answer: 1,
          choices: ["Moses","David","Solomon","Job himself"],
        },
        {
          question: "Who was the high priest at the time of Jesus' crucifixion",
          answer: 1,
          choices: ["Caiaphas","Annas","Nicodemus","Gamaliel"],
        },
        {
          question: "Who was the mother of John the Baptist?",
          answer: 2,
          choices: ["Mary","Elizabeth","Rachel","Sarah"],
        },
      ];

      const loadQuestions = ()=> {
        canClick = true;
        //check fif there are more questions to load.
        if (questions.length > questionCounter.value){
          currentQuestion.value = questions[questionCounter.value];
          console.log('Current Question', currentQuestion.value);
          questionCounter.value++;
        }else{
          // no more question
          console.log('Out of questions');
        }
      };

      //methods/functions to know what was clicked
      let itemRef = []
      const optionChosen = (element) => {
        if(element){
          itemRef.push(element)
        }
      };

      const clearSelected = (divSelected) => {
        setTimeout(() => {
          divSelected.classList.remove("option-correct");
          divSelected.classList.remove("option-wrong");
          divSelected.classList.add("option-default");
          loadQuestions();
        },1000);
      }

      const onOptionClicked = (choice, item) => {
        if (canClick){
          const divContainer = itemRef[item];
        const optionID = item+1;
        if(currentQuestion.value.answer == optionID){
          console.log('correct Answer');
          score.value += 1;
          divContainer.classList.add("option-correct");
          divContainer.classList.remove("option-default");
        }else{
          console.log('wrong answer');
          divContainer.classList.add("option-wrong");
          divContainer.classList.remove("option-default");
        }
        canClick = false;
        //go to next question
        clearSelected(divContainer);
        console.log(choice, item)

        }else{
          console.log("cant select question");
        }
        
      }

      //life cycle hooks
      onMounted(() => {
        loadQuestions();
      });

      //return
      return {
        currentQuestion,
        questions,
        score,
        questionCounter,
        loadQuestions,
        onOptionClicked,
        optionChosen,
      }
    },
} 
</script>
  
  <style scoped>
  .neumorph-1 {
    box-shadow: 6px 6px 18px rgba(0, 0, 0, 0.09), -6px -6px 18px #ffffff;
  }
  .container {
    max-width: 400px;
    border-radius: 25px;
  }
  </style>
  