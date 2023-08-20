export type GridColumn = {
    field?: string,
    title?: string,
    width?: number,
    align?: string,
    sortOrder?: number,
    sortDir: "asc" | "desc",
    template?: string,
    thAttributes?: IDictionary<string | number>,
    tdAttributes?: IDictionary<string | number>
};
  
export type GridFilter = {
    field: string,
    value: string,
    operator?: "equals" | "greater" | "lower" | "greater_equals" | "lower_equals" | "different"
};
  
export type GridDataItem = {
    field?: string,
    value?: any,
    template?: string,
    column: GridColumn,
    dataItem: object
};

export type GridData = {
    items: GridDataItem[]
};

export type GridRemoteDataItem = {
    field?: string,
    value: any,
    template?: string
}

export type ExceptionType = {
    code: string,
    message: string
};

export interface IDictionary<T> {
    [key: string]: T;
}