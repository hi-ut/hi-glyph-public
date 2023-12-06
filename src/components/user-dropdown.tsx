"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface Props {
  username: string;
}

function UserDropdown({ username }: Props) {
  const router = useRouter();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar name={username} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {/* <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem> */}
        <DropdownItem
          key="profile"
          onClick={() => router.push("/user/profile")}
        >
          プロフィール
        </DropdownItem>
        {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          ログアウト
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserDropdown;
