import { AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteButton from "./_components/delete-button";
import CreateSubAccountButton from "./_components/create-subaccount-button";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const AllSubaccountsPage = async ({ params }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { agencyId } = await params;
  const user = await getAuthUserDetails();

  if (!user) return null;

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <CreateSubAccountButton
          user={user}
          className="w-[200px] self-end m-6"
        />
        <Command className="rounded-lg bg-transparent">
          <CommandInput placeholder="Search Accounts..." />
          <CommandList>
            {!!user.Agency?.SubAccount.length && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            <CommandGroup heading="Sub Accounts">
              {!!user.Agency?.SubAccount.length ? (
                user.Agency.SubAccount.map((subacc: SubAccount) => (
                  <CommandItem
                    key={subacc.id}
                    className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
                  >
                    <Link
                      href={`/subaccount/${subacc.id}`}
                      className="flex gap-4 w-full h-full"
                    >
                      <div className="relative w-32">
                        <Image
                          src={subacc.subAccountLogo}
                          alt="Subaccount logo"
                          fill
                          className="object-contain rounded-md object-contain bg-muted/50 p-4"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subacc.name}
                          <span className="text-muted-foreground text-xs">
                            {subacc.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button
                        size={"sm"}
                        variant={"destructive"}
                        className="text-red-600 w-20 hover:bg-red-600 hover:text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are you absolutely sure
                        </AlertDialogTitle>
                        <AlertDescription className="text-left">
                          This action cannot be undone. This will delete the
                          subaccount and all data related to it
                        </AlertDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive hover:bg-destructive">
                          <DeleteButton subaccountId={subacc.id} />
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="text-muted-foreground text-center p-4">
                  No Sub Accounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubaccountsPage;
