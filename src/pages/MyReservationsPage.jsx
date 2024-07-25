import { useSelector } from 'react-redux';
import '../stylesheets/MyReservationsPage.css';
import RegularList from '../components/list/RegularList';
import ReservationItem from './MyReservationsPage/ReservationItem';

function MyReservationsPage() {
  const { name } = useSelector((state) => state.user.details);
  const myReservations = useSelector((state) => state.reservation.created);

  return (
    <div className="my-reservations-page">
      <h1>MY RESERVATIONS</h1>
      {myReservations.length === 0 ? (
        <h2>
          The user <strong>{name}</strong> has no reservations yet
        </h2>
      ) : (
        <ul>
          <RegularList
            items={myReservations}
            resourceName="reservation"
            ItemComponent={ReservationItem}
          />
        </ul>
      )}
    </div>
  );
}

export default MyReservationsPage;
