import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updatedAvailability,
  resetAvailability,
  filteredUserReservations
} from '../redux/slices/reservationSlice';
import getReservations from '../redux/requests/getReservations';
import DropDownSelect from '../components/buttons/DropDownSelect';
import RoundedButton from '../components/buttons/RoundedButton';
import postReservation from '../redux/requests/postReservation';
import imgURL from '../assets/img/pexels-photo-1387174.jpeg';


function ReserveConcertPage() {
  const current_user = useSelector((state) => state.user.details);
  const [successMessage, setSuccessMessage] = useState('');
  const { availableCities, availableDates, availableConcerts, concerts } =
    useSelector((state) => state.reservation.form);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user_id = current_user.data.user.id;
    let city = availableCities[0];
    let date = availableDates[0];
    let concertTitle = availableConcerts[0];

    //we get the concert that has the same date, city and concert name from state
    let concertToBook = concerts.find(
      (concert) =>
        concert.city === city &&
        concert.date === date &&
        concert.title === concertTitle
    );
    //finally we post the reservation to the database
    try {
      // Post the reservation to the database
      await dispatch(postReservation({ user_id, ...concertToBook }));
    
      // Set the success message
      setSuccessMessage('Reservation created successfully');
    
      // Get the updated reservations
      await dispatch(getReservations());
    
      // Filter user reservations
      dispatch(filteredUserReservations(user_id));
    } catch (error) {
      // Handle errors if needed
      console.error('Error:', error);
    }
  };
  return (
    <>
      <main
        className={`bg-cover bg-center  text-white`}
        style={{
          backgroundImage: `url(${imgURL})`,
        }}
      >
        <div className="bg-[#96bf0180] backdrop-blur-md h-screen flex flex-col gap-5 items-center justify-center">
          <section className="text-center flex flex-col items-center w-3/4 md:w-1/2 gap-5">
            <div>
              <h1 className="text-2xl font-bold">Book for a concert</h1>
              <span>get your ticket now!</span>
            </div>
            <hr className="w-2/3" />
            <p>
              There are many Independent Concerts that you can book for. Any
              Independent artist can create an event or concert in our platform
              and you can book for it. Support your favorite artist!
            </p>
          </section>
          <form
            className="flex flex-col gap-20 items-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex gap-5 flex-col sm:flex-row">
              <label>
                <DropDownSelect
                  id="select-city"
                  name="select-city"
                  items={availableCities}
                  placeHolder={'Select City'}
                  onChange={(e) =>
                    dispatch(updatedAvailability(e.target.value))
                  }
                />
              </label>
              <label>
                <DropDownSelect
                  id="select-date"
                  name="select-date"
                  items={availableDates}
                  placeHolder={'Select Date'}
                  onChange={(e) =>
                    dispatch(updatedAvailability(e.target.value))
                  }
                />
              </label>
              <label>
                <DropDownSelect
                  id="select-concert"
                  name="select-concert"
                  items={availableConcerts}
                  placeHolder={'Select Concert'}
                  onChange={(e) =>
                    dispatch(updatedAvailability(e.target.value))
                  }
                />
              </label>
            </div>
            <div className="flex gap-5">
              <RoundedButton
                text="Reset"
                type="button"
                onClick={() => dispatch(resetAvailability())}
              />
              <RoundedButton text="Book Now">
                <input type="submit" />
              </RoundedButton>
            </div>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
      </main>
    </>
  );
}

export default ReserveConcertPage;
