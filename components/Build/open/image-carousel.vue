<template>
<div class="image-carousel" v-if="loading">
    <img v-for="item in carousel_images" @click="changeShownImage(item.index)" :src="item.image" :class="{'image-carousel-current': item.current, 'image-carousel-item': true}">
</div>
<div class="image-carousel" v-else>
    <div v-for="i in 6" class="image-carousel-item-loading loading-animation"></div>
</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['change-preview-image'])

const props = defineProps<{
    links: string[]

    loading: boolean
}>()

type CarouselImage = {
    image: string
    index: number
    current: boolean
}

const carousel_images = computed(() => {
    let items:CarouselImage[] = []

    props.links.map((link, index) => {
        items.push( {
            image: link,
            index: index,
            current: index == 0
        })
    })

    return items
})


function changeShownImage(newindex: number) {
    console.log('cahnging carousel image', newindex)

    let items:CarouselImage[] = []

    props.links.map((link, index) => {
        items.push( {
            image: link,
            index: index,
            current: index == newindex
        })
    })

    console.log(items)

    emit('change-preview-image', newindex)
}

</script>

<style scoped>

.image-carousel {
    height: 37.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.image-carousel-item {
    width: 6.25rem;
    height: 5.625rem;
    object-fit: cover;
    border-radius: calc(var(--border-radius) / 2);

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(0.5);
    cursor: pointer;

    transition: filter 0.2s ease;
}

.image-carousel-current {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(1);
}

.image-carousel-item-loading {
    width: 6.25rem;
    height: 5.625rem;
    border-radius: calc(var(--border-radius) / 2);
}

.loading-animation {
    background-color: var(--dark)!important;
    background-image: linear-gradient(
        90deg,
        var(--dark) 20%,
        var(--lower-tone) 50%,
        var(--dark) 80%
    );
	background-size: 40px 100%;
	background-repeat: no-repeat;
	background-position: left -40px top 0; 
	animation: shine 1s ease infinite;
}

@keyframes shine {
	to {
		background-position: right -40px top 0;
	}
}
</style>
