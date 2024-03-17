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

type Days = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export function getDaysDate(dayName: Days ): Date{

	// The current day
	const date = new Date();
	const now = date.getDay();

	// Days of the week
	const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	// The index for the day you want
	const day = days.indexOf(dayName.toLowerCase());

	// Find the difference between the current day and the one you want
	// If it's the same day as today (or a negative number), jump to the next week
	let diff = day - now;
	diff = diff < 1 ? 7 + diff : diff;

	// Get the timestamp for the desired day
	const nextDayTimestamp = date.getTime() + (1000 * 60 * 60 * 24 * diff);

	// Get the next day
	return new Date(nextDayTimestamp);

};