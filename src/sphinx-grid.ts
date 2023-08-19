import { 
    type GridData, 
    type GridColumn, 
    type GridFilter, 
    type GridDataItem,
    type GridRemoteData,
    type GridRemoteDataItem 
} from './types';

import { 
    Exceptions, 
    USR_INV_PROP
} from './exceptions';

import DOM from './dom';

export default class SphinxGrid {
    private target: any;
    private filters: GridFilter[];
    private columns: GridColumn[];
  
    private data: GridData[];
    private isLayoutBuilt: boolean;

    private dom: DOM;
  
    constructor(document: any) {
        this.data = [];
        this.filters = [];
        this.columns = [];
        this.isLayoutBuilt = false;
        this.dom = new DOM(document);
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
  
    public getData(): GridData[] {
        return this.data;
    }
  
    public buildLayout(): void {
        if (this.isLayoutBuilt) return;
    
        const table = this.dom.table()
            .attr('class', 'sphinx-grid');

        this.columns.forEach(column => {
            table.th(column);
        });

        this.dom.renderTo(this.target);
        this.isLayoutBuilt = true;
    }

    public addDataItemJson(dataItems: GridRemoteDataItem[]): this {
        let newData:GridData = { items: [] };

        dataItems.forEach(entry => {
            if (!entry.field) Exceptions.throw(USR_INV_PROP, { objectName: 'dataItem', propertyName: 'field' });
            if (!entry.value) Exceptions.throw(USR_INV_PROP, { objectName: 'dataItem', propertyName: 'value' });

            const column = this.getColumn(entry.field);

            newData.items.push({
                field: entry.field,
                value: entry.value,
                column: column
            } as GridDataItem);
        });
            
        this.data?.push(newData);

        return this;
    }

    public refresh(): this {
        this.dom.clearBody();
        
        this.getData().forEach((item, index) => {
            const tr = this.dom.tr().attr('class', (index % 2 == 0 ? 'even-row' : 'odd-row'));
                
            item.items.forEach(cell => {
                tr.td(cell);
            });
        });

        return this;
    }
  };