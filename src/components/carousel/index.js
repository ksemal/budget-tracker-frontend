import React from "react";

import Carousel from "react-bootstrap/Carousel";
import image1 from "../../images/bg1.jpg";
import image2 from "../../images/bg2.jpg";
import image3 from "../../images/bg3.jpg";

import "./style.css";
const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>
          <h3 className="carousel-text">Welcome to ExpenseJar</h3>
          <p className="carousel-text">
            Your simple Budget Tracker Application
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Third slide" />

        <Carousel.Caption>
          <h3 className="carousel-text">Tracking System</h3>
          <p className="carousel-text">
            Track your income, expenses, and bills throughout the month
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image3} alt="Third slide" />
        <Carousel.Caption>
          <h3 className="carousel-text">Charts</h3>
          <p className="carousel-text">
            Visual representations help you to analyze data quickly
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
