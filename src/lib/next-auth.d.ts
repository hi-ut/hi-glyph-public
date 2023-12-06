import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name:string
    email:string
    role:PrismaUser["role"]
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: PrismaUser["role"];
  }
  interface Session {
    user: User & {
      id: string;
      role: PrismaUser["role"];
    }
  }
}
