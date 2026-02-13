class ClickEffects {
    constructor(options = {}) {
        this.heartSrc = options.heartSrc || "heart-animation.png";
        this.effectDuration = options.effectDuration || 10000;
        this.heartFallDuration = options.heartFallDuration || 2000;
        this.fallDistance = options.fallDistance || 220;
        this.layer = null;
    }

    ensureLayer() {
        if (this.layer) return;
        const layer = document.createElement("div");
        layer.className = "effect-layer";
        document.body.appendChild(layer);
        this.layer = layer;
    }

    spawnHeartAt(x, y) {
        this.ensureLayer();
        if (!this.layer) return;

        const img = document.createElement("img");
        img.alt = "Heart";
        img.className = "click-heart";
        img.src = this.heartSrc;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.animationDuration = `${this.heartFallDuration}ms`;
        img.style.setProperty("--fall-distance", `${this.fallDistance}px`);

        this.layer.appendChild(img);

        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, this.heartFallDuration + 150);
    }
}

window.clickEffects = window.clickEffects || new ClickEffects();

document.addEventListener("click", (e) => {
    const nav = document.querySelector(".nav-bar");
    if (nav && nav.contains(e.target)) return;
    window.clickEffects.spawnHeartAt(e.clientX, e.clientY);
});
