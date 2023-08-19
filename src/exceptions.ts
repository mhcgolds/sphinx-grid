import { type ExceptionType } from "./types";

const errorPrefix: string = "Sphinx Grid Error: ";

export class Exceptions {
    public static throw(exception: ExceptionType, exceptionData?: object): void {
        if (exceptionData === null) exceptionData = {};

        const errorMessage = new Function('data', 'exception', "return `(${exception.code}) - ` + `${exception.message}`;");
        const finalErrorMessage = errorMessage(exceptionData, exception);
        throw new Error(errorPrefix + finalErrorMessage);
    };
};

// User exceptions
export const USR_INV_PROP:ExceptionType = {
    code: "USR_INV_PROP",
    message: "Invalid property \"${data.propertyName}\" for object \"${data.objectName}\""
};