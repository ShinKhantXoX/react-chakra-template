import {
  AbilityBuilder,
  createMongoAbility,
  type MongoAbility,
} from "@casl/ability";

/** Matches Laravel `App\Enums\RoleTypeEnum::SUPER_ADMIN` */
export const SUPER_ADMIN_ROLE = "SUPER_ADMIN";

export type AppAbility = MongoAbility;

export interface UserWithRbac {
  id?: string;
  email?: string | null;
  roles?: string[];
  permissions?: string[];
}

export function defineAbilityFromSpatie(input: {
  permissions: string[];
  roles: string[];
}): AppAbility {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  const roles = input.roles ?? [];
  const permissions = input.permissions ?? [];

  if (roles.includes(SUPER_ADMIN_ROLE)) {
    can("manage", "all");
  } else {
    for (const p of permissions) {
      can("execute", p);
    }
  }

  return build();
}

export function guestAbility(): AppAbility {
  const { build } = new AbilityBuilder(createMongoAbility);
  return build();
}

export function abilityFromUser(
  user: UserWithRbac | null | undefined,
): AppAbility {
  if (user && (Array.isArray(user.permissions) || Array.isArray(user.roles))) {
    return defineAbilityFromSpatie({
      permissions: user.permissions ?? [],
      roles: user.roles ?? [],
    });
  }
  return guestAbility();
}
