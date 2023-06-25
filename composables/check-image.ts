export default async function checkImage(url:string){
    const res = await fetch(url, {method:'HEAD'});

    if(res.status === 404) {
        return false;
    } else if (res.status === 200) {
        const buff = await res.blob();
        return buff.type.startsWith('image');
    }
}