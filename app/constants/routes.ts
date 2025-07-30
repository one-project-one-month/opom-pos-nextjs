const adminPrefix = "/admin/";
const staffPrefix = "/staff/";
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",

  //Admin routes
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  SALE_REPORTS: adminPrefix + "sale-reports",
  INVENTORY: adminPrefix + "inventory",
  DISCOUNT_ITEMS: adminPrefix + "discount-items",
  STAFF_LISTS: adminPrefix + "admin-lists",
  LOYALTY_LISTS: adminPrefix + "loyalty-lists",

  //Staff routes
  STAFF: "/staff",
  STAFF_ORDERS: staffPrefix + "order-history",
};

export const getRoleBasedRoute = (role: string | "staff"): string => {
  switch (role) {
    case "admin":
      return ROUTES.ADMIN;
    case "staff":
    case null:
    case undefined:
      return ROUTES.STAFF;

    default:
      return ROUTES.STAFF;
  }
};
