import { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState();
  const [people, setPeople] = useState();
  const [days, setDays] = useState();
  const [source, setSource] = useState();
  const [destination, setDestination] = useState();
  const [flight, setFlight] = useState(false);
  const [hotel, setHotel] = useState(false);
  const [rental, setRental] = useState(false);
  const [responseContent, setResponseContent] = useState();
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    // e.preventDefault();
    // check if all fields are filled out.
    if (!budget || !source || !destination) {
      // We shouldn't get here because we disable the button if the fields are empty.
      return;
    }

    const postData = async () => {
      setLoading(true);
      const data = {
        budget,
        people,
        days,
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
    postData().then((data) => {
      console.log(JSON.stringify(data));
      setResponseContent(data.content);
      setLoading(false);
    });
  }

  const displayResponse = (
    <div className="flex w-full max-w-lg mt-10">
      <p className="text text-gray-900 dark:text-gray-200">{responseContent}</p>
    </div>
  );

  const displayForm = (
    <div>
      <form className="w-full max-w-lg mt-10">
        {/* Row 1 */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
              htmlFor="grid-people"
            >
              # of People
            </label>
            <input
              className={`${
                !people ? "border-red-500" : "border-green-500"
              } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-people"
              type="text"
              placeholder="2"
              onChange={(e) => setPeople(e.target.value)}
            />
            {!people && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-900 dark:text-gray-300 text-xs font-bold mb-2"
              htmlFor="grid-days"
            >
              # of Days
            </label>
            <input
              className={`${
                !days ? "border-red-500" : "border-green-500"
              } appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              id="grid-days"
              type="text"
              placeholder="3"
              onChange={(e) => setDays(e.target.value)}
            />
            {!days && (
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
              Make it as detailed as you&apos;d like. Examples: &quot;Anywhere
              in the World&quot;, &quot;Anywhere in America&quot;, &quot;New
              York City, NY, USA&quot;, &quot;Lower Manhattan&quot;
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
              !budget || !source || !destination || loading
                ? "opacity-90 cursor-not-allowed bg-blue-500 hover:bg-blue-700"
                : "bg-green-500 hover:bg-green-700"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="flex inline-flex items-center" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">loading</span>
                Finding your adventure...
              </div>
            ) : (
              "Find my next adventure"
            )}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="class flex">
        <p className="text-4xl font-bold text-center text-gray-900 dark:text-gray-300">
          Let our AI generate your next trip
        </p>
      </div>
      {/* if responseContent is not null, display the response, else display the form */}
      {responseContent ? displayResponse : displayForm}
    </main>
  );
}
