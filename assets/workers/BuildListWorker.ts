import {
    PreviewBuildData,
} from '@/utils/useTypes'
import CardDataWorker from '@/assets/workers/CardDataWorker?worker'

onmessage = async function(e) {
    console.log(`Worker: Message received from main script`)
    const [listQuery, userId] = e.data
    console.log(listQuery)
    const buildData = await getDocs(listQuery)
    const buildList:PreviewBuildData[] = []
    const worker = new CardDataWorker()

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