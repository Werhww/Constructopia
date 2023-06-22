<template>
<div class="item">
    <p>see more</p>
</div>
</template>

<style scoped>
.item {
    min-width: 7rem;
    height: 17.938rem;


    border-radius: var(--border-radius);

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--dark);


    cursor: pointer;
}

.item p{
    font: var(--text);
    color: var(--white);
    transform: rotate(75deg);
}
</style>