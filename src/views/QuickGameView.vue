<template>
    <main class="flex h-screen items-center justify-center bg-gray-200">

      <!-- Quiz overlay -->
      <QuizCompleteOverlay v-if="endOfQuiz" :score="score"></QuizCompleteOverlay>

      <!-- quiz container -->
      <div
        class="overflow-hidden h-full bg-white flex-none container relative shadow-lg rounded-lg px-12 py-6"
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
            <div class="bg-blue-700 rounded-full w-11/12 h-full"
            :style="`width: ${timer}%`"
            ></div>
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
            <p class="text-gray-800">created for who wants to be a Rabbi © {{ new Date().getFullYear() }}</p>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import { onMounted, ref } from 'vue';
import QuizCompleteOverlay from '@/components/QuizCompleteOverlay.vue';
import axios from 'axios';
export default{
    name: "QuickGame",
    setup() {
        //data
        let canClick = true;
        let score = ref(0);
        let timer = ref(1000);
        let endOfQuiz = ref(false);
        let questionCounter = ref(0);
        const currentQuestion = ref({
            question: "",
            answer: 1,
            choices: []
        });
        const questions = [
            {
                question: "Which prophet prophesied the downfall of Nineveh?",
                answer: 2,
                choices: ["Jonah","Nahum", "Solomon", "Obadiah"],
            },
            {
                question: "Who killed the Canaanite king, Sisera?",
                answer: 4,
                choices: ["Samson","Gideon", "Deborah", "Jael"],
            },
            {
                question: "Which minor prophet saw a vision of a flying scroll and a woman in a basket?",
                answer: 1,
                choices: ["Zechariah","Hosea", "Nahum", "Malachi"],
            },
            {
                question: "Which minor prophet spoke about the restoration of Israel and the coming of Elijah?",
                answer: 4,
                choices: ["Joel","Malachi", "Amos", "Habakkuk"],
            },
            {
                question: "Which Psalm begins with the words, O Lord, 'You have searched me and known me'?",
                answer: 3,
                choices: ["Psalm 29","Psalm 119", "Psalm 139", "Psalm 27"],
            },
            {
                question: "Which Psalm declares, 'Blessed is he whose transgression is forgiven, Whose sin is covered'?",
                answer: 3,
                choices: ["Psalm 105","Psalm 19", "Psalm 32", "Psalm 51"],
            },
            {
                question: "On what mountain did Jesus transfigure before his disciples?",
                answer: 4,
                choices: ["Mount Ararat","Mount Sinai", "Mount Zion", "Mount Tabor"],
            },
            {
                question: "What were the names of the two thieves crucified alongside Jesus?",
                answer: 1,
                choices: ["Dismas and Gestas","Jaala and Uri", "Joses and Philemon", "Kemuel and Amaziah"],
            },
            {
                question: "What was the name of the high priest's servant whose ear was cut off during Jesus' arrest?",
                answer: 3,
                choices: ["Caiaphas","Barabbas", "Malchus", "Peter"],
            },
            {
                question: "Who was the Roman governor who kept Paul imprisoned for two years?",
                answer: 1,
                choices: ["Felix"," Pilate", "Festus", " Herod"],
            },
        ];
        const loadQuestions = () => {
            canClick = true;
            //check fif there are more questions to load.
            if (questions.length > questionCounter.value) {
                timer.value = 100;
                currentQuestion.value = questions[questionCounter.value];
                console.log("Current Question", currentQuestion.value);
                questionCounter.value++;
            }
            else {
                // no more question
                endOfQuiz.value = true;
                //console.log("Out of questions",score.value );
            }
        };
        //methods/functions to know what was clicked
        let itemRef = [];
        const optionChosen = (element) => {
            if (element) {
                itemRef.push(element);
            }
        };
        const clearSelected = (divSelected) => {
            setTimeout(() => {
                divSelected.classList.remove("option-correct");
                divSelected.classList.remove("option-wrong");
                divSelected.classList.add("option-default");
                loadQuestions();
                timer.value = 100;
            }, 1000);
        };

        const onOptionClicked = (choice, item) => {
  if (canClick) {
    const divContainer = itemRef[item];
    const optionID = item + 1;
    const isCorrect = currentQuestion.value.answer === optionID;
    
    if (isCorrect) {
      console.log("correct Answer");
      score.value += 1;
      divContainer.classList.add("option-correct");
      divContainer.classList.remove("option-default");
    } else {
      console.log("wrong answer");
      divContainer.classList.add("option-wrong");
      divContainer.classList.remove("option-default");
    }
    
    canClick = false;
    const timestamp = new Date().toISOString(); // Get the current timestamp
    saveQuestionResponse(currentQuestion.value.question, timestamp, isCorrect); // Save the question response with timestamp and correctness
    clearSelected(divContainer);
    //console.log(choice, item);
  } else {
    console.log("can't select question");
  }
};


        let interval; // Variable to hold the timer interval
        const countDownTimer = function () {
            interval = setInterval(() => {
                if (timer.value > 0) {
                    timer.value--;
                }
                else {
                    //console.log("timer is up");
                    clearInterval(interval);
                    loadQuestions();
                    countDownTimer();
                }
            }, 100);
        };

        // Save question response to the database (dummy implementation)
        const saveQuestionResponse = (question, timestamp, isCorrect) => {
  if (isCorrect) {
    console.log("Question:", question);
    const date = new Date(timestamp);
    const formattedTimestamp = `${date.toLocaleString()}:${date.getMilliseconds()}:${" score: " + score.value}`;
    console.log("Timestamp:", formattedTimestamp);
    
    // Here you can make an API call to send the question and 
    // timestamp to your backend or perform any other database operations
  
    // Get the _id value from the login local storage
    const loginData = JSON.parse(localStorage.getItem("login"));
    const _id = loginData?._id;
  
    if (_id) {
      // Create the data to be sent in the POST request
      const data = {
        id: _id,
        time: formattedTimestamp,
        //score: score.value,
      };
  
      // Perform the POST request using Axios
      axios
        .post("https://quizzes-bmo0.onrender.com/fingers", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle the error if needed
        });
    }
  }
};


        //when the Quiz ends
        const onQuizEnd = function(){
          score.value;

          //
        };
        //life cycle hooks
        onMounted(() => {
            loadQuestions();
            countDownTimer();
        });
        //return
        return {
            timer,
            currentQuestion,
            questions,
            score,
            questionCounter,
            loadQuestions,
            onOptionClicked,
            optionChosen,
            endOfQuiz,
            onQuizEnd,
        };
    },
    components: { QuizCompleteOverlay }
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
  