# Automated System for Career Advancements of the Faculties of Higher Education

<img src="https://raw.githubusercontent.com/dev-nihalsharma/sih24-r1-invoicely/main/client/public/facultyfolio-techstack.png" width="full" />

This README provides an overview of the project, including team details, relevant links, tasks completed, tech stack, key features, and steps to run the project locally.

## Team Details

**Team Name:** HEXA CODE

**Team Leader:** [@tanyaguptaaaa29](https://github.com/tanyaguptaaaa29)

**Team Members:**

- **MEMBER_1** - 2023UEE4648 - [@tanyaguptaaaa29](https://github.com/tanyaguptaaaa29)
- **MEMBER_2** - 2023UEE4661 - [@yashmit789](https://github.com/yashmit789)
- **MEMBER_3** - 2023UCS1685 - [@Krish-Garg01](https://github.com/Krish-Garg01)
- **MEMBER_4** - 2023UEC2596 - [@SuryanshKS](https://github.com/SuryanshKS)
- **MEMBER_5** - 2024UCS1700 - [@dev-nihalsharma](https://github.com/dev-nihalsharma)
- **MEMBER_6** - 2024UCA1953 - [@sujallchaudhary](https://github.com/sujallchaudhary)

## Project Links

- **Internal Presentation:** [Internal Presentation](/files/Internal_PPT_HEXA-CODE.pdf)
- **Final SIH Presentation:** [Final SIH Presentation](/files/SIH_PPT_HEXA-CODE.pdf)
- **Video Demonstration:** [Watch Video]https://youtu.be/Do3K7ktkiVw?si=XyjBT69DgSe0C3H-
- **Live Deployment:** [Visit Web App]https://facultyfolio.netlify.app/
- **Source Code:** [GitHub Repository]https://github.com/dev-nihalsharma/sih-24-facultyfolio

## Tasks Accomplished

- [x] **User Roles & Access Control:**Role-based access control system that allows users like administrators, and Professors to perform personalized tasks.

# Tech Stack Overview

This project utilizes a variety of technologies to build a scalable, efficient, and user-friendly application. Below is an overview of the tech stack used and the reasons behind choosing each technology.

## [Node.js](https://nodejs.org/)

**Why Node.js?**  
Node.js was chosen for its non-blocking, event-driven architecture, which is perfect for building scalable and high-performance server-side applications. Its vast ecosystem and the ability to use JavaScript both on the front-end and back-end make development more streamlined and efficient.

**Use Case:**  
Node.js is used to handle server-side logic, manage API endpoints, and interact with databases.

## [React Native](https://reactnative.dev/)

**Why React Native?**  
React Native allows us to build mobile applications that work seamlessly across both iOS and Android with a single codebase. This reduces development time and ensures consistent functionality across platforms. Its ability to use JavaScript and a rich set of pre-built components speeds up the development process.

**Use Case:**  
React Native is utilized to create a cross-platform mobile app with native performance and user experience.

## [DigitalOcean](https://www.digitalocean.com/)

**Why DigitalOcean?**  
DigitalOcean is chosen for its simplicity, scalability, and cost-effectiveness. It provides a reliable cloud infrastructure that can easily scale as the application grows. Its user-friendly interface and extensive documentation make it easy to manage and deploy applications.

**Use Case:**  
DigitalOcean hosts the backend server and database, providing a scalable and secure environment for the application.

## [MySQL](https://www.mysql.com/)

**Why MySQL?**  
MySQL is a powerful, open-source relational database management system that offers high performance, reliability, and ease of use. Its wide adoption and robust community support make it a trusted choice for handling structured data.

**Use Case:**  
MySQL is used to store and manage relational data for the application, ensuring data integrity and efficient querying.

## [JWT (JSON Web Token)](https://jwt.io/)

**Why JWT?**  
JWT is used for securely transmitting information between parties as a JSON object. It helps in implementing authentication and authorization by allowing stateless sessions and ensuring data integrity. Its compact, URL-safe format is ideal for modern web applications.

**Use Case:**  
JWT is used for managing user authentication and maintaining secure, stateless sessions across different parts of the application.

## [Sequelize](https://sequelize.org/)

**Why Sequelize?**  
Sequelize is a promise-based Node.js ORM (Object-Relational Mapper) that supports multiple SQL dialects. It simplifies database interactions by providing an easy-to-use API for querying and manipulating data, and it includes features for model definition, migrations, and associations.

**Use Case:**  
Sequelize is used for managing database operations in the Node.js application, including defining models, running migrations, and executing queries in a more structured and efficient manner.

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dev-nihalsharma/sih-24-facultyfolio.git
   cd sih-24-facultyfolio
   ```

2. **Set Up the Node.js Server**

   - Navigate to the `server` directory:

     ```bash
     cd server
     ```

   - Install dependencies and start the server:

     ```bash
     npm install
     npm start
     ```

   The server runs on `http://localhost:5000`.

3. **Set Up the NEXT.js Web App**

   - Navigate to the `client` directory:

     ```bash
     cd ../client
     ```

   - Install dependencies and start the Expo app:

     ```bash
     npm install
     npm run dev
     ```

   The web app runs on `http://localhost:3000`

## Notes

- Ensure both the server and web app are running.
