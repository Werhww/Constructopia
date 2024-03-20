import type { FunctionNames, Functions } from "@/server/server"

export type ServerFunctionResult<T extends FunctionNames> = Awaited<ReturnType<Functions[T]>> | number
export type NoServerFunctionErrors<T> = T extends number ? never : T

export async function serverFunction<T extends FunctionNames>(operation: T, data: Parameters<Functions[T]>[0]): Promise<ServerFunctionResult<T>> {
    const returned = await fetch(`http://localhost:3000/api/function/${operation as string}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data)
    })

    if (!returned.ok) {
        return returned.status as ServerFunctionResult<T>
    }

    const returnedData = await returned?.json()
	
    return returnedData as ServerFunctionResult<T>
}

export function isServerError<T>(data: T | number): data is number {
    return typeof data === "number"
}