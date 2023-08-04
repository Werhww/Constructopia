import {
    BuildDocument,
    ImageDocument,
} from '@/utils/useTypes'

type BuildDataDoc = Omit<BuildDocument, 'buildId'>

export default async function (userId:string) {
    const buildList:{
        build: BuildDocument,
        images: ImageDocument,
    }[] = []

    const buildQuery = query(buildRef, where('userId', '==', userId), orderBy('views', 'desc'))

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

    return buildList
}