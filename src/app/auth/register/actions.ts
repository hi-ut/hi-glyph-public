"use server";

import { prisma } from "@/lib/db/prisma";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export async function createUser(userData:FormData) {
  const email = userData.get('email') as string;
  const name = userData.get('name') as string;
  const password = userData.get('password') as string;
  const passwordConfirm = userData.get('re-password') as string;

  if(!email || !name || !password || !passwordConfirm) return null;
  if(password !== passwordConfirm) return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) return null;

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password:hashedPassword,
    },
    select:{
      email:true,
      name:true,
      role:true,
    }
  });

  redirect("/auth/login")
}