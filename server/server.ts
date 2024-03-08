import { PrismaClient } from "@prisma/client"

import * as user_ from "./database/user"
import * as build_ from "./database/build"
import * as category_ from "./database/category"

export const prisma = new PrismaClient()

export const functions = { ...user_, ...build_, ...category_  }

export type Functions = typeof functions
export type FunctionNames = keyof Functions