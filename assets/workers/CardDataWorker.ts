onmessage = async function (e){
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
}