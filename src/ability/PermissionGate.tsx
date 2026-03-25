import type { ReactNode } from "react";
import { useAppAbility } from "./AppAbilityProvider";
import type { PermissionName } from "./permissions";

type Props = {
  permission: PermissionName;
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Renders `children` only if the user may execute the given Spatie permission name.
 */
export function PermissionGate({
  permission,
  children,
  fallback = null,
}: Props) {
  const ability = useAppAbility();
  if (!ability.can("execute", permission)) {
    return fallback;
  }
  return children;
}
