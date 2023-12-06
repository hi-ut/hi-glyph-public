"use client";
import { User } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

type Props = {
  userData: User[];
};

export default function UserAdminTable({ userData }: Props) {
  if (!userData) return <div>Loading...</div>;
  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    // {
    //   key: "createdAt",
    //   label: "Created At",
    // },
    // {
    //   key: "updatedAt",
    //   label: "Updated At",
    // },
  ];

  return (
    <Table aria-label="User Admin Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={userData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
