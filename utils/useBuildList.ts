import { buildRef } from 'assets/scripts/firebase'
import { query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { BuildDocument } from './useTypes'

type BuildWithoutBuildId = Omit<BuildDocument, 'buildId'>

export async function getBuildListByUserId (userId:string) {
    /* query(buildRef, where('userId', '==', userId), orderBy('views', 'desc')) */
    const buildQuery = query(buildRef, where('userId', '==', userId), orderBy('views', 'desc'))

    return await getBuildList(buildQuery, userId)
}

export async function getBuildListByCategory (userId:string, categorys?:string[]) {
    /* query(buildRef, limit(10)) */
    const buildQuery = query(buildRef, limit(10))

    return await getBuildList(buildQuery, userId)
}

/* Not finished */
export async function getBuildListBySearch (userId:string, search:string) {

}


export async function getBuildList( listQuery: any, userId:string ): Promise<BuildDocument[]> {
    const buildListSnapshot = await getDocs(listQuery)
    const buildList:BuildDocument[] = []

    buildListSnapshot.forEach((buildDoc) => {
        buildList.push({
            buildId: buildDoc.id,
            ...buildDoc.data() as BuildWithoutBuildId
        } as BuildDocument)
    })

    return  buildList
}