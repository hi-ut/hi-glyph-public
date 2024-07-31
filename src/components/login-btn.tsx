"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

function LoginBtn() {
  return (
    <Button color="primary" variant="flat" onClick={() => signIn()}>
      Login
    </Button>
  );
}

export default LoginBtn;
