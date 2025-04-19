import { env } from "./config";

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
  authLogin: "auth/login",
  authLogout: "auth/logout",
  authRefreshToken: "Auth/refresh-token",
  admin: "users",
  customer: "Customer",
  promotion: "Promotion",
  review: "Review",
  scheduleBooking: "scheduleBooking",
  country: "Country",
  city: "City",
  state: "State",
  merchant: "Merchant",
  driver: "Driver",
  vehicle: "Vehicle",
  vehicleType: "VehicleType",
  wallet: "Wallet",
  order: "Order",
  topupTransaction: "TopUpTransaction",
  reason: "Reason",
  paymentChannel: "PaymentChannel",
  sms: "Sms",
  simulation: "Simulation",
  sos: "Sos",
  travelRate: "TravelRate",
  kiloAmount: "KiloAmount",
  login: "auth/login",
  image: `${baseURL}/storage/images`,
  status: "status",
  refreshToken: "refresh-token",
  extraDemand: "ExtraDemand",
};
