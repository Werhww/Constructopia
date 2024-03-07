<template>
<!--     <NuxtLoadingIndicator 
        :duration="200"
        color="red"
    /> -->
    <NuxtPage />
</template>

<style lang="scss">
body {
    background-color: var(--background);
    overflow-x: hidden;
}

* {
    margin: 0;
    padding: 0;
    color: white;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
    --pad-normal: 1rem;
    --pad-small: 0.5rem;

    --rad-outer: 1rem;
    --rad-inner: 0.5rem;
    --rad-small: 0.375rem;

    --gap-big: 2.5rem;
    --gap-normal: 1rem;
    --gap-small: 0.375rem;
    --gap-tiny: 0.25rem;


    --dark: #1E1E1E;
    --background: #232323;
    --grey: #6A6565;
    --light-grey: #A59B9B;
    --red: #FF0000;

    --shadow:  0px 0px 4px 0px var(--grey);

    --filter-grey: brightness(0) saturate(100%) invert(40%) sepia(3%) saturate(551%) hue-rotate(314deg) brightness(94%) contrast(84%);
    --filter-light-grey: brightness(0) saturate(100%) invert(63%) sepia(3%) saturate(656%) hue-rotate(314deg) brightness(100%) contrast(84%);
}

h1 {
    font-size: 3rem;
    font-weight: 500;
}

h2 {
    font-size: 1.25rem;
    font-weight: 500;
}

p {
    font-size: 1rem;
    font-weight: 500;
}

span {
    font-size: 0.8rem;
    font-weight: 500;
}

.grey {    
    color: var(--grey);
    font-weight: 400;
    
}

.greyThick {
    color: var(--grey);
    font-weight: 600;
}

.light-grey {
    color: var(--light-grey);
    font-weight: 400;
}

.light-greyThick {
    color: var(--light-grey);
    font-weight: 600;
}

</style>