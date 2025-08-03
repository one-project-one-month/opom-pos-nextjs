const adminPrefix = '/admin/';
const staffPrefix = '/staff/';
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  //Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  SALE_REPORTS: adminPrefix + 'sale-reports',
  INVENTORY: adminPrefix + 'inventory',
  DISCOUNT_ITEMS: adminPrefix + 'discount-items',
  STAFF_LISTS: adminPrefix + 'admin-lists',
  LOYALTY_LISTS: adminPrefix + 'loyalty-lists',
  MEMBER_LISTS: adminPrefix + 'member-lists',

  //Staff routes
  STAFF: '/staff',
  STAFF_ORDERS: staffPrefix + 'order-history',
};

export const getRoleBasedRoute = (role: string | 'cashier'): string => {
  console.log(role);
  
  switch (role) {
    case 'manager':
      return ROUTES.ADMIN;
    case 'cashier':
    case null:
    case undefined:
      return ROUTES.STAFF;

    default:
      return ROUTES.STAFF;
  }
};
