import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user) return null;

  if (!user.Agency) return null;

  const details =
    type === "agency"
      ? user.Agency
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabelledAgency = user.Agency?.whiteLabel;

  if (!details) return null;

  let sidebarLogo = user.Agency.agencyLogo || "/assets/logo.svg";

  if (!isWhiteLabelledAgency) {
    if (type === "subaccount") {
      sidebarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sidebarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subAccounts = user.Agency.SubAccount.filter((subaccount) => {
    return user.Permissions.find(
      (perms) => perms.subAccountId === subaccount.id && perms.access
    );
  });

  return (
    <>
      <MenuOptions
        defaultOpen
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subAccounts}
        user={user}
      />
      <MenuOptions
        details={details}
        id={id}
        sidebarLogo={sidebarLogo}
        sidebarOpt={sidebarOpt}
        subAccounts={subAccounts}
        user={user}
      />
    </>
  );
};

export default Sidebar;
