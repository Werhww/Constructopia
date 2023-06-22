import { Litematic } from '@kleppe/litematic-reader'

export default async function countBlocks(file: any) {
	let reader = new FileReader()

	reader.readAsArrayBuffer(file)
	
	return new Promise((resolve, reject) => {
		reader.addEventListener('loadend', async (e) => {
			const arrayBuffer = e.target?.result
			let litematic = new Litematic(arrayBuffer as ArrayBuffer)
			await litematic.read()
			resolve(litematic.litematic?.totalBlocks)
		})
		reader.addEventListener('error', (error) => {
			reject(error)
		})
	})
}