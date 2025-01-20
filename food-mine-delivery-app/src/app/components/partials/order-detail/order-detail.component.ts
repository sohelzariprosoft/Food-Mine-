import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { OrderService } from 'src/app/Shared/Services/order.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  standalone: false,
})
export class OrderDetailComponent implements OnInit {
  order: any;
  constructor(
    private navParams: NavParams,
    private orderService: OrderService
  ) {
    this.order = this.navParams.get('order'); // Retrieve 'order' from NavParams
    console.log('Received order:', this.order); // Verify data reception
    console.log(this.order);
  }
  dismissModal() {
    this.orderService.detailModal.dismiss();
  }
  ngOnInit() {}

  acceptOrder() {}
}
