import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { cookies } from "next/headers";


export interface UserSetting {
  id?: string;
  email?: string;
  family_name?: string;
  given_name?: string;
  picture: string;
  username?: string;
  phone_number?: string;
}

const UserSetting: React.FC<UserSetting> = ({ given_name, picture }) => {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {picture ? (
          <Avatar>
            <AvatarImage src={picture} />
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback>{given_name}</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/${locale}/profile`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LogoutLink>Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSetting;
