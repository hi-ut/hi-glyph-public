import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { prisma } from "@/lib/db/prisma";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";

function RegisterPage() {
  async function register(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repassword = formData.get("repassword") as string;
    if (email){
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return;
      }
    }
    if (password !== repassword) {
      return;
    }

    const hashedPwd = await hash(password as string, 10);

    const newUser = await prisma.user.create({
      data: {
        name: email,
        email: email,
        password: hashedPwd,
        role : "USER",
        createdAt: new Date(),
      },
    });

    revalidatePath("/api/auth/signin");

    // TODO: move to client side
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardBody>
          <form action={register} className="flex flex-col gap-4">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="input your Email"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="input your Password"
            />
            <Input
              type="password"
              name="repassword"
              label="Re-password"
              placeholder="input your password again"
            />
            <Button color="primary" type="submit">
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default RegisterPage;
