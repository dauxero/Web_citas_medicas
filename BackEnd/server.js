import app from "./app.js";

//? puerto 4000 el uso del backend
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
