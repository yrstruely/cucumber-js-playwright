# cucumber.js

cucumber.js is a simple sample project demonstrating how to use cucumber-js combined with mocha and chai for Behaviour-Driven Development (BDD) and Test-Driven Development (TDD). This project aims to show how you can utilize these tools to write clear, understandable tests and maintain high code quality.

## Table of Contents

- [cucumber.js](#cucumberjs)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
    - [BDD with Cucumber.js](#bdd-with-cucumberjs)
    - [TDD with Mocha and Chai](#tdd-with-mocha-and-chai)
  - [Running Tests](#running-tests)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To get started with cucumber.js, clone the repository and install the necessary dependencies:

```bash
git clone git@github.com:yrstruely/cucumber-js.git
cd cucumber.js
npm install
```

## Usage

Before running the application, you need to have [Node.js](https://nodejs.org/) installed on your machine.

To run the application:

```bash
npm test
```

## Features

### BDD with Cucumber.js

The cucumber.js sample project uses cucumber-js to define and execute feature files which describe the behavior of the system in a human-readable way.

Here is an example feature file demonstrating various BDD techniques:

```gherkin
Feature: Hear Shout

    Shouty allows users to hear other users as long as they are close enough to each other.

    Rule: Shouts can be heard by other users

        Scenario: Listener hears a message
            Given a person named Lucy
            And a person named Sean
            When Sean shouts "Free bagels at Sean's"
            Then Lucy hears Sean's message

    Rule: Shouts should only be heard if listener is within range

        Scenario Outline: Only listener's in range can hear
            Given the range is <Range> meters
            And people are located at:
                | name     | Sean | Lucy |
                | location | 0    | 50   |
            When Sean shouts "Free coffee at Sean's"
            Then Lucy only hears Sean's message when she is in range

            Examples:
                | Range |
                | 100   |
                | 10    |

    Rule: Listeners can hear multiple shouts

        Scenario: Two shouts
            Given a person named Lucy
            And a person named Sean
            When Sean shouts "Free bagels at Sean's"
            And Sean shouts "Free coffee at Sean's"
            Then Lucy hears the following messages:
                | Free bagels at Sean's |
                | Free coffee at Sean's |

    Rule: Maximum length of a message

        @run-me
        Scenario: Message too long
            Given a person named Sean
            And a person named Lucy
            When Sean shouts the following message
            """
            01234567890123456789012345678901234567890123456789012345
            678901234567890123456789012345678901234567890123456789012345678901234
            5678901234567890123456789012345678901234567890123456789x
            """
            Then Lucy doesn't hear Sean's message
```

### TDD with Mocha and Chai

The cucumber.js sample project employs mocha and chai to write unit tests that ensure individual components work correctly.

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
cucumber.js/
├── src/
│   └── shouty.js
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
