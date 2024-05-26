import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import FotBar from "../../components/FotBar";
import "../../style/questions/selection.css";
import HeadingQuestion from "../../components/HeadingQuestion";
import SelectionImage from "../../components/questions_images/SelectionImage";

const Selection = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;

  const [focusedButtons, setFocusedButtons] = useState([]); // State für die fokussierten Buttons

  const toggleFocus = (id) => {
    setFocusedButtons(
      (prevState) =>
        prevState.includes(id)
          ? prevState.filter((buttonId) => buttonId !== id) // Entferne den Fokus, wenn der Button bereits fokussiert ist
          : [...prevState, id] // Füge den Fokus hinzu, wenn der Button nicht fokussiert ist
    );
  };

  return (
    <div className="question-list">
      <NavBar />
      <div className="main">
        {question ? (
          <React.Fragment>
            <HeadingQuestion heading={heading} subheading={subheading} />
            <div className="answer-grid">
              {answers.map((answer) => (
                <>
                  <button
                    key={answer._id}
                    className={`answer-element ${
                      focusedButtons.includes(answer._id) ? "focused" : ""
                    }`}
                    onClick={() => toggleFocus(answer._id)}
                  >
                    {answer.text}
                    {focusedButtons.includes(answer._id) && (
                    <div className="circle">
                      <div className="checkMark"></div>
                    </div>         //selected-icon für check mark im grünen Kreis, wenn ein Button gedrückt ist
                  )}
                  </button>
                  
                </>
              ))}
            </div>
          </React.Fragment>
        ) : (
          <p>No questions found at question </p>
        )}
      </div>
      <FotBar
        prevQuestion={pageNumber === 1 ? 1 : pageNumber - 1}
        nextQuestion={pageNumber === maxPage ? maxPage : pageNumber + 1}
      />
    </div>
  );
};

export default Selection;
