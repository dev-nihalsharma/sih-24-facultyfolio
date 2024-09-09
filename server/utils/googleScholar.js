const axios = require('axios');

const getNumberOfProjectsFromGScholar = async (scholarAccount) => {
    try {
        const response = await axios.get(scholarAccount);
        const jsonData = response.data;
        const numberOfArticles = jsonData.articles ? jsonData.articles.length : 0;
        return numberOfArticles;
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
};
module.exports = { getNumberOfProjectsFromGScholar };