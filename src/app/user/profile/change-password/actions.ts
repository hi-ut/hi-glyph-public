"use server";

import { prisma } from "@/lib/db/prisma";
import { hash } from "bcrypt";

export async function changePassword({
  userEmail,
  newPassword,
}: {
  userEmail: string;
  newPassword: string;
}) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await hash(newPassword, 10);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        password: hashedPassword,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("password update failed");
  }
}
