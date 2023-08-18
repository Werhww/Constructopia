import { Litematic } from '@kleppe/litematic-reader'

export default async function countBuild(file: any): Promise<{
    [key: string]: {
        block: string;
        count: number;
    }
}>{
	let reader = new FileReader()

	reader.readAsArrayBuffer(file)
	
	return new Promise((resolve, reject) => {
		reader.addEventListener('loadend', async (e) => {
			const arrayBuffer = e.target?.result
			let litematic = new Litematic(arrayBuffer as ArrayBuffer)
			resolve(await litematic.getBlockPaletteWithCount())
		})
	})
}