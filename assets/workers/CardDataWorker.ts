onmessage = async function (e){
    const [doc, docId, userId] = e.data

    const favorite = await checkFavoriteState(userId, docId)

    postMessage({
        build: {
            buildId: docId,
            ...doc
        },
        favorite: favorite.state
    })
}