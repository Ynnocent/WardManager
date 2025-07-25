const getMemberList = (req, res) => {
  res.send("MemberList");
};

const getConferenceTalks = (req, res) => {
  res.send("GenConTalks");
};

const setUpSacramentAssignment = (req, res) => {};

module.exports = {
  getMemberList,
  getConferenceTalks,
  setUpSacramentAssignment,
};
