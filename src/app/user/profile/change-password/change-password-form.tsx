"use client";

import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { changePassword } from "./actions";

export default function ChangeUserPasswordForm({userEmail}:{userEmail?:string}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (!userEmail) {
    toast.error("UserEmail is required");
    return null;
  }

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await changePassword({
        userEmail,
        newPassword: data.newPassword,
      })
      toast.success("Password changed successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 md:gap-8"
    >
      <div>{userEmail}</div>
      {/* <Input type="password" label="Current Password" /> */}
      <Input
        type="password"
        label="New Password"
        id="newPassword"
        {...register("newPassword", { required: true })}
      />
      {errors.newPassword && (
        <span className="text-red-500">This field is required</span>
      )}
      <Input
        type="password"
        label="Confirm New Password"
        id="confirmNewPassword"
        {...register("confirmNewPassword", { required: true })}
      />
      {errors.confirmNewPassword && (
        <span className="text-red-500">This field is required</span>
      )}
      <Button type="submit" color="primary">
        Change Password
      </Button>
    </form>
  );
}
