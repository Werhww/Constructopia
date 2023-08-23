export default function (seach: string, description: string) {
    console.log('Creating category...')
    console.log('Seach: ', seach)
    console.log('Description: ', description)

    setDoc(doc(categoryRef, seach), {
        name: seach,
        description: description,
        count: 0
    })

    console.log('Category created')
}