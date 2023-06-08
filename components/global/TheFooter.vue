<template>
<footer class="footer">
    <div>
        <a href="">Privacy Policy</a>
        <a href="">Terms & Conditions</a>
    </div>
    <div>
        <p>About</p>
        <a href="mailto:">Contact</a>
    </div>
</footer>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
}

.footer a, .footer p{
    color: var(--white-2);
    font: var(--text);
    cursor: pointer;
}

.footer div{
    color: var(--white-2);
    font: var(--text);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer div:last-child{
    align-items: end;
}

.footer div:last-child a{
    text-decoration: none;
}
</style>