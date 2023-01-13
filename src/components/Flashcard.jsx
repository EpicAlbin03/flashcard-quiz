import { useState, useEffect, useRef } from "react";

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  useEffect(setMaxHeight, [
    flashcard.question,
    flashcard.answer,
    flashcard.option,
  ]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className="card bg-base-100 shadow-xl justify-center items-center cursor-pointer
       hover:shadow-gray-300 hover:-top-0.5"
      style={{
        transform: `perspective(1000px) ${flip ? "rotateY(180deg)" : ""}`,
        transformStyle: "preserve-3d",
        transition: "150ms",
        height: height,
      }}
      onClick={() => setFlip(!flip)}
    >
      <div
        className="card-body absolute left-0 frontSide"
        style={{ backfaceVisibility: "hidden" }}
        ref={frontEl}
      >
        <h2 className="card-title">{flashcard.question}</h2>
        {flashcard.options.map((option) => {
          return <p key={option}>{option}</p>;
        })}
      </div>
      <div
        className="card-body absolute backSide"
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        ref={backEl}
      >
        <p className="font-bold">{flashcard.answer}</p>
      </div>
    </div>
  );
}
export default Flashcard;
