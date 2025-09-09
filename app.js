// server.js
const app = require("./server");

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
  });
}