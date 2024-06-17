export class Person {
    constructor(params = {}) {
        this.name = params.name || null
        this.location = params.location || 0
        this.messages = params.messages || []
        this.network = params.network || null
    }

    shout(message) {
        this.network.addMessage(message)
    }

    hear(message) {
        this.messages.push(message)
    }

    messagesHeard() {
        return this.messages
    }

    inRange() {
        return this.location <= this.network.range
    }
}

export class Network {
    constructor(params = {}) {
        this.range = params.range || 0
        this.people = params.people || []
    }

    addMessage(message) {
        if (message.length < 181) {
            this.people.filter(person => person.location <= this.range).forEach(person => person.hear(message))
        }
    }

    addPerson(person) {
        this.people.push(person)
        person.network = this
    }
}