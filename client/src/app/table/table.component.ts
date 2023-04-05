import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../models/Doctors';
import { Patient } from '../../models/Patients';
import { Treatment } from '../../models/Treatment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() details = new EventEmitter();

  @Input() canAdd = true;
  @Input() canDelete = true;
  @Input() canEdit = true;
  @Input() canSeeDetails = true;
  @Input() actionLabel = 'Add';
  @Input() items: (Patient | Doctor | Treatment)[] = [];
  @Input() columns: {
    field: string;
    value: (item: Patient & Doctor & Treatment) => string | number | undefined;
    link?: (item: Patient & Doctor & Treatment) => string;
  }[] = [];

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

  onEdit(item: Patient | Doctor | Treatment) {
    this.edit.emit(item);
  }

  onRemove(item: Patient | Doctor | Treatment) {
    this.remove.emit(item);
  }

  onDetails(item: Patient | Doctor | Treatment) {
    this.details.emit(item);
  }
}
