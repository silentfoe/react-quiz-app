import Question from "./Question";
import { nanoid } from "nanoid";

export default function QuestionCard({
  question,
  correctAnswer,
  incorrectAnswer,
  id,
}) {
  //combining the correct answer and the incorrect answers into one array
  const answersArray = [correctAnswer, ...incorrectAnswer];
  // mapping over each answer and putting it inside a button. Adding key so not to get an error in the console.
  const answers = answersArray.map((answer) => (
    <button key={nanoid()}>{answer}</button>
  ));
  console.log(answersArray);
  // !!! still need to randomize the answers for them not to be in the same order. Use a function in order to randomize and then push to a new array? Should I build a new component for the answers?

  return (
    <div>
      <h1>{question}</h1>
      {answers}
      <hr />
    </div>
  );
}
