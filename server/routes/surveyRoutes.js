const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Survey = mongoose.model("surveys");

const generateRecipients = (recipients) => {
  return recipients.split(",").map((email) => ({ email }));
};

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: generateRecipients(recipients),
      _user: req.user.id,
      dateSent: Date.now(),
    });
  });
};
