import { type GridColumn, type GridFilter,  type GridDataItem } from './types';
import { 
    throwException, 
    USR_INV_PROP 
} from './exceptions';

export class SphinxGrid {
    private target: any;
    private url: string | null;
    private filters: GridFilter[];
    private columns: GridColumn[];
  
    private data: GridDataItem[];
    private isLayoutBuilt: boolean;
  
    constructor() {
        this.url = null;
        this.data = [];
        this.filters = [];
        this.columns = [];
        this.isLayoutBuilt = false;
    }
  
    public setUrl(url: string): this {        
        this.url = url;
        return this;
    }
  
    public setTarget(target: any): this {
        this.target = target;
        return this;
    }
  
    public addColumn(gridColumn: GridColumn): this {
        if (this.getColumn(gridColumn.field) === null) {
            this.columns.push(gridColumn);
        }
        return this;
    }
  
    public addFilter(gridFilter: GridFilter): this {
        if (this.getFilter(gridFilter.field) === null) {
            this.filters.push(gridFilter);
        }
        return this;
    }
  
    public getColumn(field: string): GridColumn | null {
        const column = this.columns.find(column => column.field === field);
    
        if (column) {
            return column;
        }
    
        return null;
    }
  
    public getFilter(field: string): GridFilter | null {
        const filter = this.filters.find(filter => filter.field === field);
    
        if (filter) {
            return filter;
        }
    
        return null;
    }
  
    public fetchUrl(): this {
        if (this.url === null) throw "Url not defined.";
    
        this.buildLayout();
    
        // TODO: Open ajax request to the given url. Set data to this.data as GridDataItem and call fillGrid()
    
        return this;
    }
  
    public getData(): GridDataItem[] {
        return this.data;
    }
  
    private buildLayout(): void {
        if (this.isLayoutBuilt) return;
    
        // TODO: Build the grid's HTML 
    }

    public addDataItemJson(dataItem: any): this {
        if (!dataItem.field) throwException(USR_INV_PROP, { objectName: 'dataItem', propertyName: 'field' });
        if (!dataItem.value) throwException(USR_INV_PROP, { objectName: 'dataItem', propertyName: 'field' });

        const column = this.getColumn(dataItem.field);

        this.data.push({
            field: dataItem.field,
            value: dataItem.value,
            column: column
        } as GridDataItem);

        return this;
    }
  
    private fillGrid(requestData: any[]): void {
        this.clearGrid();
        requestData.forEach(item => {
            this.addDataItemJson(item);  
            // Render TD according to 'column'
        });
    }
  
    private clearGrid(): void {
        this.data = [];
    
        // TODO: Clears all grid rows
    }
  };