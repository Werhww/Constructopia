import { createSHA1 } from "hash-wasm"

export default async function (file: Blob) {
  const hasher = await createSHA1()

  const hasherStream = new WritableStream<Uint8Array>({
    start: () => {
      hasher.init()
    },
    write: chunk => {
      hasher.update(chunk)
    },

    close: () => {},
  })

  await file.stream().pipeTo(hasherStream)

  return hasher.digest("hex")
}