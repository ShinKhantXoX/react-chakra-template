import { paginateOptions } from "@/constants/config";
import { z } from "zod";

export const userSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" }),
  last_name: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  profile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPEG and PNG files are allowed",
    )
    .optional()
    .nullable(),
  email: z.string().email(),
  gender: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  dob: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date({ required_error: "Date of Birth is required" }),
  ),
  about: z.string().optional(),
  user_type: z.string(),
  status: z.string(),
});

export type UserFormInputs = z.infer<typeof userSchema>;

/** Matches dashboard `users` API / `users` table (see Laravel migration). */
export interface USER {
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  phone_confirm_at: string | null;
  email_confirm_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  action?: unknown;
}

type UserColumnId = keyof USER;

export interface User_Column {
  id: UserColumnId;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right";
  numeric: boolean;
  disablePadding: boolean;
  format?: (value: number) => string;
  sortable: boolean;
}

export interface USER_PAYLOAD {
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

export const columns: readonly User_Column[] = [
  {
    id: "username",
    label: "Username",
    minWidth: 140,
    maxWidth: 220,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 180,
    maxWidth: 260,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 140,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sortable: false,
  },
  {
    id: "created_at",
    label: "Created",
    minWidth: 160,
    maxWidth: 200,
    numeric: false,
    disablePadding: false,
    sortable: true,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
    maxWidth: 100,
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

export const userPayload: USER_PAYLOAD = {
  pagingParams: {
    page: 1,
    rows: paginateOptions.rows,
    columns: "id,username,email,phone,status",
    search: "",
    order: "id",
    sort: "asc",
    filter: "",
    value: "",
    start_date: "",
    end_date: "",
  },
};

/** Normalized list payload for Redux (Laravel paginator or plain array). */
export type UserIndexPayload = {
  data: USER[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export const userQueryKeys = {
  index: "user-index",
  show: "user-show",
  store: "user-store",
  update: "user-update",
  delete: "user-delete",
  status: "user-status",
};
