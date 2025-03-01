import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

const TextCard = ({ onDisappear, isReappearing, isFirstTime, allQuestionsUsed, currentQuestion }) => {
  const cardRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (isReappearing) {

      gsap.fromTo(
        cardRef.current,
        { scale: 0, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [isReappearing]);

  const handleDisappear = () => {
    setIsHidden(true);
    gsap.to(cardRef.current, {
      keyframes: [
        { scale: 1.1, rotate: -30, duration: 0.2, ease: "power1.out" },
        { scale: 0, rotateX: 45, opacity: 0.5, duration: 0.35, ease: "power2.out", onComplete: onDisappear },
      ],
    });
  };


  return (
    <div>
      <div
        ref={cardRef}
        className="card-text"
      >
        {!isHidden && 
          <div className="text-container">
            {(!isFirstTime && currentQuestion !== "") && (
              allQuestionsUsed ? (
                <h1 className="text">No More Questions</h1>
              ) : (
                <h1 className="text">{currentQuestion}</h1>
              )
            )}
            {!isFirstTime ? (
              <button
              onClick={handleDisappear}
              style={{cursor: "pointer"}}
              >
                {isFirstTime ? "Get a Question" : allQuestionsUsed ?  "Reset it" : "Get another"}
              </button>
            ) : (
              <div
                style={{display: "flex", height: "100%", justifyContent: "center"}}
              >
                <button
                onClick={handleDisappear}
                style={{cursor: "pointer", fontSize: "30px"}}
                >
                  {isFirstTime ? "Get a Question" : allQuestionsUsed ?  "Reset it" : "Get another"}
                </button>
              </div>
            )}
         
        </div>
       
        }
      </div>
    </div>
  );
};

TextCard.propTypes = {
  onDisappear: PropTypes.func.isRequired,
  isReappearing: PropTypes.bool,
  isFirstTime: PropTypes.bool.isRequired,
  allQuestionsUsed: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.string.isRequired
}

export default TextCard;
