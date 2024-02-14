<script setup lang="ts" >
const datePickerValue = ref()

watch(datePickerValue, (newVal, oldVal) => {
    console.log('newVal', newVal)
})
</script>

<template>
    <div class="test">
        <Filter />

        <BuildCard
            src="/images/placeholder.png"
            name="Simpel tavern house"
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit a"
            :views="205"
            :blocks="125"
            :downloads="50"
            username="supergamer"
            user-id="34cw5y3"
            size="Huge"
            file-extension="NBT"

            difficulty="Easy"
            :categorys="[
                {name: 'Medieval', id: '1'},
                {name: 'Fantasy', id: '2'},
                {name: 'Tavern', id: '3'}
            ]"  
        />
    </div>
</template>

<style scoped lang="scss">
.test {
    padding: 10rem;
}
</style>