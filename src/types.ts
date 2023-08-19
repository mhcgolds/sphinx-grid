export type GridColumnButton = {
    title: string,
    icon: string
};
  
export type GridColumn = {
    field: string,
    title: string,
    width: number | null,
    sortOrder: number | null,
    sortDir: "asc" | "desc",
    button: GridColumnButton | null
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