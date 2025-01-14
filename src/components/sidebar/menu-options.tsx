"use client";
import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../global/custom-modal";
import SubAccountDetails from "../forms/subaccount-details";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt?: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  id: string;
};

const MenuOptions = ({
  details,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  const { setOpen } = useModal();

  const openState = useMemo(() => {
    return defaultOpen ? { open: true } : {};
  }, [defaultOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Sheet modal={false} {...openState} open>
      <SheetTrigger
        asChild
        className="absolute left-4 rop-4 z-[100] md:hidden flex"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] py-6 px-3",
          {
            "hidden md:inline-block z-0 w-[300px]": defaultOpen,
            "inline-block md:hidden z-100 w-full": !defaultOpen,
          }
        )}
      >
        <VisuallyHidden.Root asChild>
          <SheetTitle>Menu</SheetTitle>
        </VisuallyHidden.Root>
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between py-8"
                variant={"ghost"}
              >
                <div className="flex items-center text-left gap-2 w-full max-w-full">
                  <Compass />
                  <div className="flex flex-col truncate">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                  <div>
                    <ChevronsUpDown
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              {
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accounts..." />
                  <CommandList className="pb-16">
                    <CommandEmpty>No Results Found.</CommandEmpty>
                    {(user?.role === "AGENCY_OWNER" ||
                      user?.role === "AGENCY_ADMIN") &&
                      user?.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem
                            key={user?.Agency?.id}
                            className="!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all"
                          >
                            {defaultOpen ? (
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-60">
                                  <Image
                                    src={
                                      user?.Agency?.agencyLogo ||
                                      "/assets/logo.svg"
                                    }
                                    alt="Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/agency/${user?.Agency?.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-60">
                                    <Image
                                      src={
                                        user?.Agency?.agencyLogo ||
                                        "/assets/logo.svg"
                                      }
                                      alt="Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {user?.Agency?.name}
                                    <span className="text-muted-foreground">
                                      {user?.Agency?.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                    <CommandGroup heading="Accounts">
                      {!!Object.entries(subAccounts).length ? (
                        subAccounts.map((subaccount) => (
                          <CommandItem key={subaccount.id}>
                            {defaultOpen ? (
                              <Link
                                href={`/subaccount/${subaccount.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-60">
                                  <Image
                                    src={
                                      subaccount.subAccountLogo ||
                                      "/assets/logo.svg"
                                    }
                                    alt="Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-60">
                                    <Image
                                      src={
                                        subaccount.subAccountLogo ||
                                        "/assets/logo.svg"
                                      }
                                      alt="Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground text-center">
                          No Accounts Found
                        </p>
                      )}
                    </CommandGroup>
                  </CommandList>
                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") && (
                    <SheetClose
                      className="w-full flex items-center justify-center gap-2 bg-primary p-2 rounded-md"
                      onClick={() =>
                        setOpen(
                          <CustomModal
                            title="Create A Sub Account"
                            subheading="You can switch between your agency account and the subaccount from the sidebar."
                          >
                            <SubAccountDetails
                              agencyDetails={user?.Agency as Agency}
                              userId={user?.id as string}
                              userName={user?.name as string}
                            />
                          </CustomModal>
                        )
                      }
                    >
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </SheetClose>
                  )}
                </Command>
              }
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..." />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt?.map((opt) => {
                    let val;
                    const results = icons.find(
                      (icon) => icon.value === opt.icon
                    );
                    if (results) {
                      val = <results.path />;
                    }
                    return (
                      <CommandItem key={opt.id} className="md:w-[320px] w-full">
                        <Link
                          href={opt.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          {val}
                          <span>{opt.name}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
