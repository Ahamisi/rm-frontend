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
		component: () => import("@/views/Pages/Customer Success/Customers/Index.vue"),
		meta: { layout: "default", requiresAuth: true },
	},
	{
		path: "/customer-success/customers/:id",
		name: "customer-success.customers.view",
		component: () =>
			import("@/views/Pages/Customer Success/Customers/[id]/Index.vue"),
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
