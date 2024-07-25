import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ReservationItem = ({ reservation }) => {
  const { concert_id, concert_title:title, city, date} = reservation;
  const concerts = useSelector((state) => state.concerts.created);
  const concert = concerts.find((concert) => concert.id === concert_id);
  const img = concert ? concert.img : 'Image not available';
  const description = concert
    ? concert.description
    : 'Description not available';
  return (
    <li>
      {/*I'm not passing the key because
        it is assigned by Parent component RegularList.jsx*/}
      <div className="img-container">
        <img src={img} alt="Concert Image" />
      </div>
      <div className="bottom">
        <div className="concert_title">{title}</div>
        <div className="concert_description overflow-y-auto">{description}</div>
        <div className="city-date">
          <div>{date}</div>
          <div>{city}</div>
        </div>
      </div>
    </li>
  );
};

ReservationItem.propTypes = {
  reservation: PropTypes.shape({
    concert_id: PropTypes.string.isRequired,
    concert_title: PropTypes.string,
    city: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReservationItem;
