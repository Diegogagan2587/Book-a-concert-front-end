import RoundedButton from './buttons/RoundedButton';

function ItemDataPanel(props) {
  const { title, organizer_id, description, price, date, city } = props.concert;
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
                <td>{organizer_id}</td>
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
        <RoundedButton text="Reserve" />
      </div>
    </section>
  );
}

export default ItemDataPanel;
