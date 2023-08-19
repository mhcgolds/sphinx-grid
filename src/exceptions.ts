export function throwException(exceptionConst: string, exceptionData: object): void {
    const errorMessage = new Function('data', 'errorMessage', "return `${errorMessage}`;");
    throw new Error(errorMessage(exceptionData, errorMessage));
};

// User exceptions
export const USR_INV_PROP = "`Invalid property \"${data.propertyName}\" for object \"${data.objectName}\"`";