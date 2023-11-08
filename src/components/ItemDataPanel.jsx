import RoundedButton from './buttons/RoundedButton';

function ItemDataPanel() {
  return (
    <section className="flex flex-col gap-5 md:justify-between md:h-2/3 m-2 p-x-2 p-y-6">
      <div className="flex flex-col gap-5 ">
        <div>
          <h1 className="text-xl text-end font-bold">
            Mozart&apos;s tribute concert
          </h1>
          <p className="text-sm text-right">
            Enjoy of a Mozart presentation with 3d visual effect rendering
            mozart like live action generated with AI
          </p>
        </div>

        <div className="container shadow-md">
          <table className="text-sm w-full">
            <tbody>
              <tr className="bg-neutral-100">
                <td>Organized by:</td>
                <td>Mr.Rock</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>11-Jan-2100</td>
              </tr>
              <tr className="bg-neutral-100">
                <td>City:</td>
                <td>New York</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>$ 120.00</td>
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
