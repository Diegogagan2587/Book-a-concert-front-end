import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemDataPanel from '../components/ItemDataPanel';
import LeftButton from '../components/buttons/LeftButton';

function ConcertDetailsPage() {
  const navigate = useNavigate();
  const concert = useSelector((state) => state.concerts.currentConcert);

  if(!concert) return (<div className="flex justify-center items-center h-screen text-red-500">Something went wrong...</div>)

  return (
    // Div below need to be adjusted for thir CSS properties when integrating this component to the app
    //Right now its position is absolute so might intergere with other components
    <section className=" container flex flex-col md:justify-center w-full min-h-screen mx-0 my-0 bg-white">
      <article className=" flex flex-col md:flex-row md:justify-between m-2 p-2 ">
        <div className="flex items-center justify-center h-56 sm:h-96 w-4/5 md:w-3/4 border-2 bg-gray-400 rounded rounded-lg p-2 mb-2 md:mb-inherit mx-auto">
          <img
            src={concert.img}
            alt="concert"
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="container flex justify-center md:w-1/3">
          <ItemDataPanel concert={concert} />
        </div>
      </article>
      <LeftButton onClick={()=>navigate('/')}/>
    </section>
  );
}

export default ConcertDetailsPage;
