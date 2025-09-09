const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmailSpeakerAssignment = async (to, member) => {
  try {
    return emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Sacrament Meeting Assignment",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #333;">Hi! ${member.fname || "Not Set"} ${member.lname || "Not Set"}</h2>
              <p>You have been assigned to speak ${member.talkHistory[-1].topic || "NA"} on ${
        member.assignmentDate || "NA"
      }.</p>
            </div>
          `,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const sendEmailPrayerAssignment = async (to, member) => {
  try {
    return emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Sacrament Meeting Assignment",
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2 style="color: #333;">Hi! ${member.fname} ${member.lname}</h2>
              <p>You have been assigned to pray on ${
                member.prayerHistory[-1].dateAdded || "NA"
              }.</p>
            </div>
          `,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  sendEmailSpeakerAssignment,
  sendEmailPrayerAssignment
};
