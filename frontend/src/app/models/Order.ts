import { OrderStatus } from '../shared/constants/order_status';
import { CartItem } from './CartItem';
export class Order {
  id!: number;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  addressLatLng?: google.maps.LatLngLiteral;
  paymentId!: string;
  createdAt!: string;
  status!: OrderStatus;
}
