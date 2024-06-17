import { Person } from '../../../../src/shouty.js'
import { defineParameterType } from '@cucumber/cucumber'

defineParameterType({
    name: 'Person',
    regexp: /Lucy|Sean/,
    transformer: name => new Person({ name: name })
})