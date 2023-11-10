import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedAvailability, resetAvailability } from '../redux/reservationForm/reservationFormSlice';
import getConcerts from '../redux/requests/getConcerts';
import DropDownSelect from '../components/buttons/DropDownSelect';
import RoundedButton from '../components/buttons/RoundedButton';
import postReservation from '../redux/requests/postReservation';

let imgURL =
  'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

function ReserverConcertPage() {
  const { availableCities, availableDates, availableConcerts, concerts } = useSelector(
    (state) => state.reservationForm
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConcerts());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //we get date, city and concert form the state
    let user_id = 2; //this is a placeholder for the user id
    let city = availableCities[0];
    let date = availableDates[0];
    let concertTitle = availableConcerts[0];

    //we get the concert that has the same date, city and concert name from state
    let concertToBook = concerts.find(
      (concert) => (
        concert.city === city &&
        concert.date === date &&
        concert.title === concertTitle
      )
    );
    //finally we post the reservation to the database
    dispatch(postReservation({ user_id, ...concertToBook }));
  };

  return (
    <>
      <main className={`bg-[url(${imgURL})] bg-cover bg-center  text-white`}>
        <div className="bg-[#96bf0180] backdrop-blur-md h-screen flex flex-col gap-5 items-center justify-center">
          <section className="text-center flex flex-col items-center w-3/4 md:w-1/2 gap-5">
            <div>
              <h1 className="text-2xl font-bold">Book for a concert</h1>
              <span>get your ticket now!</span>
            </div>
            <hr className="w-2/3 " />
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
                  onChange={(e) =>
                    dispatch(updatedAvailability(e.target.value))
                  }
                />
              </label>
            </div>
            <div className="flex gap-5">
              <RoundedButton text="Reset" type="button" onClick={() => dispatch(resetAvailability())}/>
              <RoundedButton text="Book Now">
                <input type="submit" />
              </RoundedButton>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default ReserverConcertPage;
