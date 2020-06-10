'use strict'

const toDbLastKey = objLastKey => {
    if (!objLastKey) {
        const e = new Error(`[Dynamoose Utils]: To DB Last Key parameter is Empty or Null!`)
        e.name = 'ToDbLastKeyDynamooseError'
        throw e
    }

    const keys = Object.keys(objLastKey)
    const obj = {}

    keys.filter(k => !!objLastKey[k]).forEach(k => {
        obj[k] = { S: objLastKey[k].toString() }
    })

    return obj
}

const toLastKey = dbLastKey => {
    if (!dbLastKey) {
        const e = new Error(`[Dynamoose Utils]: To JS Last Key parameter is Empty or Null!`)
        e.name = 'ToLastKeyDynamooseError'
        throw e
    }

    const keys = Object.keys(dbLastKey)
    const obj = {}

    keys.forEach(k => {
        obj[k] = dbLastKey[k].S
        return obj
    })

    return obj
}

const all = async (model, startKey, limit) => {
    if (startKey && limit) {
        const lastKey = toDbLastKey({ id: startKey })
        return await model.scan.all(lastKey, limit)
    }

    if (startKey) {
        const lastKey = toDbLastKey({ id: startKey })
        return await model.scan.all(lastKey)
    }

    if (limit) {
        return await model.scan.all(false, limit)
    }

    return await model.scan.all()
}

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
        type: [String],
        default: values,
        required: true,
    }
}

const optionalArrayString = (values = null) => {
    return {
        type: [String],
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
    toDbLastKey,
    toLastKey,
    all,
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
