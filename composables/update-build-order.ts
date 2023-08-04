import {
    BuildDocument,
    ImageDocument,
} from '@/utils/useTypes'

type Build = {
    build: BuildDocument
    images: ImageDocument
}

export default async function (orderKey:string, direction:string, buildList:Build[]) {
    let sortedBuilds:Build[] = []

    if (direction === 'desc' && orderKey === 'views') { /* Ordering for views */
        sortedBuilds = buildList.sort((a, b) => a.build.views - b.build.views)
    } else if (direction === 'asc' && orderKey === 'views') {
        sortedBuilds = buildList.sort((a, b) => b.build.views - a.build.views)
    } else if (direction === 'desc' && orderKey === 'blocks') { /* Ordering for blocks */
        sortedBuilds = buildList.sort((a, b) => a.build.blocks - b.build.blocks)
    } else if (direction === 'asc' && orderKey === 'blocks') {
        sortedBuilds = buildList.sort((a, b) => b.build.blocks - a.build.blocks)
    } else if (direction === 'desc' && orderKey === 'modified') { /* Ordering for date */
        sortedBuilds = buildList.sort((a, b) => a.build.date.lastEdit.seconds - b.build.date.lastEdit.seconds)
    } else if (direction === 'asc' && orderKey === 'modified') {
        sortedBuilds = buildList.sort((a, b) => b.build.date.lastEdit.seconds - a.build.date.lastEdit.seconds)
    } else if (direction === 'desc' && orderKey === 'created') {
        sortedBuilds = buildList.sort((a, b) => a.build.date.created.seconds - b.build.date.created.seconds)
    } else if (direction === 'asc' && orderKey === 'created') {
        sortedBuilds = buildList.sort((a, b) => b.build.date.created.seconds - a.build.date.created.seconds)
    }

    return sortedBuilds
}