import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./AboutCarousel.css";

const slides = [
  {
    id: 1,
    img: "./images/project_management.jpg",
    title: "Project Management",
    text: "We are committed to delivering excellence through our real estate developments. Our vision is to create sustainable and modern communities.",
  },
  {
    id: 2,
    img: "./images/slide2.png",
    title: "Environmental Precautions",
    text: "With years of experience and customer trust, we provide premium plots that are ideally located for growth and investment.",
  },
  {
    id: 3,
    img: "./images/slide3.png",
    title: "Quality Assurance",
    text: "Delivering not just plots but future-ready investments that come with trust, transparency, and growth potential.",
  },
];

const AboutCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div
      id="about-banners"
      className="carousel slide about-carousel"
    >

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === 0 ? "active" : ""}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          ></button>
        ))}
      </div>

      <div className="carousel-inner about-embla__viewport" ref={emblaRef}>
        <div className="about-embla__container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item about-embla__slide ${
                index === 0 ? "active" : ""
              }`}
            >
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img
                    src={slide.img}
                    className="d-block w-100"
                    alt={slide.title}
                  />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center p-4">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          className="carousel-control-prev bg-dark"
          style={{ marginLeft: "510px" }}
          type="button"
          onClick={scrollPrev}
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next bg-dark"
          style={{ marginRight: "510px" }}
          type="button"
          onClick={scrollNext}
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default AboutCarousel;
