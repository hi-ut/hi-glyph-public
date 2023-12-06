import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Code } from "@nextui-org/code";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        <Card>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">UserProfilePage</p>
              <p className="text-small text-default-500">ユーザ情報を表す</p>
            </div>
          </CardHeader>
          <CardBody>
            <p>Name: {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
            <p>Role: <Code>{session?.user.role}</Code></p>
            <div className="flex gap-4">
            <Button as={Link} href="/user/profile/change-password" color="primary" className="w-32">Change Password</Button>
            <Button as={Link} href="/user/profile/delete-user" color="danger" className="w-32" isDisabled>Delete User</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
