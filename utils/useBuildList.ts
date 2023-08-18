import {
    PreviewBuildData,
} from './useTypes'

export async function getBuildListByUserId (userId:string) {
    /* query(buildRef, where('userId', '==', userId), orderBy('views', 'desc')) */
    const buildQuery = {
        where: {
            field: 'userId',
            filter: '==',
            value: userId
        },
        orderBy: {
            field: 'views',
            direction: 'desc'
        }
    }

    return await getBuildList(buildQuery, userId)
}

export async function getBuildListByCategory (userId:string, category?:string) {
    /* query(buildRef, limit(10)) */
    const buildQuery = {
        limit: 10
    }

    return await getBuildList(buildQuery, userId)
}

/* Not finished */
export async function getBuildListBySearch (userId:string, search:string) {

}

export async function getBuildList( listQuery: any, userId:string ) {
    return new Promise<PreviewBuildData[]>(async (resolve, reject) => {
        const worker = new Worker('/workers/BuildListWorker.ts')
        worker.postMessage([JSON.parse(JSON.stringify(listQuery)), userId])
        
        worker.onmessage = function(e) {
            resolve(e.data)
        }
    })
}