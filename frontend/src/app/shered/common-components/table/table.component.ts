import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface TableColumn {
  key: string;
  label: string;
  formatter?: (row: any) => string; // optional custom formatter
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  // Control which actions should appear
  @Input() showView = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() currentPage = 1;
  @Input() pageSize = 10;

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
