// export const env = [process.env.REACT_APP_BASE_URL];
export const env = ["http://127.0.0.1:8000/dashboard/v1"];

export const hadUrl = "https://localhost:7044/dashboard";

// export const env = ["http://4.145.97.143:81/api/v1"];
// export const hadUrl = "http://4.145.97.143:83/dashboard";

export const drawerWidth: number = 300;

export const keys = {
  API_TOKEN: "TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  USER: "USER",
  PERMISSION: "PERMISSION",
  ROLE: "ROLE",
  LANGUAGE: "LANGUAGE",
};

// export interface NotificationOptions {
//   variant: VariantType; // "success" | "error" | "warning" | "default" | "info"
//   msg: string;
//   show: false;
// }

// export const notificationOptions: NotificationOptions = {
//   variant: "info",
//   msg: "",
//   show: false,
// };

export interface HTTPResponse {
  status: number;
  statusText: string;
  data: any;
}

export interface HTTPErrorResponse {
  message: string;
  status: number;
  notification?: {
    show: boolean;
    msg: string;
    variant: string;
  };
  error?: any | null;
}

interface Paginate_Options {
  rows: number;
  rowsPerPageOptions: Array<number>;
  total: number;
}

export const paginateOptions: Paginate_Options = {
  rows: 10,
  rowsPerPageOptions: [10, 50, 100, 150, 500, 1000],
  total: 0,
  // paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
  // currentPageReportTemplate: "{first} to {last} of {totalRecords}",
  // paginatorLeft: paginatorLeft,
  // sortMode: "single",
  // resizableColumns: true,
  // lazy: true
};

export const statusOptions = [
  { id: 1, status: "Active", color: "success" },
  { id: 1, status: "Disable", color: "secondary" },
  { id: 1, status: "Deactivate", color: "secondary" },
  { id: 1, status: "Deleted", color: "error" },
  { id: 1, status: "Pending", color: "primary" },
  { id: 1, status: "BLOCK", color: "error" },
  { id: 1, status: "COMPLETE", color: "success" },
  { id: 3, status: "Male", color: "secondary" },
  { id: 1, status: "Female", color: "primary" },
  { id: 1, status: "Other", color: "error" },
];

export const genderStatuslists = [
  { id: 0, value: "Male", color: "success" },
  { id: 1, value: "Female", color: "secondary" },
  { id: 2, value: "Undefined", color: "primary" },
];

export const propertyStatusLists = [
  { id: 0, value: "CarOwner", color: "success" },
  { id: 1, value: "Rent", color: "success" },
];

export const otpStatusLists = [
  { id: 0, value: "Pending", color: "info" },
  { id: 1, value: "Success", color: "success" },
  { id: 2, value: "Expired", color: "secondary" },
];

export const otpTypeStatusLists = [
  { id: 0, value: "AccountOpen", color: "info" },
  { id: 1, value: "ResetPassword", color: "primary" },
  { id: 2, value: "AccountCancellation", color: "error" },
];

export const generalStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Disable", color: "secondary" },
  { id: 2, value: "Deleted", color: "error" },
];

export const paymentStatusLists = [
  { id: 0, value: "Wallet", color: "success" },
  { id: 1, value: "BankAccount", color: "secondary" },
  { id: 2, value: "MupCard", color: "info" },
  { id: 3, value: "VisaMaster", color: "primary" },
];

export const paymentTypeStatusLists = [
  { id: 0, value: "Cash", color: "success" },
  { id: 1, value: "BankTransfer", color: "success" },
  { id: 2, value: "OnlinePayment", color: "success" },
];

export const scheduleOrderStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Approved", color: "info" },
  { id: 2, value: "Cancel", color: "secondary" },
];

export const customerStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Active", color: "success" },
  { id: 2, value: "Deactivate", color: "warning" },
  { id: 3, value: "Suspended", color: "error" },
];

export const notiTypeStatusLists = [
  { id: 0, value: "System", color: "info" },
  { id: 1, value: "Alert", color: "warning" },
  { id: 2, value: "Promotion", color: "primary" },
  { id: 3, value: "Announcement", color: "success" },
  { id: 4, value: "Other", color: "secondary" },
];

export const smsStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Delivered", color: "primary" },
  { id: 2, value: "Fail", color: "error" },
];

export const walletTypeStatusLists = [
  { id: 0, value: "Customer", color: "primary" },
  { id: 1, value: "Driver", color: "info" },
  { id: 2, value: "VipCustomer", color: "success" },
];

export const kiloTypeLists = [
  { id: 0, value: "Normal", color: "primary" },
  { id: 1, value: "KiloPlus", color: "success" },
];
export const promotionTypeLists = [
  { id: 0, value: "AllCustomer", color: "success" },
  { id: 1, value: "SpecificCustomer", color: "success" },
];

export const promoStatusLists = [
  { id: 0, value: "Expired", color: "error" },
  { id: 1, value: "Used", color: "info" },
  { id: 2, value: "Active", color: "success" },
  { id: 3, value: "Reject", color: "error" },
];
export const applicableToLists = [
  { id: 0, value: "Customer", color: "success" },
  { id: 1, value: "Driver", color: "success" },
  { id: 2, value: "Both", color: "success" },
];

export const notiStatusLists = [
  { id: 0, value: "Delivered", color: "info" },
  { id: 1, value: "Read", cplor: "primary" },
  { id: 2, value: "Fail", color: "error" },
];

export const kycStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "FullKyc", color: "success" },
  { id: 2, value: "Reject", color: "error" },
];
export const driverModeLists = [
  { id: 0, value: "Available", color: "success" },
  { id: 1, value: "Offline", color: "danger" },
  { id: 2, value: "Engaged", color: "secondary" },
];
export const driverStatusLists = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Active", color: "success" },
  { id: 2, value: "Deactivate", color: "warning" },
  { id: 3, value: "Suspend", color: "error" },
  { id: 4, value: "Busy", color: "warning" },
  { id: 5, value: "Offline", color: "danger" },
  { id: 6, value: "Online", color: "success" },
];

export const vehicleStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Suspend", color: "error" },
];

export const walletStatusLists = [
  { id: 0, value: "Active", color: "success" },
  { id: 1, value: "Disable", color: "secondary" },
];

export const topUpTransactionStatus = [
  { id: 0, value: "Pending", color: "secondary" },
  { id: 1, value: "Success", color: "success" },
  { id: 2, value: "Reject", color: "error" },
];

export const orderStatusLists = [
  { id: 0, value: "Completed", color: "success" },
  { id: 1, value: "Cancelled", color: "error" },
  { id: 2, value: "InProgress", color: "info" },
];
