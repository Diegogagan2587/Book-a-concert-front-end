import{ PropTypes } from 'prop-types';
import RoundedButton from './buttons/RoundedButton';
import {useNavigate} from 'react-router-dom';

function ItemDataPanel(props) {
  const { title, description, price, date, city, organizer_name } = props.concert;
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/reserve');
  }
  
  return (
    <section className="flex flex-col gap-5 md:justify-between md:h-2/3 m-2 p-x-2 p-y-6">
      <div className="flex flex-col gap-5 ">
        <div>
          <h1 className="text-xl text-end font-bold">{title}</h1>
          <p className="text-sm text-right">{description}</p>
        </div>

        <div className="container shadow-md">
          <table className="text-sm w-full">
            <tbody>
              <tr className="bg-neutral-100">
                <td>Organized by:</td>
                <td>{organizer_name}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{date} </td>
              </tr>
              <tr className="bg-neutral-100">
                <td>City:</td>
                <td>{city}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>{price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container flex justify-end  w-full">
        <RoundedButton
          onClick={()=>handleReserveClick()}
          text="Reserve"
        />
      </div>
    </section>
  );
}

// We validate props below
ItemDataPanel.propTypes = {
  concert: PropTypes.shape({
    title: PropTypes.string.isRequired,
    organizer: PropTypes.string,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    organizer_name: PropTypes.string,
  }),
};

export default ItemDataPanel;
