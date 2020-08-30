// mongoose part
const mongoose = require("mongoose");

// promise
mongoose.Promise = Promise;

/**
 * Mongodb connect
 */
async function connect() {
  const accountName = "mongodb";
  const databaseName = "User";
  const key = encodeURIComponent(
    "fimQdjqIqmDjcFbs5dR8UCJbusTqT1uK9j1xMM9zKTrDWa9EdPvRfWrYkBqVhWnuU2Owix9hluUArRB7SIO6Vw=="
  );
  const port = 10255;
  const mongoUri = `mongodb://${accountName}:${key}@${accountName}.documents.azure.com:${port}/${databaseName}?ssl=true`;

  return await mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connect,
  mongoose,
};
