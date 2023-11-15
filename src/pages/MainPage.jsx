import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import LeftButton from '../components/buttons/LeftButton';
import RightButton from '../components/buttons/RightButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MainPage() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch('https://book-a-concert-api.onrender.com/concerts')
      .then((response) => response.json())
      .then((data) => setConcerts(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust the number of slides to show
    slidesToScroll: 1,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
  };

  return (
    <div className="main-page container">
      <h1>Available Concerts</h1>
      <Slider {...settings}>
        {concerts.map((concert) => (
          <div key={concert.id}>
            <Link to={`/concerts/${concert.id}`}>
              <div className="concert-item">
                <img src={concert.img} alt={concert.title} className="w-md" />
                <h2>{concert.title}</h2>
                <p>{concert.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainPage;
