function closeOffcanvas() {
    document.getElementById('offcanvas').classList.add('-translate-x-full');
    document.getElementById('overlay').classList.add('hidden');
}

document.querySelector("button").addEventListener("click", () => {
    document.getElementById('overlay').classList.remove('hidden');
});