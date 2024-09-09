const predictFacultyAppraisal = async (
  experience = 0,
  research_papers = 0,
  events = 0,
  studentReview = 0,
  attendance = 0
) => {
  const bias = 1.5;
  // const weights = {
  //   experience: 0.3,
  //   projects: 0.6,
  //   events: 0.2,
  //   seminars: 0.2,
  //   studentReview: 0.4,
  // };

  // const experienceScore = (parseFloat(experience) || 0) * weights['experience'] + bias;
  // const projectsScore = (parseFloat(projects) || 0) * weights['projects'] + bias;
  // const eventsScore = (parseFloat(events) || 0) * weights['events'] + bias;
  // const seminarsScore = (parseFloat(seminars) || 0) * weights['seminars'] + bias;
  // const studentReviewScore = (parseFloat(studentReview) || 0) * weights['studentReview'] + bias;

  // const totalScore = experienceScore + projectsScore + eventsScore + seminarsScore + studentReviewScore;
  // const appraisalPercentage = totalScore / 100;
  console.log(research_papers, attendance, studentReview, experience, events);
  const appraisal =
    Math.round(
      (bias +
        0.15 * research_papers +
        0.15 * (attendance / 100) +
        0.4 * studentReview +
        0.3 * (experience / 5) +
        0.3 * events) *
        100
    ) / 100;

  return appraisal;
};

module.exports = {
  predictFacultyAppraisal,
};
