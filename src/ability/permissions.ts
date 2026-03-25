/**
 * Mirrors Laravel `App\Enums\PermissionEnum` (dashboard guard).
 * Keep in sync when backend adds permissions.
 */
export const Permission = {
  USER_INDEX: "USER_INDEX",
  USER_SHOW: "USER_SHOW",
  USER_STORE: "USER_STORE",
  USER_UPDATE: "USER_UPDATE",
  USER_DESTROY: "USER_DESTROY",
  USER_EXPORT: "USER_EXPORT",
  COUNTER_INDEX: "COUNTER_INDEX",
} as const;

export type PermissionName = (typeof Permission)[keyof typeof Permission];
