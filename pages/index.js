import { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [flight, setFlight] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [rental, setRental] = useState(false);

  function handleSubmit() {
    // e.preventDefault();
    // check if all fields are filled out.
    if (!budget || !source || !destination) {
      // We shouldn't get here because we disable the button if the fields are empty.
      return;
    }

    const postData = async () => {
      console.log("clicked");
      const data = {
        budget,
        source,
        destination,
        flight,
        hotel,
        rental,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    console.log(postData);
    postData().then((data) => {
      alert(JSON.stringify(data));
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="class flex">
        <p className="text-4xl font-bold text-center text-gray-900 dark:text-gray-300">
          Let our AI generate your next trip
        </p>
      </div>

      <form className="w-full max-w-lg mt-10">
        {/* Row 1 */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
              htmlFor="grid-budget"
            >
              Budget (USD)
            </label>
            <input
              className={`${
                !budget ? "border-red-500" : "border-green-500"
              } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-budget"
              type="text"
              placeholder="1000"
              onChange={(e) => setBudget(e.target.value)}
            />
            {!budget && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
        </div>
        {/* Row 2 - Source */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
              htmlFor="source"
            >
              Source Location
            </label>
            <input
              className={`${
                !source ? "border-red-500" : "border-green-500"
              } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="source"
              type="text"
              placeholder="Philadelphia, PA, USA"
              onChange={(e) => setSource(e.target.value)}
            />
            {!source && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
            <p className="text-gray-600 text-xs italic">
              Can use your current city, or the nearest airport you would like
              to fly from.
            </p>
          </div>
        </div>
        {/* Row 3 - Destination */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
              htmlFor="destination"
            >
              Desired Destination
            </label>
            <input
              className={`${
                !destination ? "border-red-500" : "border-green-500"
              } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="destination"
              type="text"
              placeholder="Northeastern United States"
              onChange={(e) => setDestination(e.target.value)}
            />
            {!destination && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
            <p className="text-gray-600 text-xs italic">
              Make it as detailed as you&apos;d like. Examples: <br />
              &quot;Anywhere in the World&quot; <br />
              &quot;Anywhere in America&quot; <br />
              &quot;New York City, NY, USA&quot; <br />
              &quot;Lower Manhattan&quot;
            </p>
          </div>
        </div>
        {/* Row 4 - Flight/Hotel/Rental */}
        <label
          className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
          htmlFor="source"
        >
          Would you like to include?
        </label>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="flex md:w-1/3 items-center pl-4">
            <input
              checked={flight ? true : false}
              id="bordered-checkbox-1"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-green-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setFlight(!flight)}
            />
            <label
              htmlFor="bordered-checkbox-1"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Flight
            </label>
          </div>

          <div className="flex md:w-1/3 items-center pl-4">
            <input
              checked={hotel ? true : false}
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-green-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setHotel(!hotel)}
            />
            <label
              htmlFor="bordered-checkbox-2"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Hotel
            </label>
          </div>

          <div className="flex md:w-1/3 items-center pl-4">
            <input
              checked={rental ? true : false}
              id="bordered-checkbox-3"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              className="w-4 h-4 text-green-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => setRental(!rental)}
            />
            <label
              htmlFor="bordered-checkbox-3"
              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Rental Car
            </label>
          </div>
        </div>

        {/* Final Row (submit button) */}
        <div className="flex justify-center mt-6">
          <button
            className={`${
              !budget || !source || !destination
                ? "opacity-90 cursor-not-allowed bg-blue-500 hover:bg-blue-700"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleSubmit}
          >
            Find my next adventure
          </button>
        </div>
      </form>
    </main>
  );
}
