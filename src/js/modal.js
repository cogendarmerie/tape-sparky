class Modal {
    constructor(id) {
        this.modal = document.getElementById(id);
        this.modal.querySelector("button[data-action='close']").addEventListener("click", () => {
            this.hide();
        });
    }
    show() {
        this.modal.dataset.visible = true;
        const target = document.querySelector("#" + this.modal.id +" > div");
        anime({
            targets: target,
            opacity: [0, 1],
            translateY: [100, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
            duration: 400,
            easing: "easeInOutQuad",
        })
    }
    hide() {
        const target = document.querySelector("#" + this.modal.id +" > div");
        anime({
            targets: target,
            opacity: [1,0],
            translateY: [0, 10, -10, 100],
            scale: [ 1.1, 1, 0],
            duration: 500,
            easing: "easeInOutQuad",
        });
        function internalHide(modal) {
            modal.dataset.visible = false;
        }
        setTimeout(internalHide, 500, this.modal);
    }
    setTitle(title) {
        this.modal.querySelector("h2").textContent = title;
    }
    setMessage(message) {
        this.modal.querySelector(".message").textContent = message;
    }
}