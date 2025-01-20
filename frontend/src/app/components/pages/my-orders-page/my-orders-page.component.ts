import { Component, ElementRef, Renderer2 } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { UserService } from '../../../shared/services/user.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PaymentService } from '../../../shared/services/paymentServices/payment.service';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  styleUrl: './my-orders-page.component.css',
})
export class MyOrdersPageComponent {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  //orders: Observable<any[]> = new Observable<any[]>();
  orders: any[] = [];
  ngOnInit(): void {
    this.orderService
      .getOrdersByUserEmail(this.userService.currentUser.email)
      .subscribe({
        next: (response: any) => {
          //this.orders = of(response.orders);
          this.orders = response.orders;
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getSeverityForPayments(status: string) {
    switch (status) {
      case 'Paid':
        return '#2ECC71'; // Fresh green
      case 'COD Received':
        return '#2ECC71'; // Fresh green
      case 'Pending':
        return '#e72929'; // Bold red
      case 'Refunded':
        return '#3498DB'; // Vibrant blue
      default:
        return '#95A5A6'; // Neutral gray
    }
  }

  getSeverityForOrders(status: string) {
    switch (status) {
      case 'Processing':
        return '#FFA500'; // Orange
      case 'Confirmed':
        return '#2ECC71'; // Green
      case 'Shipped':
        return '#3498DB'; // Blue
      case 'Delivered':
        return '#8E44AD'; // Purple
      case 'Cancelled':
        return '#E74C3C'; // Red
      default:
        return '#95A5A6'; // Neutral gray
    }
  }

  moveToOrderDetails(orderId: string) {
    this.paymentService.isCalledFromMyOrdersPage = true;
    this.router.navigateByUrl('/payment/' + orderId);
  }

  //test
  headers: string[] = [
    'Sr. No',
    'Order ID',
    'Total Price',
    'Date',
    'Phone No',
    'Order Status',
    'Payment Status',
  ];

  onDragStart(event: DragEvent, headerText: string): void {
    if (event.dataTransfer) {
      // Create the custom drag preview
      const dragPreview = document.createElement('div');
      dragPreview.classList.add('drag-preview');
      dragPreview.style.backgroundColor = 'red';
      dragPreview.style.paddingLeft = '15px';
      dragPreview.style.paddingRight = '16px';
      dragPreview.style.paddingTop = '4px';
      dragPreview.style.paddingBottom = '4px';
      dragPreview.style.borderRadius = '20px';
      dragPreview.style.display = 'flex';
      dragPreview.style.flexWrap = 'no-wrap';

      // Add an icon to the drag preview
      const icon = document.createElement('span');
      icon.classList.add('drag-preview-icon');
      icon.innerHTML = '&#128204;'; // Example: Pencil icon (Unicode)
      dragPreview.appendChild(icon);

      // Add the header text to the drag preview
      const text = document.createElement('span');
      text.classList.add('drag-preview-text');
      text.textContent = headerText;
      dragPreview.appendChild(text);

      // Append the drag preview to the body
      document.body.appendChild(dragPreview);

      // Position the drag preview
      const offsetX = event.clientX + 10;
      const offsetY = event.clientY + 10;
      dragPreview.style.position = 'absolute';
      dragPreview.style.left = `${offsetX}px`;
      dragPreview.style.top = `${offsetY}px`;

      // Set the drag image manually
      event.dataTransfer.setDragImage(dragPreview, 100, 25);

      // Remove the preview after drag starts
      setTimeout(() => {
        document.body.removeChild(dragPreview);
      }, 0);
    }
  }
}
