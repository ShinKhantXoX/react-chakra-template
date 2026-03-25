import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useAppAbility } from "./AppAbilityProvider";
import type { PermissionName } from "./permissions";

type Props = {
  permission: PermissionName;
  children: ReactNode;
};

/**
 * Redirects to dashboard when the user cannot execute the permission.
 */
export function RequirePermission({ permission, children }: Props) {
  const ability = useAppAbility();
  if (!ability.can("execute", permission)) {
    return <Navigate to={paths.dashboard} replace />;
  }
  return children;
}
