import { buildRef, categoryRef, storage } from 'assets/scripts/firebase'
import { Timestamp, addDoc, collection, doc, increment, setDoc } from 'firebase/firestore'
import { getDownloadURL, uploadString, ref as fbRef } from 'firebase/storage'
import {
    BuildDocument,
    Prettify
} from '~/utils/useTypes'

type UploadData = Omit<BuildDocument, 'buildId' | 'userId' | 'views' | 'date' | 'links' | 'imageIds' | 'litematic' | 'blocks' | 'litematicId'> & {
    litematicFile: any
    images: string[]
}

export class newBuild {
    private title: string = ''
    private description: string = ''
    private difficulty: string = ''
    private username: string = ''
    private blocks: number = 0
    private thumbnailIndex: number = 0

    private litematicId: string = ''
    private litematic:string = ''
    private links:string[] = []
    private imageIds: string[] = []
    private categorys: string[] = []

    private buildId: string = ''

    constructor(private userId: string) {}

    async upload({title, description, difficulty, username, litematicFile, images, categorys, thumbnailIndex}:UploadData) {
        this.title = title
        this.description = description
        this.difficulty = difficulty
        this.username = username
        this.categorys = categorys
        this.thumbnailIndex = thumbnailIndex

        await this.uploadImages(images)
        await this.uploadLitematic(litematicFile)
        await this.uploadBuild()
        this.incrementCategorys()
        await this.uploadInventory(litematicFile)
        console.log('done uploading build')
    }

    async uploadBuild() {
        const buildDocData:Prettify<Omit<BuildDocument, 'buildId'>> = {
            title: this.title,
            description: this.description,
            difficulty: this.difficulty,
            blocks: this.blocks,
            thumbnailIndex: this.thumbnailIndex,
    
            userId: this.userId,
            username: this.username,


            links: this.links,
            imageIds: this.imageIds,
            categorys: this.categorys,

            litematicId: this.litematicId,
            litematic: this.litematic,

            date: {
                created: Timestamp.now(),
                lastEdit: Timestamp.now()
            },

            views: 0,
        }

        const build = await addDoc(buildRef, buildDocData)
        this.buildId = build.id
    }


    async uploadImages(images:string[]) {
        const storageRef = fbRef(storage, `images/`)

        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const imageBlob = dataURLToBlob(image)
            const imageId =  await calculateFileSHA1(imageBlob)

            const imagesRef = fbRef(storageRef, `${imageId}.png`)
    
            await uploadString(imagesRef, image, 'data_url')
    
            await getDownloadURL(imagesRef).then((url) => {
                this.links.push(url)
                this.imageIds.push(imageId)
            })
        }
        console.log('done uploading images')
    }

    async uploadLitematic(file:any) {
        this.litematicId = await calculateFileSHA1(file)
        const storageRef = fbRef(storage, `litematic/`)
        const litematicRef = fbRef(storageRef, `${this.litematicId}.litematic`)

        this.blocks = await countBlocks(file)

        return new Promise((resolve) => {
            let reader = new FileReader()

            reader.onload = async (e:any) => {
                await uploadString(litematicRef, e.target?.result, 'data_url')
                this.litematic = await getDownloadURL(litematicRef)
                resolve(200)
            }


            reader.readAsDataURL(file)
        })
    }

    async uploadInventory(file:any) {
        const inventory = await countBuild(file)
        console.log(inventory)
        for(let key in inventory) {
            console.log(key)
            if (inventory[key].block == "minecraft:air") continue

            addDoc(collection(buildRef, this.buildId, 'inventory'), {
                block: inventory[key].block,
                count: inventory[key].count
            })
        }
        console.log('done uploading inventory')
    }

    private incrementCategorys() {
        for(let i = 0; i < this.categorys.length; i++) {
            setDoc(doc(categoryRef, this.categorys[i]), {
                count: increment(1)
            }, { merge:true })
        }
    }
}