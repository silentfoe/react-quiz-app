import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import Button from "./Components/Button";
import QuestionCard from "./Components/QuestionCard";

// to do list ******
// 1) need to make the answers that come back from the API appear in a random way.
// 2) need to give each answer a key value and set the key value in state
// 3) need to create button to check answers
// 4) shows which answers are correct when clicking the check answers button
// 5) display the score at the bottom of the page once the show answer button is clicked
// 6)
// 7)
// 8)

function App() {
  //setting state for the home page. Will only show questions if state is set to false.
  const [homePage, setHomePage] = useState(true);
  //grabbing the data from the API to show the questions, category, type of questions(ie: boolean or multiple choice), and give every object an id.
  const [quizData, setQuizData] = useState([]);

  console.log(quizData);

  //grab the question data from the open trivia API (https://opentdb.com/api.php?amount=5)
  useEffect(() => {
    // taking the api data using base 64 encoding
    const url = "https://opentdb.com/api.php?amount=5&encode=base64";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //setting variable for the API results
        const quizDataResults = data.results;

        //setting the state for the quiz data at strings by decoding the base 64 using atob()
        setQuizData(
          quizDataResults.map((obj) => {
            return {
              category: atob(obj.category),
              type: atob(obj.type),
              question: atob(obj.question),
              correct_answer: atob(obj.correct_answer),
              incorrect_answers: obj.incorrect_answers.map((answer) =>
                atob(answer)
              ),
              id: nanoid(),
            };
          })
        );
      });
  }, []);

  // !!! need to set the quizAnswers state with the data from the quizData state. need to have a new state to hold all the answers to the questions and then randomize the questions from that state.

  const questionCard = quizData.map((obj) => {
    return (
      <QuestionCard
        key={obj.id}
        id={obj.id}
        question={obj.question}
        correctAnswer={obj.correct_answer}
        incorrectAnswer={obj.incorrect_answers}
      />
    );
  });

  //function that changes the state of the home page to show the start button or the questions depending on if it's true or false.
  function startQuiz() {
    setHomePage(!homePage);
  }

  // start of the App component
  return (
    <main>
      {homePage ? ( // if the homepage state is set to true, then this will show the start quiz button along with the home page
        <div className="start-page-container">
          <h1>Quizzical</h1>
          <h3>
            Select an answer for each question to see if you know your stuff!
          </h3>
          <Button clickHandler={startQuiz} />
        </div>
      ) : (
        //else if the homepage state is false, show the questions

        <div>{questionCard}</div>
      )}
    </main>
  );
}

export default App;
