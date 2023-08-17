onmessage = async function (e){
    console.log(`Worker: Message received from main script at ${Date.now() - e.data[3]}ms`)
    const doc = e.data[0]
    const docId = e.data[1]
    const userId = e.data[2]

    const images = await getImages(docId)
    const favorite = await checkFavoriteState(userId, docId)

    postMessage({
        build: {
            buildId: docId,
            ...doc
        },
        images: images,
        favorite: favorite.state
    })
    console.log(`Worker: Posted message to main script at ${Date.now() - e.data[3]}ms`)
}