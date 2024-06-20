# cucumber-js-playwright

cucumber-js-playwright is a simple sample project demonstrating how to use cucumber-js combined with playwright for Behaviour-Driven Development (BDD) and Test-Driven Development (TDD). This project aims to show how you can utilize these tools to write clear, understandable tests and maintain high code quality.

## Table of Contents

- [cucumber-js-playwright](#cucumber-js-playwright)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Test Preparation](#test-preparation)
  - [Running the Pre-built Sample Tests](#running-the-pre-built-sample-tests)
  - [Recording Steps](#recording-steps)
  - [Cucumber-js Step Definitions](#cucumber-js-step-definitions)
  - [Usage](#usage)
  - [Features](#features)
    - [BDD with Cucumber-js](#bdd-with-cucumber-js)
    - [TDD with Flutter Widget Tester](#tdd-with-flutter-widget-tester)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To get started with cucumber-js, clone the repository and install the necessary dependencies:

```bash
git clone git@github.com:yrstruely/cucumber-js-playwright.git
cd cucumber-js-playwright/test/bdd
npm install
cd cucumber-js-playwright
```

## Dependencies
In order to use this project you need to have a local development environment set up for both Flutter and Node.js
 - Flutter installation: https://docs.flutter.dev/get-started/install
 - Node.js installation: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

## Test Preparation
In order to test the flutter web application some preparation needs to be done fist in the flutter repository.
 - Add the following code to the `lib/main.dart` file to ensure that all the html elements are added to the DOM:
 ```dart
 void main() {
  
  WidgetsFlutterBinding.ensureInitialized();
  SemanticsBinding.instance.ensureSemantics();
    .
    .
    .
  runApp(const MyApp());
}
 ```

 ## Running the Pre-built Sample Tests
 There is a bash script in the project's root directory `run-tests.sh`. Run this script to prepare and run the tests for the project:
 ```bash
 > sh run-tests.sh
 ``` 
 This script will perform the following actions:
 - Build/deploy the flutter web app with `flutter build web`
 - Copy the `build/web/` folder from the flutter repository to the `build` directory of the `cucumber-js-playwright` project. 
 - Run the tests

## Recording Steps
It is also possible to record playwright tests using the `npx playwright codegen` command to record the test steps for your BDD tests. 

## Cucumber-js Step Definitions
Shown below are the step definitions for the cucumber-js sample BDD tests:
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

## Usage
To run the tests:

```bash
sh run-tests.sh
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

### TDD with Flutter Widget Tester
The TDD testing is handled with Flutter's own Widget Tester functionality. For more information please see: https://docs.flutter.dev/cookbook/testing/widget/introduction

## Project Structure
```
cucumber-js-playwright/
├── test/bdd/src/
│            └── server.js
│
├── test/bdd/features/
│            └── playwright.feature
│
├── test/results/
│        └── playwright.feature
│
├── test/  (TDD)
│   └── widget_test.dart
│
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.
