'use strict'

const chai = require('chai')
const util = require('util')

const {
    optionalObject,
    requiredObject,
    requiredInt,
    optionalInt,
    requiredString,
    optionalString,
    requiredEnumString,
    optionalEnumString,
    requiredArrayString,
    optionalArrayString,
    hashKeyString,
    rangeKeyString,
    globalIndexString,
} = require('../app')

const testIt = (defaultValue, type, required, result) => {
    chai.should().exist(result.type, 'Not found prop expected.type!')
    chai.should().exist(result.default, 'Not found prop expected.default!')
    chai.should().exist(result.required, 'Not found prop expected.required!')

    chai.should().equal(
        type.toString(),
        result.type.toString(),
        `Not match prop expected.type=${type.toString()} and result.type=${result.type.toString()}!`
    )
    chai.should().equal(
        required,
        result.required,
        `Not match prop expected.required=${required} and result.required=${result.required}!`
    )
    chai.should().equal(
        defaultValue,
        result.default,
        `Not match prop defaultValue=${defaultValue} and result.default=${result.default}!`
    )
}

describe('Utilities - Default Tests', () => {
    it('Required object into schema - is OK?', done => {
        const defaultValue = { test: 'test' }

        const result = requiredObject(defaultValue)

        testIt(defaultValue, Object, true, result)
        done()
    })

    it('Optional object into schema - is OK?', done => {
        const defaultValue = { test: 'test' }

        const result = optionalObject(defaultValue)

        testIt(defaultValue, Object, false, result)

        done()
    })

    it('Required number into schema - is OK?', done => {
        const defaultValue = 999

        const result = requiredInt(defaultValue)

        testIt(defaultValue, Number, true, result)

        done()
    })

    it('Optional number into schema - is OK?', done => {
        const defaultValue = 999

        const result = optionalInt(defaultValue)

        testIt(defaultValue, Number, false, result)

        done()
    })

    it('Required string into schema - is OK?', done => {
        const defaultValue = 'A999'

        const result = requiredString(defaultValue)

        testIt(defaultValue, String, true, result)
        chai.should().exist(result.trim, 'Not found prop result.trim!')
        chai.should().equal(
            true,
            result.trim,
            `Not match result.trim=${result.trim} and expected.trim=${true}`
        )

        done()
    })

    it('Optional string into schema - is OK?', done => {
        const defaultValue = 'A999'

        const result = optionalString(defaultValue)

        testIt(defaultValue, String, false, result)
        chai.should().exist(result.trim, 'Not found prop result.trim!')
        chai.should().equal(
            true,
            result.trim,
            `Not match result.trim=${result.trim} and expected.trim=${true}`
        )

        done()
    })

    it('Required array of strings into schema - is OK?', done => {
        const defaultValue = ['1', '2', '3']

        const result = requiredArrayString(defaultValue)

        testIt(defaultValue, Set, true, result)

        done()
    })

    it('Optional array of strings into schema - is OK?', done => {
        const defaultValue = ['1', '2']

        const result = optionalArrayString(defaultValue)

        testIt(defaultValue, Set, false, result)

        done()
    })

    it('Required enum of strings into schema - is OK?', done => {
        const values = ['1', '2', '3']
        const defaultValue = '1'

        const result = requiredEnumString(values, defaultValue)

        testIt(defaultValue, String, true, result)

        chai.should().exist(result.enum, 'Not found prop result.enum!')
        chai.should().equal(
            values,
            result.enum,
            `Not match result.enum=${util.inspect(result.enum)} and expected.enum=${util.inspect(
                values
            )}`
        )

        done()
    })

    it('Optional enum of strings into schema - is OK?', done => {
        const values = ['1', '2']
        const defaultValue = '1'

        const result = optionalEnumString(values, defaultValue)

        testIt(defaultValue, String, false, result)

        chai.should().exist(result.enum, 'Not found prop result.trim!')
        chai.should().equal(
            values,
            result.enum,
            `Not match result.enum=${util.inspect(result.enum)} and expected.enum=${util.inspect(
                values
            )}`
        )

        done()
    })

    it('String Hash Key - is OK?', done => {
        const result = hashKeyString()

        chai.should().exist(result.type, 'Not found prop expected.type!')
        chai.should().exist(result.hashKey, 'Not found prop expected.hashKey!')
        chai.should().exist(result.trim, 'Not found prop result.trim!')
        chai.should().equal(
            true,
            result.trim,
            `Not match result.trim=${result.trim} and expected.trim=${true}`
        )

        chai.should().equal(
            String.toString(),
            result.type.toString(),
            `Not match prop expected.type=${result.type.toString()} and result.type=${result.type.toString()}!`
        )
        chai.should().equal(
            true,
            result.hashKey,
            `Not match prop expected.hashKey=${result.hashKey} and result.haskKey=${result.hashKey}!`
        )

        done()
    })

    it('String Range Key - is OK?', done => {
        const result = rangeKeyString()

        chai.should().exist(result.type, 'Not found prop expected.type!')
        chai.should().exist(result.rangeKey, 'Not found prop expected.rangeKey!')
        chai.should().exist(result.trim, 'Not found prop result.trim!')
        chai.should().equal(
            true,
            result.trim,
            `Not match result.trim=${result.trim} and expected.trim=${true}`
        )

        chai.should().equal(
            String.toString(),
            result.type.toString(),
            `Not match prop expected.type=${result.type.toString()} and result.type=${result.type.toString()}!`
        )
        chai.should().equal(
            true,
            result.rangeKey,
            `Not match prop expected.hashKey=${result.hashKey} and result.haskKey=${result.rangeKey}!`
        )

        done()
    })

    it('String Global Index - is OK?', done => {
        const name = 'index-test-1'
        const rangeKey = 'test-1'
        const project = false
        const throughput = 1
        const result = globalIndexString(name, rangeKey, project, throughput)

        chai.should().exist(result.type, 'Not found prop expected.type!')
        chai.should().exist(result.required, 'Not found prop expected.required!')
        chai.should().exist(result.trim, 'Not found prop result.trim!')
        chai.should().exist(result.index, 'Not found prop result.index!')
        chai.should().exist(result.index.name, 'Not found prop result.index.name!')
        chai.should().exist(result.index.global, 'Not found prop result.index.global!')
        chai.should().exist(result.index.rangeKey, 'Not found prop result.index.rangeKey!')
        chai.should().exist(result.index.project, 'Not found prop result.index.project!')
        chai.should().exist(result.index.throughput, 'Not found prop result.index.throughput!')

        chai.should().equal(
            String.toString(),
            result.type.toString(),
            `Not match prop expected.type=${String.toString()} and result.type=${result.type.toString()}!`
        )
        chai.should().equal(
            true,
            result.required,
            `Not match prop expected.required=${true} and result.required=${result.required}!`
        )

        chai.should().equal(
            true,
            result.trim,
            `Not match result.trim=${true} and expected.trim=${true}`
        )

        chai.should().equal(
            name,
            result.index.name,
            `Not match prop expected.index.name=${name} and result.index.name=${result.index.name}!`
        )

        chai.should().equal(
            true,
            result.index.global,
            `Not match prop expected.index.global=${true} and result.index.global=${
                result.index.global
            }!`
        )

        chai.should().equal(
            rangeKey,
            result.index.rangeKey,
            `Not match prop expected.index.name=${rangeKey} and result.index.rangeKey=${result.index.rangeKey}!`
        )

        chai.should().equal(
            project,
            result.index.project,
            `Not match prop expected.index.project=${project} and result.index.project=${result.index.project}!`
        )

        chai.should().equal(
            throughput,
            result.index.throughput,
            `Not match prop expected.index.throughput=${throughput} and result.index.throughput=${result.index.throughput}!`
        )

        done()
    })
})
