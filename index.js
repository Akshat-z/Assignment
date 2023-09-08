import express from "express";
export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/convert", async (req, res) => {
  const { amount, from, to } = req.body;
  let y = to;
  let x = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`;
  try {
    const response = await fetch(x);
    if (!response.ok) {
      throw new Error("Error fetching currency conversion data");
    }
    const data = await response.json();
    //let y = data.to; // You can handle the conversion data here

    res.json({
      success: true,
      amount: amount,
      // Include the conversion data in the response if needed
      from: from,
      exchangeValue: [
        {
          to: to,
          value: amount * data[to],
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

app.listen(7850, () => {
  console.log("Server is working");
});
