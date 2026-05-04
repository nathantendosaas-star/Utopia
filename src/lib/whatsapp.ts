import { Order } from '../types/schema';
import { formatPrice } from './currency';

export const WHATSAPP_PHONE = '256788185518';

export function buildOrderMessage(order: Order): string {
  const lines = [
    `UTOPIA UG ORDER ${order.id}`,
    '',
    'Customer:',
    `Name: ${order.customer?.name || 'Not provided'}`,
    `Phone: ${order.customer?.phone || 'Not provided'}`,
    `Delivery area: ${order.customer?.deliveryArea || 'Not provided'}`,
    ...(order.customer?.notes ? [`Notes: ${order.customer.notes}`] : []),
    '',
    'Items:',
    ...order.items.map((item, index) => (
      `${index + 1}. ${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity, 'UGX')}`
    )),
    '',
    `Total: ${formatPrice(order.total, 'UGX')}`,
    `Order status: ${order.status || 'whatsapp_pending'}`,
  ];

  return lines.join('\n');
}

export function buildWhatsAppAppUrl(order: Order): string {
  return `whatsapp://send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(buildOrderMessage(order))}`;
}
