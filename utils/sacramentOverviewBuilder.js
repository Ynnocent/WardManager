const buildSacramentOverview = async (req, res, next) => {
  try {
    const { presidingMember, firstSpeakerMember, secondSpeakerMember, openingPrayerMember, closingPrayerMember, hymns } = req.body;

    req.newSacramentObj = {
      presidingMember,
      firstSpeakerMember,
      secondSpeakerMember,
      openingPrayerMember,
      closingPrayerMember,
      hymns,
    };

    next();
  } catch (error) {
    throw new Error("Error building sacrament overview");
  }
};

module.exports = {
    buildSacramentOverview
}