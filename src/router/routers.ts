import Login from '@/views/Pages/Login.vue';
import ForgotPassword from '@/views/Pages/ForgotPassword.vue';
import Dashboard from "@/views/Pages/procurement/dashboard.vue";
import Payments from "@/views/Pages/procurement/payments/index.vue";
import PaymentDetails from "@/views/Pages/procurement/payments/[id]/index.vue";
import ProductRequests from "@/views/Pages/procurement/product-requests/index.vue";
import Profile from "@/views/Pages/procurement/profile/index.vue";
import Purchase from "@/views/Pages/procurement/purchase/index.vue";
// import ApprovedPo from "@/views/Pages/procurement/purchase/approvedPo.vue";
// import AwaitingPo from "@/views/Pages/procurement/purchase/awaitingPo.vue";
// import Suppliers from "@/views/Pages/procurement/suppliers/index.vue";
// import SupplierDetails from "@/views/Pages/procurement/suppliers/[id]/index.vue";
import OrderDetails from "@/views/Pages/procurement/purchase/[id]/index.vue";
import GRNDetails from "@/views/Pages/procurement/purchase/grn/[id]/index.vue";
import SuppliersReturn from "@/views/Pages/procurement/suppliers-return/index.vue";
import SupplierReturnDetails from "@/views/Pages/procurement/suppliers-return/[id]/index.vue";

const routes = [
	// Public routes
	{
		path: "/",
		name: "login",
		component: Login,
		meta: { 
			layout: "guest",
			requiresAuth: false
		},
	},
	{
		path: "/passwords/reset",
		name: "forgotPassword",
		component: ForgotPassword,
		meta: { 
			layout: "guest",
			requiresAuth: false 
		},
	},

	// Authenticated routes
	{
		path: "/dashboard",
		name: "dashboard",
		component: Dashboard,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/payments",
		name: "payments",
		component: Payments,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/payments/:id",
		name: "payment-details",
		component: PaymentDetails,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/product-requests",
		name: "product-requests",
		component: ProductRequests,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/profile",
		name: "profile",
		component: Profile,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/purchase",
		name: "purchase",
		component: Purchase,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/purchase/:id",
		name: "order-details",
		component: OrderDetails,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/purchase/grn/:id",
		name: "grn-details",
		component: GRNDetails,
		meta: { layout: "default", requiresAuth: true },
	},
	/**  inbound routes begins here */
	{
		path: "/inbound/dashboard",
		name: "inbound.dashboard",
		component: () => import("@/views/Pages/Inbound/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/purchase_orders",
		name: "inbound.purchase_orders",
		component: () => import("@/views/Pages/Inbound/PurchaseOrder/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/purchase_orders/:id",
		name: "inbound.purchase_orders.show",
		component: () => import("@/views/Pages/Inbound/PurchaseOrder/Show.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/purchase_orders/:id/edit",
		name: "inbound.purchase_orders.edit",
		component: () => import("@/views/Pages/Inbound/PurchaseOrder/Edit.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/grn/create",
		name: "inbound.grn.create",
		component: () => import("@/views/Pages/Inbound/GRN/Create.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/purchase_orders/:id/grn/create",
		name: "inbound.purchase_order.grn.create",
		component: () => import("@/views/Pages/Inbound/GRN/Create.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/purchase_orders/:id/grn/approve",
		name: "admin.invoices.approve",
		component: () => import("@/views/Pages/Inbound/GRN/Approve.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/grn/:id/edit",
		name: "inbound.grn.edit",
		component: () => import("@/views/Pages/Inbound/GRN/Edit.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/grn/:id",
		name: "inbound.grn.show",
		component: () => import("@/views/Pages/Inbound/GRN/Show.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers",
		name: "inbound.suppliers.index",
		component: () => import("@/views/Pages/Inbound/Suppliers/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers/returns",
		name: "inbound.suppliers.returns.index",
		component: () => import("@/views/Pages/Inbound/Suppliers/Returns/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers/returns/create",
		name: "inbound.suppliers.returns.index.create",
		component: () => import("@/views/Pages/Inbound/Suppliers/Returns/Create.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers/returns/:id",
		name: "inbound.suppliers.returns.index.show",
		component: () => import("@/views/Pages/Inbound/Suppliers/Returns/Show.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers/returns/:id/edit",
		name: "inbound.suppliers.returns.index.edit",
		component: () => import("@/views/Pages/Inbound/Suppliers/Returns/Edit.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/suppliers/:id",
		name: "inbound.suppliers.show",
		component: () => import("@/views/Pages/Inbound/Suppliers/Show.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/deals",
		name: "inbound.deals.index",
		component: () => import("@/views/Pages/Inbound/Deals/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/inbound/delivered_orders",
		name: "inbound.orders.delivered",
		component: () => import("@/views/Pages/Inbound/Orders/DeliveredOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	/** inbound routes end here */

	/** outbound routes begin here */
	{
		path: "/outbound/dashboard",
		name: "outbound.dashboard",
		component: () => import("@/views/Pages/Outbound/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/outbound/orders",
		name: "outbound.orders",
		component: () => import("@/views/Pages/Outbound/AllOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/outbound/orders/:id/edit",
		name: "outbound.orders.edit",
		component: () => import("@/views/Pages/Outbound/EditOrder.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/outbound/delivered",
		name: "outbound.delivered",
		component: () => import("@/views/Pages/Outbound/DeliveredOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/outbound/log-book",
		name: "outbound.log-book",
		component: () => import("@/views/Pages/Outbound/LogBook.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	        {
            path: "/outbound/log-book/:id/edit",
            name: "outbound.log-book.edit",
            component: () => import("@/views/Pages/Outbound/LogBookEdit.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/order-fulfillment",
            name: "outbound.order-fulfillment",
            component: () => import("@/views/Pages/Outbound/OrderFulfillment.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/picking-list/:id",
            name: "outbound.picking-list",
            component: () => import("@/views/Pages/Outbound/PickingList.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/stock-count",
            name: "outbound.stock-count",
            component: () => import("@/views/Pages/Outbound/StockCount.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/stock-count/teams",
            name: "outbound.stock-count.teams",
            component: () => import("@/views/Pages/Outbound/StockCountTeams.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/stock-count/product",
            name: "outbound.stock-count.product",
            component: () => import("@/views/Pages/Outbound/ProductStockCount.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/hmo-products",
            name: "outbound.hmo-products",
            component: () => import("@/views/Pages/Outbound/AllHmoProducts.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/hmo-products/damaged",
            name: "outbound.hmo-products.damaged",
            component: () => import("@/views/Pages/Outbound/DamagedHmoProducts.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/hmo-products/returns",
            name: "outbound.hmo-products.returns",
            component: () => import("@/views/Pages/Outbound/HmoProductReturns.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/outbound/rh-orders",
            name: "outbound.rh-orders",
            component: () => import("@/views/Pages/Outbound/RhOrders.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
	/** outbound routes end here */

	/** compliance routes begin here */
	{
		path: "/compliance/dashboard",
		name: "compliance.dashboard",
		component: () => import("@/views/Pages/Compliance/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products",
		name: "compliance.products",
		component: () => import("@/views/Pages/Compliance/Products/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products/view-changes/:productName",
		name: "compliance.products.view-changes",
		component: () => import("@/views/Pages/Compliance/Products/ViewChanges.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products/damaged",
		name: "compliance.products.damaged",
		component: () => import("@/views/Pages/Compliance/Products/Damaged.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products/quarantined",
		name: "compliance.products.quarantined",
		component: () => import("@/views/Pages/Compliance/Products/Quarantined.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/kyc",
		name: "compliance.kyc",
		component: () => import("@/views/Pages/Compliance/KYC.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/orders",
		name: "compliance.orders",
		component: () => import("@/views/Pages/Compliance/Orders/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/orders/delivered",
		name: "compliance.orders.delivered",
		component: () => import("@/views/Pages/Compliance/Orders/Delivered.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/orders/issues",
		name: "compliance.orders.issues",
		component: () => import("@/views/Pages/Compliance/Orders/Issues.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/deals",
		name: "compliance.deals",
		component: () => import("@/views/Pages/Compliance/Programs/Deals.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/programs/deals/:id/analytics",
		name: "compliance.deals.analytics",
		component: () => import("@/views/Pages/Compliance/Programs/DealAnalytics.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/loans",
		name: "compliance.loans",
		component: () => import("@/views/Pages/Compliance/Programs/Loans.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/loyalty",
		name: "compliance.loyalty",
		component: () => import("@/views/Pages/Compliance/Programs/Loyalty.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/reports/expiry",
		name: "compliance.reports.expiry",
		component: () => import("@/views/Pages/Compliance/Reports/Expiry.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/reports/stock",
		name: "compliance.reports.stock",
		component: () => import("@/views/Pages/Compliance/Reports/Stock.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/customers",
		name: "compliance.customers",
		component: () => import("@/views/Pages/Compliance/Customers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products/returned",
		name: "compliance.products.returned",
		component: () => import("@/views/Pages/Compliance/Products/Returned.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/compliance/products/pending-returns",
		name: "compliance.products.pending-returns",
		component: () => import("@/views/Pages/Compliance/Products/PendingReturns.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	/** compliance routes end here */

	/** logistics routes begin here */
	{
		path: "/logistics/dashboard",
		name: "logistics.dashboard",
		component: () => import("@/views/Pages/Logistics/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/orders",
		name: "logistics.orders",
		component: () => import("@/views/Pages/Logistics/Orders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/delivered-orders",
		name: "logistics.delivered-orders",
		component: () => import("@/views/Pages/Logistics/DeliveredOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/log-book",
		name: "logistics.log-book",
		component: () => import("@/views/Pages/Logistics/LogBook.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/log-book/:id/edit",
		name: "logistics.log-book.edit",
		component: () => import("@/views/Pages/Logistics/LogBookEdit.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/hub-management/hubs",
		name: "logistics.hub-management.hubs",
		component: () => import("@/views/Pages/Logistics/HubManagement/Hubs.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/hub-management/hub-staff",
		name: "logistics.hub-management.hub-staff",
		component: () => import("@/views/Pages/Logistics/HubManagement/HubStaff.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/vehicles",
		name: "logistics.vehicles",
		component: () => import("@/views/Pages/Logistics/Vehicles.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/drivers",
		name: "logistics.drivers",
		component: () => import("@/views/Pages/Logistics/Drivers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/delivery-types",
		name: "logistics.delivery-types",
		component: () => import("@/views/Pages/Logistics/DeliveryTypes.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/logistics/rh-orders",
		name: "logistics.rh-orders",
		component: () => import("@/views/Pages/Logistics/RHOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	/** logistics routes end here */

	{
		path: "/admin/products",
		name: "admin.products",
		component: () => import("@/views/Pages/Products/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/damages",
		name: "admin.products.damages",
		component: () => import("@/views/Pages/Products/Damages/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/bulk_updates",
		name: "admin.products.bulk_updates",
		component: () => import("@/views/Pages/Products/BulkUpdate.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/requests",
		name: "admin.products.requests",
		component: () => import("@/views/Pages/Products/Requests/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/returns",
		name: "admin.products.returns",
		component: () => import("@/views/Pages/Products/Returns/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/returned",
		name: "admin.products.returned",
		component: () => import("@/views/Pages/Products/Returns/Returned.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/pending_notifications",
		name: "admin.products.pending_notifications",
		component: () => import("@/views/Pages/Products/Notification/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/pending_transfers",
		name: "admin.products.pending_transfers",
		component: () => import("@/views/Pages/Products/Transfers/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/expiry/report",
		name: "admin.products.expiry_reports",
		component: () => import("@/views/Pages/Products/Expiry/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/locations/warehouses",
		name: "admin.locations.warehouses",
		component: () => import("@/views/Pages/Warehouses/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/locations/shelves",
		name: "admin.locations.shelves",
		component: () => import("@/views/Pages/Shelves/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/locations/branches",
		name: "admin.locations.branches",
		component: () => import("@/views/Pages/Branches/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/product_types",
		name: "admin.products.product_types",
		component: () => import("@/views/Pages/Products/Formulations/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/manufacturers",
		name: "admin.manufacturers",
		component: () => import("@/views/Pages/Manufacturers/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/batches/:id/history",
		name: "products.batches.history",
		component: () =>
			import("@/views/Pages/Products/BatchHistory.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/:id",
		name: "admin.products.show",
		component: () => import("@/views/Pages/Products/Show.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/products/:id/changes",
		name: "admin.products.changes",
		component: () => import("@/views/Pages/Products/ProductChanges.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/admin/categories",
		name: "admin.categories",
		component: () => import("@/views/Pages/Categories/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/procurements/suppliers",
		name: "procurements.suppliers.index",
		component: import('@/views/Pages/procurement/suppliers/index.vue'),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/procurements/suppliers/:id",
		name: "procurements.suppliers.show",
		component: import('@/views/Pages/procurement/suppliers/Show.vue'),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/suppliers-return",
		name: "suppliers-return",
		component: SuppliersReturn,
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/suppliers-return/:id",
		name: "supplier-return-details",
		component: SupplierReturnDetails,
		meta: { layout: "default", requiresAuth: true },
	},

	// Customer Success routes
	{
		path: "/customer-success",
		name: "customer-success",
		component: () => import("@/views/Pages/Customer Success/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/customers",
		name: "customer-success.customers",
		component: () => import("@/views/Pages/Customer Success/AllCustomers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/customers/:id",
		name: "customer-success.customers.view",
		component: () =>
			import("@/views/Pages/Customer Success/Customers/[id]/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// Customer Support routes
	{
		path: "/customer-success/support/tickets",
		name: "customer-success.support.tickets",
		component: () => import("@/views/Pages/Customer Success/Support/Tickets.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/support/chat",
		name: "customer-success.support.chat",
		component: () => import("@/views/Pages/Customer Success/Support/Chat.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/support/feedback",
		name: "customer-success.support.feedback",
		component: () => import("@/views/Pages/Customer Success/Support/Feedback.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// Customer Analytics routes
	{
		path: "/customer-success/analytics/satisfaction",
		name: "customer-success.analytics.satisfaction",
		component: () => import("@/views/Pages/Customer Success/Analytics/Satisfaction.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/analytics/retention",
		name: "customer-success.analytics.retention",
		component: () => import("@/views/Pages/Customer Success/Analytics/Retention.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/analytics/performance",
		name: "customer-success.analytics.performance",
		component: () => import("@/views/Pages/Customer Success/Analytics/Performance.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// Customer Programs routes
	{
		path: "/customer-success/programs/loyalty",
		name: "customer-success.programs.loyalty",
		component: () => import("@/views/Pages/Customer Success/Programs/Loyalty.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/programs/referral",
		name: "customer-success.programs.referral",
		component: () => import("@/views/Pages/Customer Success/Programs/Referral.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/programs/rewards",
		name: "customer-success.programs.rewards",
		component: () => import("@/views/Pages/Customer Success/Programs/Rewards.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// Customer Reports routes
	{
		path: "/customer-success/reports/customers",
		name: "customer-success.reports.customers",
		component: () => import("@/views/Pages/Customer Success/Reports/Customers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/reports/support",
		name: "customer-success.reports.support",
		component: () => import("@/views/Pages/Customer Success/Reports/Support.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/reports/satisfaction",
		name: "customer-success.reports.satisfaction",
		component: () => import("@/views/Pages/Customer Success/Reports/Satisfaction.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// Additional Customer Success routes
	{
		path: "/customer-success/kyc",
		name: "customer-success.kyc",
		component: () => import("@/views/Pages/Customer Success/KYC.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/customers/profiles",
		name: "customer-success.customers.profiles",
		component: () => import("@/views/Pages/Customer Success/Customers/Profiles.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/customers/segments",
		name: "customer-success.customers.segments",
		component: () => import("@/views/Pages/Customer Success/Customers/Segments.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
        {
            path: "/customer-success/customers/stores",
            name: "customer-success.customers.stores",
            component: () => import("@/views/Pages/Customer Success/Customers/Stores.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
        {
            path: "/customer-success/customers/feedback",
            name: "customer-success.customers.feedback",
            component: () => import("@/views/Pages/Customer Success/Customers/Feedback.vue"),
            meta: { layout: "default", requiresAuth: true },
        },
	{
		path: "/customer-success/orders",
		name: "customer-success.orders",
		component: () => import("@/views/Pages/Customer Success/Orders/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/delivered",
		name: "customer-success.orders.delivered",
		component: () => import("@/views/Pages/Customer Success/Orders/Delivered.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/held",
		name: "customer-success.orders.held",
		component: () => import("@/views/Pages/Customer Success/Orders/Held.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/inventory-issues",
		name: "customer-success.orders.inventory-issues",
		component: () => import("@/views/Pages/Customer Success/Orders/InventoryIssues.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/support-issues",
		name: "customer-success.orders.support-issues",
		component: () => import("@/views/Pages/Customer Success/Orders/SupportIssues.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/pending-payment",
		name: "customer-success.orders.pending-payment",
		component: () => import("@/views/Pages/Customer Success/Orders/PendingPayment.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/business-programs/deals",
		name: "customer-success.business-programs.deals",
		component: () => import("@/views/Pages/Customer Success/Business Programs/Deals.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/business-programs/deals/:id/analytics",
		name: "customer-success.business-programs.deals.analytics",
		component: () => import("@/views/Pages/Customer Success/Business Programs/DealAnalytics.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/business-programs/loyalty",
		name: "customer-success.business-programs.loyalty",
		component: () => import("@/views/Pages/Customer Success/Business Programs/Loyalty.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/all-hmos",
		name: "customer-success.hmo.all-hmos",
		component: () => import("@/views/Pages/Customer Success/HMO/AllHmos.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/products",
		name: "customer-success.hmo.products",
		component: () => import("@/views/Pages/Customer Success/HMO/AllHmoProducts.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/products/:id",
		name: "customer-success.hmo.view-hmo-product",
		component: () => import("@/views/Pages/Customer Success/HMO/ViewHmoProduct.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/products/damaged",
		name: "customer-success.hmo.products.damaged",
		component: () => import("@/views/Pages/Customer Success/HMO/DamagedHmoProducts.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/products/returns",
		name: "customer-success.hmo.products.returns",
		component: () => import("@/views/Pages/Customer Success/HMO/HmoProductReturns.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
        {
          path: "/customer-success/hmo/pharmacies",
          name: "customer-success.hmo.pharmacies",
          component: () => import("@/views/Pages/Customer Success/HMO/Pharmacies.vue"),
          meta: { layout: "default", requiresAuth: true },
        },
        {
          path: "/customer-success/hmo/pharmacy-orders",
          name: "customer-success.hmo.pharmacy-orders",
          component: () => import("@/views/Pages/Customer Success/HMO/PharmacyOrders.vue"),
          meta: { layout: "default", requiresAuth: true },
        },
        {
          path: "/customer-success/hmo/pharmacies-owed",
          name: "customer-success.hmo.pharmacies-owed",
          component: () => import("@/views/Pages/Customer Success/HMO/PharmaciesOwed.vue"),
          meta: { layout: "default", requiresAuth: true },
        },
        {
          path: "/customer-success/hmo/loans",
          name: "customer-success.hmo.loans",
          component: () => import("@/views/Pages/Customer Success/HMO/Loans.vue"),
          meta: { layout: "default", requiresAuth: true },
        },
        {
          path: "/customer-success/hmo/orders",
          name: "customer-success.hmo.orders",
          component: () => import("@/views/Pages/Customer Success/HMO/RhOrders.vue"),
          meta: { layout: "default", requiresAuth: true },
        },
	{
		path: "/customer-success/orders/tracking",
		name: "customer-success.orders.tracking",
		component: () => import("@/views/Pages/Customer Success/Orders/Tracking.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/orders/fulfilment",
		name: "customer-success.orders.fulfilment",
		component: () => import("@/views/Pages/Customer Success/Orders/Fulfilment.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/hmo/claims",
		name: "customer-success.hmo.claims",
		component: () => import("@/views/Pages/Customer Success/HMO/Claims.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/marketplace/partners",
		name: "customer-success.marketplace.partners",
		component: () => import("@/views/Pages/Customer Success/Marketplace/Partners.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/marketplace/orders",
		name: "customer-success.marketplace.orders",
		component: () => import("@/views/Pages/Customer Success/Marketplace/Orders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/marketplace/profits",
		name: "customer-success.marketplace.profits",
		component: () => import("@/views/Pages/Customer Success/Marketplace/Profits.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/marketplace/returns",
		name: "customer-success.marketplace.returns",
		component: () => import("@/views/Pages/Customer Success/Marketplace/Returns.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	// More Actions routes
	{
		path: "/customer-success/more-actions/agent-performance",
		name: "customer-success.more-actions.agent-performance",
		component: () => import("@/views/Pages/Customer Success/MoreActions/AgentPerformance.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/line-managers",
		name: "customer-success.more-actions.line-managers",
		component: () => import("@/views/Pages/Customer Success/MoreActions/LineManagers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/line-managers/:name",
		name: "customer-success.more-actions.view-line-manager",
		component: () => import("@/views/Pages/Customer Success/MoreActions/ViewLineManager.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/agents",
		name: "customer-success.more-actions.agents",
		component: () => import("@/views/Pages/Customer Success/MoreActions/Agents.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/drivers",
		name: "customer-success.more-actions.drivers",
		component: () => import("@/views/Pages/Customer Success/MoreActions/Drivers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/products",
		name: "customer-success.more-actions.products",
		component: () => import("@/views/Pages/Customer Success/MoreActions/Products.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/more-actions/products/:id",
		name: "customer-success.more-actions.view-product",
		component: () => import("@/views/Pages/Customer Success/MoreActions/ViewProduct.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/reports",
		name: "customer-success.reports",
		component: () => import("@/views/Pages/Customer Success/Reports/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	// Sales Module Routes
	{
		path: "/sales",
		name: "sales.dashboard",
		component: () => import("@/views/Pages/Sales/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/line-managers",
		name: "sales.line-managers",
		component: () => import("@/views/Pages/Sales/LineManagers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/agents",
		name: "sales.agents",
		component: () => import("@/views/Pages/Sales/Agents.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/leads",
		name: "sales.leads",
		component: () => import("@/views/Pages/Sales/Leads.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/opportunities",
		name: "sales.opportunities",
		component: () => import("@/views/Pages/Sales/Opportunities.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/pipeline",
		name: "sales.pipeline",
		component: () => import("@/views/Pages/Sales/Pipeline.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/sales/reports",
		name: "sales.reports",
		component: () => import("@/views/Pages/Sales/Reports.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	// Marketing Module Routes
	{
		path: "/marketing",
		name: "marketing.dashboard",
		component: () => import("@/views/Pages/Marketing/Ads.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/ads",
		name: "marketing.ads",
		component: () => import("@/views/Pages/Marketing/Ads.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/campaigns",
		name: "marketing.campaigns",
		component: () => import("@/views/Pages/Marketing/Campaigns.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/leads",
		name: "marketing.leads",
		component: () => import("@/views/Pages/Marketing/Leads.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/analytics",
		name: "marketing.analytics",
		component: () => import("@/views/Pages/Marketing/Analytics.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/content",
		name: "marketing.content",
		component: () => import("@/views/Pages/Marketing/Content.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/marketing/all-customers",
		name: "marketing.all-customers",
		component: () => import("@/views/Pages/Marketing/AllCustomers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	// Tech and Business Development Module Routes
	{
		path: "/tech-business-dev",
		name: "tech-business-dev.dashboard",
		component: () => import("@/views/Pages/Tech Business Dev/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/projects",
		name: "tech-business-dev.projects",
		component: () => import("@/views/Pages/Tech Business Dev/Projects.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/support",
		name: "tech-business-dev.support",
		component: () => import("@/views/Pages/Tech Business Dev/Support.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/analysis",
		name: "tech-business-dev.analysis",
		component: () => import("@/views/Pages/Tech Business Dev/Analysis.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/innovation",
		name: "tech-business-dev.innovation",
		component: () => import("@/views/Pages/Tech Business Dev/Innovation.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/all-hmos",
		name: "tech-business-dev.all-hmos",
		component: () => import("@/views/Pages/Tech Business Dev/AllHmos.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/hmo-product-returns",
		name: "tech-business-dev.hmo-product-returns",
		component: () => import("@/views/Pages/Tech Business Dev/HmoProductReturns.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/pharmacies",
		name: "tech-business-dev.pharmacies",
		component: () => import("@/views/Pages/Tech Business Dev/Pharmacies.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/loans",
		name: "tech-business-dev.loans",
		component: () => import("@/views/Pages/Tech Business Dev/Loans.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/orders-fulfilment/pharmacy-orders",
		name: "tech-business-dev.orders-fulfilment.pharmacy-orders",
		component: () => import("@/views/Pages/Tech Business Dev/PharmacyOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/orders-fulfilment/rh-orders",
		name: "tech-business-dev.orders-fulfilment.rh-orders",
		component: () => import("@/views/Pages/Tech Business Dev/RhOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/products-management/all-hmo-products",
		name: "tech-business-dev.products-management.all-hmo-products",
		component: () => import("@/views/Pages/Tech Business Dev/AllHmoProducts.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/products-management/damaged-hmo-products",
		name: "tech-business-dev.products-management.damaged-hmo-products",
		component: () => import("@/views/Pages/Tech Business Dev/DamagedHmoProducts.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/products-management/all-hmo-products/:id",
		name: "tech-business-dev.products-management.view-hmo-product",
		component: () => import("@/views/Pages/Tech Business Dev/ViewHmoProduct.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech-business-dev/customers-owed",
		name: "tech-business-dev.customers-owed",
		component: () => import("@/views/Pages/Tech Business Dev/CustomersOwed.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	// Tech Module Routes
	{
		path: "/tech",
		name: "tech.dashboard",
		component: () => import("@/views/Pages/Tech/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/integrations",
		name: "tech.integrations",
		component: () => import("@/views/Pages/Tech/Integrations.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/activity-log",
		name: "tech.activity-log",
		component: () => import("@/views/Pages/Tech/ActivityLog.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/settings",
		name: "tech.settings",
		component: () => import("@/views/Pages/Tech/Settings.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/role-management/admins",
		name: "tech.role-management.admins",
		component: () => import("@/views/Pages/Tech/Role Management/Admins.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/role-management/roles",
		name: "tech.role-management.roles",
		component: () => import("@/views/Pages/Tech/Role Management/Roles.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/role-management/permissions",
		name: "tech.role-management.permissions",
		component: () => import("@/views/Pages/Tech/Role Management/Permissions.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/requested-features",
		name: "tech.requested-features",
		component: () => import("@/views/Pages/Tech/RequestedFeatures.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/requested-features/:id",
		name: "tech.requested-features.view",
		component: () => import("@/views/Pages/Tech/ViewRequestedFeature.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/tech/pos",
		name: "tech.pos",
		component: () => import("@/views/Pages/Tech/POS.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	// Accounting Module Routes
	{
		path: "/accounting",
		name: "accounting.dashboard",
		component: () => import("@/views/Pages/Accounting/Dashboard.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/orders",
		name: "accounting.orders",
		component: () => import("@/views/Pages/Accounting/Orders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/delivered-orders",
		name: "accounting.delivered-orders",
		component: () => import("@/views/Pages/Accounting/DeliveredOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/held-orders",
		name: "accounting.held-orders",
		component: () => import("@/views/Pages/Accounting/HeldOrders.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/orders-pending-payment",
		name: "accounting.orders-pending-payment",
		component: () => import("@/views/Pages/Accounting/OrdersPendingPayment.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/all-customers",
		name: "accounting.all-customers",
		component: () => import("@/views/Pages/Accounting/AllCustomers.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/business-programs/loans",
		name: "accounting.business-programs.loans",
		component: () => import("@/views/Pages/Accounting/Loans.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/business-programs/loan-interests",
		name: "accounting.business-programs.loan-interests",
		component: () => import("@/views/Pages/Accounting/LoanInterests.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/business-programs/admin-loans",
		name: "accounting.business-programs.admin-loans",
		component: () => import("@/views/Pages/Accounting/AdminLoans.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/accounting/confirmed-order-logs",
		name: "accounting.confirmed-order-logs",
		component: () => import("@/views/Pages/Accounting/ConfirmedOrderLogs.vue"),
		meta: { layout: "default", requiresAuth: true },
	},

	//
	// {
	// 	path: "/purchase/approved",
	// 	name: "approved-po",
	// 	component: ApprovedPo,
	// 	meta: { layout: "default", requiresAuth: true },
	// },
	// {
	// 	path: "/purchase/awaiting",
	// 	name: "awaiting-po",
	// 	component: AwaitingPo,
	// 	meta: { layout: "default", requiresAuth: true },
	// },
];

export default routes;
