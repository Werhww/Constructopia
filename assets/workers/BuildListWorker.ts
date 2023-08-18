import {
    PreviewBuildData,
} from '@/utils/useTypes'
import CardDataWorker from '@/assets/workers/CardDataWorker?worker'


onmessage = async function(e) {
    const [queryObject, userId] = e.data
    const buildList:PreviewBuildData[] = []
    const worker = new CardDataWorker()
    
    const buildData = await getDocs(firebaseQueryMaker(queryObject))
    
    const buildListLength = buildData.docs.length
    let returnedBuilds = 0

    for (const doc of buildData.docs) {
        worker.postMessage([doc.data(), doc.id, userId, Date.now()])
    }


    worker.onmessage = function(e) {
        returnedBuilds++
        buildList.push(e.data)

        if(buildListLength === returnedBuilds) {
            worker.terminate()
            postMessage(buildList)
        }
    }

}