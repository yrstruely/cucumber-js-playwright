Feature: Wonderous Flutter

    Rule: Playwright can be used in Cucumber

        Scenario: Playwright in Cucumber
            Given I am on the Flutter Web app
            When I increment the counter 3 times
            Then the counter should show the number 3
