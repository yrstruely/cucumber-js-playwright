import { When } from '@cucumber/cucumber';


When('{Person} shouts {string}', function (shouter, message) {
    this.shout({ from: shouter, message })
});

When('{Person} shouts the following message', function (shouter, message) {
    this.shout({ from: shouter, message })
})
