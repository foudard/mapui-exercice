import { Component, EventEmitter, Input, Output } from '@angular/core';

type TableColumn<T> = {
  field: string;
  value: (item: T) => string | number | undefined;
  link?: (item: T) => string;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> {
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() details = new EventEmitter();

  @Input() canAdd = true;
  @Input() canDelete = true;
  @Input() canEdit = true;
  @Input() canSeeDetails = true;
  @Input() actionLabel = 'Add';
  @Input() items: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  displayedColumns: string[] = [];

  ngOnChanges() {
    this.displayedColumns = this.columns.map((i) => i.field);
    if (this.canAdd || this.canDelete || this.canEdit || this.canSeeDetails) {
      this.displayedColumns.push('actions');
    }
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(item: T) {
    this.edit.emit(item);
  }

  onRemove(item: T) {
    this.remove.emit(item);
  }

  onDetails(item: T) {
    this.details.emit(item);
  }
}

export type { TableColumn };
