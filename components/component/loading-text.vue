<template>
<p class="loading-animation">This is loading</p>
</template>

<script setup lang="ts">

</script>

<style scoped>
.loading-animation {
    color: var(--dark);
    background-color: var(--dark);
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
    border-radius: var(--border-radius);
}

@keyframes shine {
	to {
		background-position: right -40px top 0;
	}
}
</style>