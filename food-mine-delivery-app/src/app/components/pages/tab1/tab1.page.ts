import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderService } from 'src/app/Shared/Services/order.service';
import { register } from 'swiper/element/bundle';
import { OrderDetailComponent } from '../../partials/order-detail/order-detail.component';

register();
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  [x: string]: any;
  orders: any[] = [];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
  }
  constructor(
    private orderService: OrderService,
    private modalController: ModalController
  ) {}
  onSlideChange() {
    console.log(this.swiperRef);
  }

  async openOrderDetails(order: any) {
    const modal = await this.modalController.create({
      component: OrderDetailComponent,
      breakpoints: [0, 0.25, 0.5, 0.75],
      componentProps: { order }, // Pass the order object to the modal
      cssClass: 'custom-order-modal',
    });
    this.orderService.detailModal = modal;
    return await modal.present();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrdersByPostalCode();
  }

  getOrdersByPostalCode() {
    this.orderService.getOrdersForDeliveryByPostalCode().subscribe({
      next: (data: any) => {
        if (data.success) {
          this.orders = data.ordersByPostalCode;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
