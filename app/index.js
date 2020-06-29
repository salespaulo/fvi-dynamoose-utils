'use strict'

const globalIndexString = (name = null, rangeKey = null, project = true, throughput = 5) => {
    return {
        type: String,
        trim: true,
        required: true,
        index: {
            name,
            rangeKey,
            project,
            throughput,
            global: true,
        },
    }
}

const requiredString = (value = null, trim = true) => {
    return { type: String, required: true, default: value, trim }
}

const optionalString = (value = null, trim = true) => {
    return {
        type: String,
        required: false,
        default: value,
        trim,
    }
}

const requiredEnumString = (values = null, value = null) => {
    if (!values) {
        const e = new Error(`[Dynamoose Utils]: Enum String Values is Empty!`)
        e.name = 'RequiredEnumStringDynamooseError'
        throw e
    }

    return {
        type: String,
        trim: true,
        enum: values,
        required: true,
        default: value,
    }
}

const optionalEnumString = (values = null, value = null) => {
    if (!values) {
        const e = new Error(`[Dynamoose Utils]: Enum String Values is Empty!`)
        e.name = 'OptionalEnumStringDynamooseError'
        throw e
    }

    return {
        type: String,
        trim: true,
        enum: values,
        required: false,
        default: value,
    }
}

const requiredArrayString = (values = null) => {
    return {
        type: Set,
        schema: [String],
        default: values,
        required: true,
    }
}

const optionalArrayString = (values = null) => {
    return {
        type: Set,
        schema: [String],
        default: values,
        required: false,
    }
}

const hashKeyString = () => {
    return {
        type: String,
        trim: true,
        hashKey: true,
    }
}

const rangeKeyString = () => {
    return {
        type: String,
        rangeKey: true,
        trim: true,
    }
}

const optionalObject = (value = null) => {
    return {
        type: Object,
        default: value,
        required: false,
    }
}

const requiredObject = (value = null) => {
    return {
        type: Object,
        default: value,
        required: true,
    }
}

const requiredInt = (value = null) => {
    return {
        type: Number,
        default: value,
        required: true,
    }
}

const optionalInt = (value = null) => {
    return {
        type: Number,
        default: value,
        required: false,
    }
}

module.exports = {
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
}
