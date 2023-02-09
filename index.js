require("dotenv").config();

const app = require("./backend/src/app");

const port = parseInt(process.env.APP_PORT ?? "6001", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    // eslint-disable-next-line no-restricted-syntax
    console.log(`Server is listening on ${port}`);
  }
});
