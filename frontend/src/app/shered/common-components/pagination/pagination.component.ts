import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems = 0; // total records
  @Input() pageSize = 10; // items per page
  @Input() currentPage = 1; // active page (1-based)
  @Input() maxPagesToShow = 5; // how many page buttons to display
  @Input() pageSizeOptions: number[] = [5, 10, 20, 50];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pages: number[] = [];
  totalPages = 0;

  ngOnChanges(): void {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    this.currentPage = Math.min(Math.max(1, this.currentPage), this.totalPages);
    this.pages = this.buildPages();
  }

  changePageSize(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const size = +selectElement.value;
    this.pageSize = size;
    this.currentPage = 1;
    this.pageSizeChange.emit(this.pageSize);
    this.ngOnChanges();
  }

  private buildPages(): number[] {
    const total = this.totalPages;
    const max = this.maxPagesToShow;

    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(max / 2);
    let start = this.currentPage - half;
    let end = this.currentPage + half;

    if (start < 1) {
      start = 1;
      end = max;
    } else if (end > total) {
      end = total;
      start = total - max + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goTo(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    this.pages = this.buildPages();
  }

  first() {
    this.goTo(1);
  }
  prev() {
    this.goTo(this.currentPage - 1);
  }
  next() {
    this.goTo(this.currentPage + 1);
  }
  last() {
    this.goTo(this.totalPages);
  }
}
