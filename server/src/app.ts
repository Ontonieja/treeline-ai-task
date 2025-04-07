import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api", reviewRoutes);

app.use(errorHandler);

app.listen(PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});
