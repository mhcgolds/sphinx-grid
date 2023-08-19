export type GridColumnButton = {
    title: string,
    icon: string
};
  
export type GridColumn = {
    field: string,
    title: string,
    width?: number,
    align?: string,
    sortOrder?: number,
    sortDir: "asc" | "desc",
    button?: GridColumnButton
};
  
export type GridFilter = {
    field: string,
    value: string
};
  
export type GridDataItem = {
    field: string,
    value: any,
    column: GridColumn
};

export type GridData = {
    items: GridDataItem[]
};

export type GridRemoteDataItem = {
    field: string,
    value: any,
    template: string
}

export type GridRemoteData = {
    entries: GridRemoteDataItem[]
}

export type ExceptionType = {
    code: string,
    message: string
};