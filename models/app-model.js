const mongoose = require("mongoose");

const appSchema = mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    appID: {
      type: String,
      required: true,
    },
    appSecret: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    chain: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  { usePushEach: true }
);

const App = mongoose.model("Application", appSchema);

module.exports = App;
