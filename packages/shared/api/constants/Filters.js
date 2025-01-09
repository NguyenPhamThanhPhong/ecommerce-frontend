
export const joinConditions = {
    AND: 'AND',
    OR: 'OR',
}
export const comparisons = {
    EQUAL: 'EQUAL',
    NOT_EQUAL: 'NOT_EQUAL',
    GREATER: 'GREATER',
    LESS: 'LESS',
    GREATER_OR_EQUAL: 'GREATER_OR_EQUAL',
    LESS_OR_EQUAL: 'LESS_OR_EQUAL',
    BETWEEN: 'BETWEEN',
    LIKE: 'LIKE',
    NOT_LIKE: 'NOT_LIKE',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
    IS_NULL: 'IS_NULL',
    IS_NOT_NULL: 'IS_NOT_NULL',
}
const types = {
    string: 'string',
    int: 'int',
    milisecs: 'milisecs',
    bigDecimal: 'bigDecimal',
    long: 'long',
    date: 'date',
    float: 'float',
    boolean: 'boolean',
    array: 'array',

}

export function createFilter(joinCondition, joinEntity, paramName, type, comparison, value, opposite) {
    return {
        joinCondition,
        joinEntity,
        parameterName: paramName,
        type,
        comparison,
        value,
        opposite
    }
}

export function dateBefore({ joinEntity, paramName = 'availableDate', upperBound = new Date(), type = types.date }) {
    return createFilter(joinConditions.AND, joinEntity, paramName, type, comparisons.LESS_OR_EQUAL, upperBound, false);
}

export function dateAfter({ joinEntity, paramName = 'availableDate', lowerBound = new Date(), type = types.date }) {
    return createFilter(joinConditions.AND, joinEntity, paramName, type, comparisons.GREATER_OR_EQUAL, lowerBound, false);
}

export function dateBetween({ joinEntity, paramName = 'availableDate', lowerBound = new Date(), upperBound = new Date(), type = types.date }) {
    return [
        createFilter(joinConditions.AND, joinEntity, paramName, null, comparisons.IS_NOT_NULL, null, false),
        dateAfter({ joinEntity, paramName, lowerBound, type }),
        dateBefore({ joinEntity, paramName, upperBound, type })
    ]
}

