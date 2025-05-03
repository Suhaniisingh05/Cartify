import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCart, cart } from '../data/cart.js';

async function loadPage() {
  try {
    // Fetch products and load the cart
    await loadProductsFetch();
    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  } catch (error) {
    console.log('unexpected error ');
  }

  // Render the order summary and payment summary
  renderOrderSummary();
  renderPaymentSummary();

  // Update the checkout header with the item count in the cart
  updateCheckoutHeader();
}

function updateCheckoutHeader() {
  // Get the total number of items in the cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Update the checkout header with the number of items
  const checkoutHeader = document.querySelector('.checkout-header-middle-section');
  checkoutHeader.innerHTML = `Checkout (${itemCount} item${itemCount !== 1 ? 's' : ''})`;
}

// Load the page content
loadPage();
