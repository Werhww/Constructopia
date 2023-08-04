import {
    BuildDocument,
    ImageDocument,
} from '@/utils/useTypes'

type BuildDataDoc = Omit<BuildDocument, 'buildId'>

export default async function (category:string) {
    const buildList:{
        build: BuildDocument,
        images: ImageDocument,
    }[] = []
                    
    /* const buildQuery = query(buildRef, where('category', '==', category)) */

    const buildQuery = query(buildRef, limit(10))

    const buildData = await getDocs(buildQuery)

    for (const doc of buildData.docs) {
        const images = await getDocs(query(imageRef, where('buildId', '==', doc.id), limit(1)))
        buildList.push({
            build: {
                buildId: doc.id,
                ...doc.data() as BuildDataDoc
            },
            images: images.docs[0].data() as ImageDocument
        })
    }

    console.log(buildList)

    return buildList
}