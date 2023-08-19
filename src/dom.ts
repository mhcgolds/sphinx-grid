import { type GridColumn, type GridDataItem } from "./types";

export default class DOM {
    private document: any;
    private _currentEl: any;
    private _table: any;
    private _thead: any;
    private _theadTr: any;
    private _tbody: any;
    private _colgroup: any;

    constructor(document: any) {
        this.document = document;
    }

    private createEl(tagName: string): any {
        return this.document.createElement(tagName);
    }

    public renderTo(selector: string): this {
        const element = this.document.querySelector(selector);

        if (!element) throw Error(`No element with selector ${selector} was found in document`);

        element.appendChild(this._table);
        return this;
    }

    public table(): this {
        if (this._table) throw Error('TABLE already created');

        this._currentEl = this._table = this.createEl('table');
        this._colgroup = this.createEl('colgroup');
        this._thead = this.createEl('thead');
        this._theadTr = this.createEl('tr');
        this._tbody = this.createEl('tbody');
        this._thead.appendChild(this._theadTr);
        this._table.appendChild(this._colgroup);
        this._table.appendChild(this._thead);
        this._table.appendChild(this._tbody);
        return this;
    }

    public attr(name: string, value: any): this {
        if (!this._currentEl) throw Error('Create a element to set an attribute');

        this._currentEl.setAttribute(name, value);
        return this;
    }

    public th(gridColumn: GridColumn): this {
        if (!this._table) throw Error('Create a TABLE in order to add a TH');

        const th = this.createEl('th');
        th.innerText = gridColumn.title;
        th.setAttribute('scope', 'col');

        const col = this.createEl('col');

        if (gridColumn.width) {
            col.setAttribute('width', `${gridColumn.width}px`);
        }

        if (gridColumn.align) {
            col.setAttribute('align', gridColumn.align);
        }

        this._colgroup.appendChild(col);
        this._theadTr.appendChild(th);
        return this;
    }

    public tr(): this {
        const tr = this._currentEl = this.createEl('tr');
        this._tbody.appendChild(tr);
        return this;
    }

    public td(dataItem: GridDataItem): this {
        if (this._currentEl.tagName !== 'TR') throw Error('TD should be created after TR');

        const td = this.createEl('td');
        td.innerHTML = dataItem.value;
        this._currentEl.appendChild(td);
        return this;
    }

    public clearBody(): this {
        this._tbody.innerHTML = '';
        return this;
    }
};