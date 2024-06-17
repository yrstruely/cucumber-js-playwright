import { Person, Network } from '../../../src/shouty.js'; 
import { expect } from 'chai';

const default_range = 10;
const in_range = default_range - 1
const out_of_range = default_range + 1


describe('Network', () => {
    let network;
    let person1;
    let person2;

    beforeEach(() => {
        network = new Network({ range: default_range });
        person1 = new Person({ name: 'Alice', location: in_range, network: network });
        person2 = new Person({ name: 'Bob', location: out_of_range, network: network });
        network.addPerson(person1);
        network.addPerson(person2);
    });

    it('should have a range', () => {
        expect(network.range).to.equal(default_range);
    });

    it('should have an array of people', () => {
        expect(network.people).to.deep.equal([person1, person2]);
    });

    describe('addMessage', () => {
        it('should add a message to the messages array of all people within range', () => {
            const message = 'Hello, everyone!';
            network.addMessage(message);
            expect(person1.messages).to.deep.equal([message]);
            expect(person2.messages).to.deep.equal([]);
        });

        it('should not add a message longer than 180 characters', () => {
            const longMessage = "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789x";
            network.addMessage(longMessage);
            expect(person1.messages).to.deep.equal([]);
            expect(person2.messages).to.deep.equal([]);
        });
    });

    describe('addPerson', () => {
        it('should add a person to the network\'s people array', () => {
            const person3 = new Person({ name: 'Charlie', location: in_range, network: network });
            network.addPerson(person3);
            expect(network.people).to.deep.equal([person1, person2, person3]);
        });

        it('should set the person\'s network to the network', () => {
            const person3 = new Person({ name: 'Charlie', location: in_range });
            network.addPerson(person3);
            expect(person3.network).to.equal(network);
        });
    });
});
