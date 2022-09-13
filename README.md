# HandsOnCoding (Front-End)

This is the website for the HandsOnCoding project, an open-source MOOC (Massive Open Online Courses) for multiple programming languages.

### Build With

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NextJs](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

## Getting Started

### Prerequisites

In order to run this project you should install [Node](https://nodejs.org/en/download/) in your computer.

You also need to be running the other two projects (see the installation process inside each project):
* [HandsOnCoding Business Logic (Back-End)](https://github.com/Esarac/HandsOnCoding-Back)
* [HandsOnCoding Compiler (Back-End)](https://github.com/mavaldot/pdg-compiler)

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/Esarac/HandsOnCoding-Front.git
    ```
2. Go inside the project folder
   ```bash
   cd HandsOnCoding-Front
   ```
3. Install npm packages
   ```bash
   npm i
   ```

## Usage

### Configuration

This project follows the [Next.js](https://nextjs.org/docs) structure.

Some important folders are:
| Folder     | Description                                            |
|------------|--------------------------------------------------------|
| components | React components that are going to be used in the app. |
| models     | Typescript object definitions that are commonly used.  |
| services   | Fetching functions.                                    |

### Start

Run the development server with the following command:
```bash
npm run dev
# or
yarn dev
```

### Cypress (Test)

[Cypress](https://www.cypress.io/) is the new standard in front-end testing that every developer and QA engineer needs.

To run the E2E tests, use the following command:
```bash
npm run cy:run
```

To run the E2E test with the Cypress Launchpad, run this command instead:
```bash
npm run cy:open
```

Take into account that the development server should be running at http://localhost:3000 in order for the test to work.


## Related Projects

* [HandsOnCoding Business Logic (Back-End)](https://github.com/Esarac/HandsOnCoding-Back)
* [HandsOnCoding Compiler (Back-End)](https://github.com/mavaldot/pdg-compiler)

## Contact Information
 
### ![Quality](https://images.weserv.nl/?url=avatars.githubusercontent.com/u/48232743?v=4&h=50&w=50&fit=cover&mask=circle&maxage=7d) Esteban Ariza Acosta (Esarac)

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Esarac)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/estebanarizaacosta/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:acosta57esteban@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/esaracgp/)
