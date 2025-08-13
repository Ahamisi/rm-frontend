export interface TopListItem {
	name: string;
	value: number;
	percentage: number;
}

export interface Supplier extends TopListItem {
	// Additional supplier-specific properties can be added here
}

export interface Product extends TopListItem {
	// Additional product-specific properties can be added here
}

export interface MetricData {
	value: number | string;
	change: number;
	trend: "up" | "down" | "none";
}
// resources/vue3/types/index.ts
export interface Supplier {
	id: number;
	supplierName: string;
	email?: string;
	phone?: string;
	[key: string]: any;
}

export interface Option {
	id: number;
	name: string;
}

type BankDetails = {
	id: number;
	account_holder: string | null;
	account_number: string | null;
	bank_name: string | null;
	bank_code: string | null;
	created_at: string;
	updated_at: string;
	supplier_id: number;
};

type PSupplier = {
	id: number;
	name: string;
	bank_details: BankDetails;
};

export type Return = {
	id: number;
	supplierName: string;
	invoiceNo: string;
	date: string;
	total: string;
	adminName: string;
	avatar: string;
};

export type Payment = {
	id: number;
	reference: string;
	docNo: string;
	supplierName: string;
	amount: string;
	//   phone: string;
	//   category: string;
	//   status: string;
	date: string;
};

export interface Branch {
	id: number;
	name: string;
	address: string | null;
	has_barcode: boolean | number;
	created_at: string;
	updated_at: string;
	use_order_fulfilment: boolean | number;
}

export type PurchaseOrder = {
	id: number;
	order_no: string;
	discount: number;
	purchase_date: string;
	delivery_date: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	supplier_id: number;
	inventory_rhl_id: number | null;
	type: string; // "trade" | "service"
	branch_id: number;
	status: number; // Will be mapped using statusMap
	created_by: any | null;
	approved_by: any | null;
	assigned_to: any | null;
	is_invoiced: boolean;
	total_amount: number;
	download_url: string;
	delivery_date_form: string;
	purchase_date_form: string;
	invoice_status: string;
	supplier: PSupplier;
	assigned: any | null;
};

// 🔁 Status mapping (for UI display)
export const purchaseOrderStatusMap: Record<number, string> = {
	1: "Active",
	2: "Inactive",
};

// 🔁 Datatable Filter field
export interface FilterField {
	field: string,
	label: string,
	type: FilterType,
	options?: FilterFieldOption[],
	placeholder?: string,
}

// 🔁 Datatable Filter field option
export interface FilterFieldOption {
	id: number | string;
	name: string;
}

// 🔁 Datatable Filter type
export type FilterType = "text" | "number" | "date" | "select" | "multi-select" | "date-range";

// 🔁 Datatable Filter fields
export interface FilterFields<FilterField> {
	[key: string]: FilterField;
}

// 🔁 Datatable Column
export interface TableColumn {
	label: string;
	field: string;
	sortable?: boolean;
	format?: (value: any) => string;
}

// 🔁 Datatable Filter params
export interface FilterParams {
	[key: string]: string | number | string[] | number[] | null;
	from_date?: string;
	to_date?: string;
}

// 🔁 Datatable Sort params
export interface SortParams {
    field?: string;
	type: 'asc' | 'desc';
}

// 🔁 Datatable Server params
export interface ServerParams {
    filter?: FilterParams;
	sort?: SortParams;
	perPage?: number;
	searchTerm?: string;
	from_date?: string;
	to_date?: string;
}

export interface MenuItem {
	id: string;
	label: string | ((item: any) => string);
	icon?: any;
	iconSrc?: string;
	iconClass?: string;
	condition?: (item: any) => boolean;
	action: string;
}