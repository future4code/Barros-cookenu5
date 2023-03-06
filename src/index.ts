import app from "./app"
import { usersRouter } from "./routes/usersRouter"
import { recipesRouter } from "./routes/recipesRouter"
import { followsRouter } from "./routes/followsRouter"

app.use("/users", usersRouter)

app.use("/recipes", recipesRouter)

app.use("/follows", followsRouter)