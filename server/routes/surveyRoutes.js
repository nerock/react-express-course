const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

const generateRecipients = (recipients) => {
  return recipients.split(",").map((email) => ({ email: email.trim() }));
};

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: generateRecipients(recipients),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
  });
};
