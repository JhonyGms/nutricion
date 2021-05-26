import { Component, Input } from '@angular/core';
import productItems from 'src/app/data/products';
import { IProduct } from 'src/app/data/api.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
})
export class RecentOrdersComponent {
  @Input() title = 'dashboards.best-sellers';

  constructor() {}

  rows = productItems.slice(0, 14);
  columns = [
    { prop: 'title' },
    { name: 'Sales' },
    { name: 'Stock' },
    { name: 'Category' },
  ];

  columnMode = ColumnMode;

  data: IProduct[] = productItems.slice(0, 8);
}
