# cucumber-js-playwright

cucumber-js-playwright is a simple sample project demonstrating how to use cucumber-js combined with playwright for Behaviour-Driven Development (BDD) and Test-Driven Development (TDD). This project aims to show how you can utilize these tools to write clear, understandable tests and maintain high code quality.

## Table of Contents

- [cucumber-js-playwright](#cucumberjs)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
    - [BDD with cucumber-js](#bdd-with-cucumberjs)
    - [TDD with Mocha and Chai](#tdd-with-mocha-and-chai)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To get started with cucumber-js, clone the repository and install the necessary dependencies:

```bash
git clone git@github.com:yrstruely/cucumber-js-playwright.git
cd cucumber-js-playwright
npm install
```

## Test Preparation
In order to test the flutter web application some preparation needs to be done fist in the flutter repository.
 - Add the following code to the `lib/main.dart` file to ensure that all the html elements are added to the DOM:
 ```javascript
 void main() {
  
  WidgetsFlutterBinding.ensureInitialized();
  SemanticsBinding.instance.ensureSemantics();
    .
    .
    .
  runApp(const MyApp());
}
 ```
 - Build/deploy the flutter web app with `flutter build web`
 - Copy the `build/web/` folder from the flutter repository to the `build` directory of the `cucumber-js-playwright` project. 
 - now in the `cucumber-js-playwright` project use the `npx playwright codegen` command to record the test steps for your BDD tests.
 - Place the recorded steps into the step_definitions to complete the BDD tests e.g.:
 ```javascript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';


Before(async function () {
    const browser = await chromium.launch({ headless: true });
    this.browser = browser
});

After(async function () {
    await this.browser.close();
});

Given('I am on the Flutter Web app', async function () {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    this.page = page
    await this.page.goto('http://localhost:3000/');
    await expect(this.page).toHaveTitle(/Flutter Demo/);
})

When('I increment the counter {int} times', async function (times) {
    await this.page.getByRole('button', { name: 'Increment' }).click();

    for (let i = 0; i < times - 1; i++) {
        await this.page.getByRole('button', { name: 'Increment Increment' }).click();
    }
});

Then('the counter should show the number {int}', async function (times) {
    await expect(this.page.locator('#flt-semantic-node-5')).toContainText('' + times);
});
 ```
 - Serve the flutter web app using the `node src/server.js` command
 - Everything is now set up for running the tests, see: #Usage

## Usage
Before running the application, you need to have [Node.js](https://nodejs.org/) installed on your machine.

To run the application:

```bash
npm test
```

## Features

### BDD with Cucumber-js

The cucumber-js-playwright sample project uses cucumber-js to define and execute feature files which describe the behavior of the system in a human-readable way.

Here is an example feature file demonstrating various BDD techniques:

```gherkin
Feature: Wonderous Flutter

    Rule: Playwright can be used in Cucumber

        Scenario: Playwright in Cucumber
            Given I am on the Flutter Web app
            When I increment the counter 3 times
            Then the counter should show the number 3

```

### TDD with Mocha and Chai

The cucumber-js-playwright sample project employs mocha and chai to write unit tests that ensure individual components work correctly.

Here is an example of the mocha tests demonstrating various TDD techniques:

```javascript
import { Person, Network } from './src/shouty.js';
import { expect } from 'chai';

describe('Network', () => {
    let network;
    let person1;
    let person2;

    beforeEach(() => {
        network = new Network({ range: 10 });
        person1 = new Person({ name: 'Alice', location: 5, network: network });
        person2 = new Person({ name: 'Bob', location: 15, network: network });
        network.addPerson(person1);
        network.addPerson(person2);
    });

    it('should have a range', () => {
        expect(network.range).to.equal(10);
    });

    it('should have an array of people', () => {
        expect(network.people).to.deep.equal([person1, person2]);
        // More tests...
    });
});
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will run both the cucumber feature tests and the mocha unit tests.

## Project Structure

```
cucumber-js-playwright/
├── src/
│   └── server.js
├── test/bdd/
│        ├── features/
│        │   └── hear_shout.feature
│       /tdd/unit/
│        │   ├── network.test.js
│        │   └── person.test.js
│       /results
│        ├── @rerun.txt
│        ├── cucumber.html
│        └── cucumber.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
