const { getNumberOfProjectsFromGScholar } = require('./utils/googleScholar');
async function getAllFaculty() {
    console.log(await getNumberOfProjectsFromGScholar('https://serpapi.com/searches/0d86742bcf068260/66dd8ea31ec32f7bfdce18f5.json'));
};
getAllFaculty();