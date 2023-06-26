const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  // TODO: Do some backend validation

  // Convert the user's input into a prompt
  const pDays = `Suggest a ${body.days} day vacation destination`;
  const pPeople = `for ${body.people} people`;
  const pDestination = `in the ${body.destination}`;
  const pSource = `from the ${body.source} area`;
  const pBudget = `for under ${body.budget} USD that`;
  const pFlight = `${body.flight ? "includes" : "does not include"} a flight,`;
  const pHotel = `${body.hotel ? "includes" : "does not include"} a hotel,`;
  const pRental = `${
    body.rental ? "includes" : "does not include"
  } a rental car,`;
  const pIdeas = `as well as 5 ideas of what to do during the stay at the destination?`;

  const prompt = `${pDays} ${pPeople} ${pDestination} ${pSource} ${pBudget} ${pFlight} ${pHotel} ${pRental} ${pIdeas}`;

  // Call the OpenAI API
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Travel Agent." },
      { role: "user", content: prompt },
    ],
  });

  // log the output to the console
  console.log(chatCompletion.data.choices[0].message.content);
  console.log(chatCompletion.data.usage);

  // pluck out the details that we can use for travelociy, expedia, etc.
  // generate the affiliate links
  // return the response and the links to the frontend

  const response = {
    content: chatCompletion.data.choices[0].message.content,
  };

  res.status(200).json(response);
}
