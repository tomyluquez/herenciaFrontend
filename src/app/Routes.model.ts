export const routesModel = {
  Home: 'Home',
  Products: 'Products',
  Stock: 'Stock',
  Cart: 'Cart',
  Login: 'Login',
  Register: 'Register',
  Contact: 'Contact',
  ControlPanel: 'ControlPanel',
  Order: 'Order',
  CustomerProfile: 'CustomerProfile'
};

export const productsRoutesModel = {
  Product: 'product/:productId',
  FormProduct: ':productId'
}

export const stockRoutesModel = {
  FormStock: ':variantId'
}

export const orderRoutesModel = {
  OrderStatus: 'order-status/:orderNumber'
}