import { Person, Network } from '../../../src/shouty.js'; 
import { expect } from 'chai';


describe('Person', () => {
    let person;
    let network;

    beforeEach(() => {
        network = new Network({ range: 10 });
        person = new Person({ name: 'Alice', location: 5, network: network });
        network.addPerson(person);
    });

    it('should have a name', () => {
        expect(person.name).to.equal('Alice');
    });

    it('should have a location', () => {
        expect(person.location).to.equal(5);
    });

    it('should have an empty messages array by default', () => {
        expect(person.messages).to.deep.equal([]);
    });

    it('should have a network', () => {
        expect(person.network).to.equal(network);
    });

    describe('shout', () => {
        it('network should return the message back to me', () => {
            const message = 'Hello, world!';
            person.shout(message);
            expect(person.messagesHeard()).to.deep.equal([message]);
        });
    });

    describe('hear', () => {
        it('should add a message to the person\'s messages array', () => {
            const message = 'Hello, Alice!';
            person.hear(message);
            expect(person.messages).to.deep.equal([message]);
        });
    });

    describe('messagesHeard', () => {
        it('should return the person\'s messages array', () => {
            const message1 = 'Hello, Alice!';
            const message2 = 'Goodbye, Alice!';
            person.hear(message1);
            person.hear(message2);
            expect(person.messagesHeard()).to.deep.equal([message1, message2]);
        });
    });

    describe('inRange', () => {
        it('should return true if the person is within the network range', () => {
            expect(person.inRange()).to.equal(true);
        });

        it('should return false if the person is outside the network range', () => {
            person.location = 15;
            expect(person.inRange()).to.equal(false);
        });
    });
});
