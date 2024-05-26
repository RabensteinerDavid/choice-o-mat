import React, { useRef, useState } from "react";
import NavBar from "../../components/NavBar";
import FotBar from "../../components/FotBar";
import "../../style/questions/carousel.css";
import HeadingQuestion from "../../components/HeadingQuestion";
import { Player } from "@lottiefiles/react-lottie-player";
import SelectionImage from "../../components/questions_images/SelectionImage";
//swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper';
import useWindowDimensions from "../../components/useWindowSize";

const Carousel = ({ question, pageNumber, maxPage }) => {
  const { heading, subheading, answers } = question;

  const [focusedButtons, setFocusedButtons] = useState([]); 

  const { height, width } = useWindowDimensions()

  const toggleFocus = (id) => {
    setFocusedButtons(
      (prevState) =>
        prevState.includes(id)
          ? prevState.filter((buttonId) => buttonId !== id) 
          : [...prevState, id] 
    );
  };

  const getSlidesPerView = () => {
    if (window.innerWidth <= 400) return 1.5;
    if (window.innerWidth <= 650) return 2.5;
    return 3.5;
  };

  const getSpaceBetween = () => {
    if (window.innerWidth <= 650) return 20;
    if (window.innerWidth <= 768) return 28;
    if (window.innerWidth <= 992) return 34;
    if (window.innerWidth <= 1200) return 38;
    return 50;
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
                slidesPerView={getSlidesPerView()}
                spaceBetween={getSpaceBetween()}
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
              <div>{width}</div>
              <div>{height}</div>
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


