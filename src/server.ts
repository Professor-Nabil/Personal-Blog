import app from "./app.js";
import { initStorage } from "./services/storage.js";

const PORT = process.env.PORT || 3000;

initStorage().then(() => {
  app.listen(PORT, () => console.log(`🟢 Server: http://localhost:${PORT}`));
});
