import { Litematic } from '@kleppe/litematic-reader'


export default async function countBuild(file: any) {
	let reader = new FileReader()
	let BlockPaletteWithCount : any

	reader.addEventListener('loadend', async (e) => {
		const arrayBuffer = e.target?.result as ArrayBuffer
		let litematic = new Litematic(arrayBuffer)
		let BlockCount = await litematic.getBlockPaletteWithCount()
		return BlockCount
	})

	reader.readAsArrayBuffer(file)

	return BlockPaletteWithCount
}