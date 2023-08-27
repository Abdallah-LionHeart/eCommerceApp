import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/appModels/order';
import { OrderService } from 'src/app/appServices/order.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent {
  order!: Order;

  constructor(private orderService: OrderService, private route: ActivatedRoute,
    private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
      }
    })
  }

}
