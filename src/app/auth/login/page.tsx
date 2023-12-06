"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { SVGProps, useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const ifHasGoogleApi =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? true
    : false;

const LogosGoogleIcon = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.98em"
      height="1em"
      viewBox="0 0 256 262"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      ></path>
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  );
};

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialLogin = async () => {
    setIsLoading(true);
    // TODO: callback url should be dynamic
    try {
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } catch (error) {
      // console.error(error);
      toast.error("認証に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("認証に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full py-12 px-6">
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col w-full max-w-md p-4 m-2 gap-4 border border-black rounded-md shadow-sm"
      >
        <Input
          name="email"
          type="email"
          variant="flat"
          label="Email"
          value={email}
          onValueChange={setEmail}
        />
        <Input
          name="password"
          type="password"
          variant="flat"
          label="Password"
          value={password}
          onValueChange={setPassword}
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          onClick={handleCredentialLogin}
        >
          Login
        </Button>

        {ifHasGoogleApi && (
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            onClick={handleGoogleLogin}
            startContent={<LogosGoogleIcon />}
          >
            Login with Google
          </Button>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
