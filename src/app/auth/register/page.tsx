import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { createUser } from "./actions";

async function RegisterPage() {
  return (
    <div className="flex items-center justify-center w-full">
      <form
        method="post"
        action={createUser}
        className="flex flex-col w-full max-w-md p-4 m-2 gap-4 border border-black rounded-md shadow-sm"
      >
        <Input name="email" type="email" variant="flat" label="Email" />
        <Input name="name" type="text" variant="flat" label="Name" />
        <Input name="password" type="password" variant="flat" label="Password" />
        <Input name="re-password" type="password" variant="flat" label="Re-password" />
        <Button type="submit" color="primary">Register</Button>
      </form>
    </div>
  );
}

export default RegisterPage;
