export default function handler(req, res) {
  const body = req.body;
  res.status(200).json(body);
  // TODO:
  // do some backend validation
  // send the request to openai chatgpt
  // pluck out the details that we can use for travelociy, expedia, etc.
  // generate the affiliate links
  // return the response and the links to the frontend
}
