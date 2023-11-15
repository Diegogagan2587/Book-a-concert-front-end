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
    centerMode: true,
    centerPadding: '60px',
    slidesToScroll: 3,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
    className: 'center border-2 flex items-center',
  };

  return (
    <div className="main-page container">
      <h2 className="text-center">Available Concerts</h2>
      <Slider {...settings}>
        {concerts.map((concert) => (
          <div key={concert.id}>
            <Link to={`/concerts/${concert.id}`}>
              <div className="concert-item flex flex-col bg-white">
                <img src={concert.img} alt={concert.title} />
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
