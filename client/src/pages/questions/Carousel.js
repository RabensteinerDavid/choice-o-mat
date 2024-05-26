import React, { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import FotBar from "../../components/FotBar";
import "../../style/questions/carousel.css";
import HeadingQuestion from "../../components/HeadingQuestion";
import { Player } from "@lottiefiles/react-lottie-player";
import SelectionImage from "../../components/questions_images/SelectionImage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper';

const Carousel = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;

  const [focusedButtons, setFocusedButtons] = useState([]); // State für die fokussierten Buttons

  // const [swiperControl, setSwiperControl] = useState(null); //NEU

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
            <>
              <Swiper 
                watchSlidesProgress={true}
                slidesPerView={3.5}
                spaceBetween={60}
                autoplay={{ stopOnLastSlide: false}}
                loop={true}
                navigation={true}
                centeredSlides={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {answers.map((answer) => (
                  <SwiperSlide
                    key={answer._id}
                    className={`swiper-slide ${
                      focusedButtons.includes(answer._id) ? "focused" : ""
                    }`}
                    onClick={() => {
                      toggleFocus(answer._id);
                    }}
                  >
                    <div className="content-wrapper">
                      <div className="player-wrapper">
                      {answer.photo && answer.photo.includes("json") ? (
                        <Player
                          src={`http://localhost:3001/lottie/${answer.photo}`}
                          className="player"
                          loop
                          autoplay
                        />
                      ) : (
                        answer.photo && <SelectionImage photo={answer.photo} />
                      )}</div>
                      <p>{answer.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
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

export default Carousel;


