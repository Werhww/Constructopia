import { Litematic } from '@kleppe/litematic-reader'

export default async function countBuild(file: any) {
	let reader = new FileReader()
	let BlockPaletteWithCount: any

	reader.readAsArrayBuffer(file)
	
	return new Promise((resolve, reject) => {
		reader.addEventListener('loadend', async (e) => {
			const arrayBuffer = e.target?.result
			let litematic = new Litematic(arrayBuffer as ArrayBuffer)
			BlockPaletteWithCount = await litematic.getBlockPaletteWithCount()
			resolve(BlockPaletteWithCount)
		})
		reader.addEventListener('error', () => {
			reject()
		})
	})
}