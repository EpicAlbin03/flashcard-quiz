import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  return (
    <div
      className="grid items-center gap-4"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      }}
    >
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}

export default FlashcardList;
