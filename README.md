#CyberDojo

This project was created with the goal of introducing young people to the world of computer science in a fun and engaging way. By using gamification techniques, virtual rewards, and interactive learning paths, the application sparks interest in digital skills while fostering a more conscious understanding of the fundamentals of computer science. Through challenges, levels, and rewards, young learners can experiment, learn, and grow as active and creative users of technology.

## Summary

- [Main Feature](#Main-Feature)
- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#Usage)
- [Project Structure](#Project-Structure)
- [Contributions](#Contributions)
- [Credits](#Credits)
- [License](#License)

## Main Feature

- Interactive Learning Paths
  Offering courses divided into difficulty levels (Introductory, Intermediate, Advanced) to guide young learners through different stages of learning.
- Gamification
  Implementation of game elements such as levels, challenges, and goals to make learning more engaging and motivating.
- Reward System
  Assignment of virtual rewards, badges, and personalized titles upon reaching specific milestones, encouraging active participation.
- User Profile Customization
  Users can personalize their profiles with unique avatars, borders, and titles, reflecting their progress and preferences.
- Inventory Management
  A dedicated inventory section where users can view and select available avatars, borders, and titles, enhancing the user experience.
- Progress Tracking
  Monitoring user progress across various courses, allowing them to see how much they have learned and which courses they have completed.
- Rewards Section
  A dedicated area for the rewards earned by users, with details about the achievements and how they can be redeemed or displayed.
- Intuitive and Responsive Interface
  An appealing design and user-friendly interface, optimized for various devices (desktop, tablet, mobile) to ensure a seamless learning experience.
- Authentication and Security
  A secure authentication system to protect user information and ensure access is granted only to registered users.
- Ease of Navigation
  A clear and accessible navigation menu that allows users to easily switch between different sections of the application (Account Management, Inventory, Rewards Section, Followed Courses).
- Support
  Mechanisms to provide users with assistance in case of issues, continuously improving the user experience.
- Integration with External Services
  Use of facades to simplify interaction with APIs and external services, keeping the code organized and maintainable.
- Social Interactions (Next Release)
  Users will be able to share their progress and rewards on social media, encouraging participation and fostering an active community.
- Notifications and Updates (Next Release)
  A notification system to inform users about new courses, earned rewards, or important updates within the application.

## Requirements

- To run the project correctly, the following system requirements must be met:

- For the Development Environment
  Operating System: Windows, macOS, or Linux
  - Node.js: Version 16.0.0 or higher
    npm: Version 8.0.0 or higher (installed with Node.js)
    -Browser: Compatible with Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari (latest version)
    Recommended Text Editor: Visual Studio Code (or equivalent)
- For Application Execution
  Hardware:
  Processor: Dual-core (2.5 GHz or higher)
  RAM: Minimum 4 GB
  Disk Space: At least 500 MB available for the application and dependencies
- Software:
  Web Browser with support for ES6 and CSS3
  Internet connection to load resources and access APIs
- For the Backend
  Node.js server with Express
- Database: MongoDB Compass
- Network Access: Required to communicate with authentication, user management, and course APIs.
- Libraries and Frameworks Used
- Frontend:
- React 18.0.0 o higher
- Tailwind CSS (for styling)
- Backend:
  - Express.js
- Dependencies listed in requirements.txt
- Additional Requirements for Mobile
  Device: Smartphone or tablet with a modern browser
  Recommended Resolution: 1280x720 or higher for an optimal experience
  These requirements ensure that the application functions correctly and provides a seamless user experience both during development and execution.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/CyberDojo.git

2. Navigate to the directory:
   cd CyberDojo

3. Navigate to the server folder:
   cd server
   npm install

4. Navigate to the client folder:
   cd ../client
   npm install

5. Initialize the Database:
   cd ..
   node /database/initializeDB.js

## Usage

1. Start the server
   cd CyberDojo/server
   npm start

2. Start the client
   cd CyberDojo/client
   npm start

## Project Structure

Cyberdojo/ #main folder
|--.github
|--client #client folder
|-------Cypress
|-------Public
|-------src
|-------.gitignore
|--------cypress.config.js
|--------package-lock.json
|--------package.json
|--------postcss.config.js
|--------tailwind.config.js
|--database #database folder
|--------db.js
|--------initializeDB.js
|--------package-lock.json
|--------package.json
|--------seed.js
|--server #server folder
|--------Autenticazione
|--------Corsi
|--------Middleware
|--------Premi
|--------Registrazione
|--------routes
|--------Segnalazioni
|--------Shop
|--------Test
|--------.gitignore
|--------index.js
|--------package-lock.json
|--------package.json
|--------README_backend.md
|--------server.js
|-LICENSE
|-README.md
|-requirment.txt #project dependecies

## Contributions

We warmly welcome contributions to improve this project! Whether you'd like to fix a bug, enhance a feature, or add new functionality, your efforts are greatly appreciated.
Guidelines
Follow the code style and best practices used in the project.
If adding a new feature, ensure it aligns with the project's goals.
Check for existing issues or discussions before creating new ones.
Be respectful and collaborative in your communication.

## Credits

This project, CyberDojo, was developed as part of a university assignment for the Software Engineering course at the University of Salerno, Faculty of Computer Science. The project represents the collective efforts of the CyberDojo team, aiming to apply software engineering principles to create an educational platform that promotes mindful use of technology among young learners.

We would like to extend our gratitude to our professors and mentors for their guidance throughout the development process. This project serves as a demonstration of our theoretical knowledge and practical skills in designing and implementing a software system

## License

This project is open source and available under the MIT License.
