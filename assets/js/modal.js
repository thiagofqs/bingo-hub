const btnOpenConfigModal = document.querySelector("#openConfigModal");
const btnCloseConfigModal = document.querySelector("#closeConfigModal");
const configModal = document.querySelector("#configModal");

function openConfigModal() {
    configModal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeConfigModal() {
    configModal.style.display = "none";
    document.body.style.overflow = "auto";
}

btnOpenConfigModal.addEventListener("click", openConfigModal);
btnCloseConfigModal.addEventListener("click", closeConfigModal);
