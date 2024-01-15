<template>
    <NuxtPage />
</template>

<style lang="scss">
body {
    background-color: var(--background);
}

* {
    margin: 0;
    padding: 0;
    color: white;
    font-family: 'Inter', sans-serif;
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


    --dark: #1E1E1E;
    --background: #232323;
    --grey: #6A6565;

    --shadow:  0px 0px 4px 0px var(--grey);
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
    font-size: 0.75rem;
    font-weight: 500;
}


</style>