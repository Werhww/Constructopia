import { PrismaClient } from "@prisma/client"

import * as user_ from "./database/user"

export const prisma = new PrismaClient()

export const functions = { ...user_  }

export type Functions = typeof functions
export type FunctionNames = keyof Functions