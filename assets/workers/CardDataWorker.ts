onmessage = async function (e){
    console.log(`Worker: Message received from main script at ${Date.now() - e.data[3]}ms`)
    const [doc, docId, userId] = e.data


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