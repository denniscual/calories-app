# Repository for the Calories App API

## Getting Started

- Download the [MySQL server](https://dev.mysql.com/downloads/mysql/) and spin a localhost dv server.
- Create `.env` file at the root of the directory. Fill all the required env variables.

## Tools and tech stack

- [TypeScript][typescript] [4.5][typescript-4-5]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- Simple example of TypeScript code and unit test
- [Sequelize ORM for MySQL](https://sequelize.org/).
- [Expressjs](https://expressjs.com/) for building api.

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests
