import { 
    type GridData, 
    type GridColumn, 
    type GridFilter, 
    type GridDataItem,
    type GridRemoteDataItem,
    type IDictionary
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
        this.columns.push(gridColumn);
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
  
    public getData(applyFilters?: boolean): GridData[] {
        if (!applyFilters) {
            return this.data;
        }

        return this.applyFilters(this.data);
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

    public addDataItemJson(dataItem: IDictionary<any>): this {
        let newData:GridData = { items: [] };

        this.columns.forEach(column => {
            const value: any = (column.field && dataItem[column.field] ? dataItem[column.field] : null);
            const template: any = (column.field && dataItem[`_template-${column.field}`] ? dataItem[`_template-${column.field}`] : null);

            newData.items.push({
                field: column.field,
                value: value,
                template: template,
                column: column,
                dataItem: dataItem
            } as GridDataItem);
        });
            
        this.data?.push(newData);

        return this;
    }

    public refresh(applyFilters?: boolean): this {
        this.dom.clearBody();
        
        this.getData(applyFilters).forEach((item, index) => {
            const tr = this.dom.tr().attr('class', (index % 2 == 0 ? 'row-even' : 'row-odd'));
                
            item.items.forEach(cell => {
                tr.td(cell);
            });
        });

        return this;
    }

    public clearFilters(): this {
        this.filters = [];
        return this;
    }

    public applyFilters(data: GridData[]): GridData[] {
        if (!this.filters.length) return this.data;

        return data.filter(item => {
            const dataItem = item.items[0].dataItem as IDictionary<any>;

            for (let i = 0; i < this.filters.length; i++) {
                const filter = this.filters[i];
                const operator = filter.operator ?? 'equals';
                const value = dataItem[filter.field];

                if (operator === 'equals' && value != filter.value) return false;
                else if (operator === 'different' && !(value != filter.value)) return false;
                else if (operator === 'greater' && !(value > filter.value)) return false;
                else if (operator === 'greater_equals' && !(value >= filter.value)) return false;
                else if (operator === 'lower' && !(value < filter.value)) return false;
                else if (operator === 'lower_equals' && !(value <= filter.value)) return false;
            }

            return true;
        });
    }
};