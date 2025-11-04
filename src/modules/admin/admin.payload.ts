import { paginateOptions } from "@/constants/config";
import { z } from "zod";

export const adminSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" }),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  profile: z.any().nullable(),
  email: z.string().email(),
  gender: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    }) // Uppercase letter
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    }) // Lowercase letter
    .regex(/[0-9]/, { message: "Password must contain at least one number" }) // Number
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }), // Special character
  dob: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Date of Birth is required" })
  ),
  about: z.string().optional(),
  user_type: z.string(),

  status: z.string(),
  // emailVerifiedAt: z.date().nullable(),
  // phoneVerifiedAt: z.date().nullable()
});

export type AdminFormInputs = z.infer<typeof adminSchema>;

/**
 * Interface representing the shape of a country object.
 */
export interface ADMIN {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  emailVerifiedAt: Date;
  password: string;
  gender: number;
  dob: string;
  about: string;
  user_type: string;
  profile: string;
  status: number;
  action: any;
  // Add other country properties as necessary
}

type AdminColumnId = keyof ADMIN;

/**
 * Represents the structure of a column in the country table.
 */
export interface Admin_Column {
  /** Unique identifier for the column */
  id: AdminColumnId;
  /** Label to be displayed for the column */
  label: string;
  /** Minimum width of the column */
  minWidth?: number;
  /** Maximum width of the column */
  maxWidth?: number;
  /** Alignment of the column content */
  align?: "right";
  /** Specifies if the column data is numeric */
  numeric: boolean;
  /** Specifies if padding should be disabled for the column */
  disablePadding: boolean;
  /** Optional function to format the value in the column */
  format?: (value: number) => string;
  sortable: boolean;
}

/**
 * Payload structure for creating and updating a country,
 * as well as pagination parameters.
 */
export interface ADMIN_PAYLOAD {
  /** Parameters for paging and sorting */
  pagingParams: {
    page: number;
    rows: number;
    columns: string;
    search: string;
    order: string;
    sort: string;
    filter: string;
    value: string;
    start_date: string;
    end_date: string;
  };
}

/**
 * An array of columns for displaying the country table.
 */
export const columns: readonly Admin_Column[] = [
  {
    id: "first_name",
    label: "First Name",
    minWidth: 170,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "last_name",
    label: "Last Name",
    minWidth: 170,
    maxWidth: 300,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "dob",
    label: "Date of birth",
    minWidth: 200,
    maxWidth: 250,
    numeric: false,
    disablePadding: false,
    sortable: false,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    maxWidth: 150,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 20,
    maxWidth: 50,
    numeric: false,
    disablePadding: false,
    sortable: false,
  },
];
/**
 * Default payload object for country operations.
 */
export const adminPayload: ADMIN_PAYLOAD = {
  pagingParams: {
    page: 1,
    rows: paginateOptions.rows,
    columns: "id,first_name,last_name,email,status",
    search: "",
    order: "id",
    sort: "asc",
    filter: "",
    value: "",
    start_date: "",
    end_date: "",
  },
};
