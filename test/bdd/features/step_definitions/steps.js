import { Given, Then } from '@cucumber/cucumber';
import { assertThat, is } from 'hamjest';
import { deepEqual } from 'node:assert';
import { Person } from '../../../../src/shouty.js';

const default_distance = 0

Given('the range is {int} meters', function (range) {
    this.network.range = range
});

Given('a person named {word}', function (name) {
    this.people[name] = new Person({ name: name, location: default_distance })
    this.network.addPerson(this.people[name])
});

Given('people are located at:', function (dataTable) {
    dataTable.transpose().hashes().map((person) => {
        this.people[person.name] = new Person({ name: person.name, location:person.location })
        this.network.addPerson(this.people[person.name])
    })
});

Then('{Person} hears {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([this.message]))
});

Then('{Person} doesn\'t hear {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([]))
});

Then('{Person} hears the following messages:', function (hearer, expectedMessages) {
    let actualMessages = this.people[hearer.name].messagesHeard().map(message => [message])
    deepEqual(actualMessages, expectedMessages.raw())
});

Then('{Person} only hears {Person}\'s message when she is in range', function (hearer, shouter) {
    if (this.people[hearer.name].inRange()) {
        assertThat(this.people[hearer.name].messagesHeard(), is([this.message]))
    }
    else {
        assertThat(this.people[hearer.name].messagesHeard(), is([]))
    }
});