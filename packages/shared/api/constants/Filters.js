
export const JOIN_CONDITIONS = {
    AND: 'AND',
    OR: 'OR',
}
export const COMPARISONS = {
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
export const TYPES = {
    string: 'string',
    int: 'int',
    milisecs: 'milisecs',
    bigDecimal: 'bigDecimal',
    long: 'long',
    date: 'date',
    float: 'float',
    boolean: 'boolean',
    array: 'array',
    uuid:'uuid',
    paymentStatus: 'paymentStatus',
    role: 'role',
    productStatus: 'productStatus',

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

export function dateBefore({ joinEntity, paramName = 'availableDate', upperBound = new Date(), type = TYPES.date }) {
    return createFilter(JOIN_CONDITIONS.AND, joinEntity, paramName, type, COMPARISONS.LESS_OR_EQUAL, upperBound, false);
}

export function dateAfter({ joinEntity, paramName = 'availableDate', lowerBound = new Date(), type = TYPES.date }) {
    return createFilter(JOIN_CONDITIONS.AND, joinEntity, paramName, type, COMPARISONS.GREATER_OR_EQUAL, lowerBound, false);
}

export function dateBetween({ joinEntity, paramName = 'availableDate', lowerBound = new Date(), upperBound = new Date(), type = TYPES.date }) {
    return [
        createFilter(JOIN_CONDITIONS.AND, joinEntity, paramName, null, COMPARISONS.IS_NOT_NULL, null, false),
        dateAfter({ joinEntity, paramName, lowerBound, type }),
        dateBefore({ joinEntity, paramName, upperBound, type })
    ]
}

