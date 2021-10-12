require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const middleware = require("./middleware");

// app.use(require("./middleware/headers"));
// app.use(require("./middleware/validate-jwt"));

app.use(middleware.CORS);

const controllers = require("./controllers");

app.use(Express.json());
app.use("/user", controllers.userController);
app.use("/songs", controllers.songsController);
app.use("/playlist", controllers.playlistController);
app.use("/comments", controllers.commentsController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`[Server]: App is listening on ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(`[Server] has crashed: ${err}`);
  });
