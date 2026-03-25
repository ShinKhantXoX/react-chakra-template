import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createContextualCan, useAbility } from "@casl/react";
import { getData } from "@/helpers/localStorage";
import { keys } from "@/constants/config";
import {
  abilityFromUser,
  guestAbility,
  type AppAbility,
  type UserWithRbac,
} from "./defineAbility";

const AbilityValueContext = createContext<AppAbility>(guestAbility());

type UpdateAbility = (user: UserWithRbac | null) => void;

const AbilityUpdateContext = createContext<UpdateAbility>(() => {});

function readAbilityFromStorage(): AppAbility {
  const user = getData(keys.USER) as UserWithRbac | null;
  return abilityFromUser(user);
}

export function AppAbilityProvider({ children }: { children: ReactNode }) {
  const [ability, setAbility] = useState<AppAbility>(readAbilityFromStorage);

  const setAbilityFromUser = useCallback((user: UserWithRbac | null) => {
    setAbility(abilityFromUser(user));
  }, []);

  return (
    <AbilityValueContext.Provider value={ability}>
      <AbilityUpdateContext.Provider value={setAbilityFromUser}>
        {children}
      </AbilityUpdateContext.Provider>
    </AbilityValueContext.Provider>
  );
}

export function useAppAbility(): AppAbility {
  return useAbility(AbilityValueContext);
}

export function useSetAbilityFromUser(): UpdateAbility {
  return useContext(AbilityUpdateContext);
}

export const Can = createContextualCan(AbilityValueContext.Consumer);
