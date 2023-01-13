import { useState, useEffect, useRef } from "react";
import FlashcardList from "./components/FlashcardList";
import axios from "axios";
import { decode } from "he";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decode(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decode(a)),
              answer,
            ];

            return {
              id: `${index}-${Date.now()}`,
              question: decode(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <>
      <form
        className="flex flex-col flex-wrap justify-end items-center bg-neutral-content"
        onSubmit={handleSubmit}
      >
        <div className="form-control w-full max-w-xs m-2">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            className="select select-bordered select-primary w-full max-w-xs"
            ref={categoryEl}
          >
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-control w-full max-w-xs m-2">
          <label className="label">
            <span className="label-text">Number of Questions</span>
          </label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue={5}
            ref={amountEl}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs m-4">
          <button className="btn btn-primary">Generate</button>
        </div>
      </form>

      <div className="mx-8 my-4">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
