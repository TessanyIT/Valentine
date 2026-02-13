let button1PaddingVertical = 50;
let button1PaddingHorizontal = 140;


let button2PaddingVertical = 50;
let button2PaddingHorizontal = 140;

let imageCounter = 1;
let textCounter = 1;
let buttonPhraseCounter = 1;

let counter = 1;

function getNameFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    return name ? name.trim() : "";
}

function setTitleWithName() {
    const title = document.querySelector("h1");
    if (!title) return;
    const name = getNameFromQuery();
    if (name) {
        title.textContent = `Will you be my Valentine, ${name}?`;
    } else {
        title.textContent = "Will you be my Valentine?";
    }
}


let phrases = [
    "Pretty pleaseee",
    "You really hate me don't you?",
    "Why won't you click me?",
    "Please click meee",
    "I just want to be clicked",
    "Don't you want to click me?",
    "I promise I won't do anything bad",
    "Click me, I dare you!",
    "Are you sure you don't want to click me?",
    "I can be your best friend if you click me!",
];

let images = [
    "images.png",
    "images2.png",
    "images3.png",
    "images4.png",
    "images5.png",
    "images6.png",
    "images7.png",
    "images8.png",
    "images9.png",
    "images10.png",
    "images11.png",
];

let buttonPhrases = [
    "No",
    "Still no",
    "Absolutely not",
    "Not gonna happen",
    "No way",
    "Negative",
    "I don't think so",
    "Nope",
    "Not interested",
    "No thanks"
];

function phraseChange() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = phrases[textCounter];
    textCounter = (textCounter + 1) % phrases.length;
}

function imageChange() {
    const imgElement = document.querySelector("img");
    imgElement.src = images[imageCounter];
    imageCounter = (imageCounter + 1) % images.length;
}

function buttonPhraseChange() {
    const button2Element = document.getElementById("button2");
    button2Element.textContent = buttonPhrases[buttonPhraseCounter];
    buttonPhraseCounter = (buttonPhraseCounter + 1) % buttonPhrases.length;
}

function applyButton1Padding() {
    document.querySelector("button#button1").style.padding =
        `${button1PaddingVertical}px ${button1PaddingHorizontal}px`;
}

function applyButton2Padding() {
    document.querySelector("button#button2").style.padding =
        `${button2PaddingVertical}px ${button2PaddingHorizontal}px`;
}

function getSafeTop() {
    const title = document.querySelector("h1");
    const message = document.getElementById("message");
    const titleBottom = title ? title.getBoundingClientRect().bottom : 0;
    const messageBottom = message ? message.getBoundingClientRect().bottom : 0;
    return Math.ceil(Math.max(titleBottom, messageBottom) + 20);
}

function getAvoidRects() {
    const elements = [
        document.querySelector("h1"),
        document.getElementById("message"),
        document.querySelector("img")
    ];
    return elements
        .filter((el) => el && el.style.display !== "none")
        .map((el) => el.getBoundingClientRect());
}

function calculateMaxButtonSize(button, padding = 8) {
    if (!button) return { maxWidth: 0, maxHeight: 0 };
    const viewportWidth = window.innerWidth - padding * 2;
    const viewportHeight = window.innerHeight - padding * 2;
    const avoidRects = getAvoidRects();

    let maxWidth = viewportWidth;
    let maxHeight = viewportHeight;

    avoidRects.forEach((rect) => {
        const rectTop = Math.max(0, rect.top - padding);
        const rectBottom = Math.min(window.innerHeight, rect.bottom + padding);
        const rectLeft = Math.max(0, rect.left - padding);
        const rectRight = Math.min(window.innerWidth, rect.right + padding);

        const widthAround = Math.max(rectLeft, window.innerWidth - rectRight);
        const heightAround = Math.max(rectTop, window.innerHeight - rectBottom);

        maxWidth = Math.min(maxWidth, Math.max(0, widthAround));
        maxHeight = Math.min(maxHeight, Math.max(0, heightAround));
    });

    return {
        maxWidth: Math.max(0, maxWidth),
        maxHeight: Math.max(0, maxHeight)
    };
}

function isOverlapping(rectA, rectB) {
    return !(
        rectA.right <= rectB.left ||
        rectA.left >= rectB.right ||
        rectA.bottom <= rectB.top ||
        rectA.top >= rectB.bottom
    );
}

function moveButtonsRandomly() {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const safeTop = getSafeTop();
    const avoidRects = getAvoidRects();

    [button1, button2].forEach((button) => {
        if (!button || button.style.display === "none") return;
        button.style.position = "absolute";
        button.style.margin = "0";
    });

    const placeButton = (button, otherButton) => {
        if (!button || button.style.display === "none") return;
        const rect = button.getBoundingClientRect();
        const padding = 8;
        const maxLeft = Math.max(0, window.innerWidth - rect.width - padding);
        const maxTop = Math.max(0, window.innerHeight - rect.height - padding);
        const minTop = Math.min(safeTop, maxTop);
        let attempt = 0;
        let left = 0;
        let top = minTop;

        while (attempt < 50) {
            left = Math.floor(Math.random() * (maxLeft + 1));
            top = Math.floor(
                minTop + Math.random() * Math.max(0, maxTop - minTop)
            );

            button.style.left = `${left}px`;
            button.style.top = `${top}px`;

            const rectA = button.getBoundingClientRect();
            const overlapOther =
                otherButton && otherButton.style.display !== "none"
                    ? isOverlapping(rectA, otherButton.getBoundingClientRect())
                    : false;
            const overlapAvoid = avoidRects.some((avoidRect) =>
                isOverlapping(rectA, avoidRect)
            );

            if (!overlapOther && !overlapAvoid) break;
            attempt += 1;
        }
    };

    placeButton(button1, button2);
    placeButton(button2, button1);
}

function expandButton1ToCoverPage() {
    const button1 = document.getElementById("button1");
    const safeTop = getSafeTop();
    const availableHeight = Math.max(0, window.innerHeight - safeTop - 20);
    const horizontalPadding = Math.max(20, Math.floor(window.innerWidth / 2) - 60);
    const verticalPadding = Math.max(20, Math.floor(availableHeight / 2) - 60);

    button1.style.position = "absolute";
    button1.style.left = "10px";
    button1.style.top = `${safeTop}px`;
    button1.style.margin = "0";

    button1PaddingHorizontal = horizontalPadding;
    button1PaddingVertical = verticalPadding;
    applyButton1Padding();
}

function getAdvancementContainer() {
    let container = document.querySelector(".advancement-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "advancement-container";
        document.body.appendChild(container);
    }
    return container;
}

function showAdvancement(title, description, duration = 3000) {
    const container = getAdvancementContainer();
    const toast = document.createElement("div");
    toast.className = "advancement-toast";

    const titleEl = document.createElement("div");
    titleEl.className = "advancement-title";
    titleEl.textContent = title;

    const descEl = document.createElement("div");
    descEl.className = "advancement-desc";
    descEl.textContent = description;

    toast.appendChild(titleEl);
    toast.appendChild(descEl);
    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 220);
    }, Math.max(1000, duration));
}

document.getElementById("button1").addEventListener("click", function() {
    if (counter === 1) {
        const name = getNameFromQuery();
        document.getElementById("message").textContent = `Wow, I wasnt expecting it to be that easy! I love you ${name}! ❤️`;
        document.querySelector("img").src = "happy2.png";
        document.querySelector("button#button1").style.display = "none";
        document.querySelector("button#button2").style.display = "none";
        document.querySelector("img").style.display = "block";
        document.querySelector("button#button2").style.marginLeft = "320px";
        showAdvancement("Love at First Click", "You said yes on the first try!");
    } else {
        const name = getNameFromQuery();
        document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
        document.querySelector("img").src = "happy.png";
        document.querySelector("button#button1").style.display = "none";
        document.querySelector("button#button2").style.display = "none";
        document.querySelector("img").style.display = "block";
        document.querySelector("button#button2").style.marginLeft = "320px";
        showAdvancement("You Came Around", "You finally clicked yes.");
    }
    applyButton2Padding();
});

document.getElementById("button2").addEventListener("click", function() {
    if (counter === 1) {
        showAdvancement("First Rejection", "Ouch! You clicked no.");
    }
    if (counter === 3) {
        showAdvancement("Still Nope", "Three no's already?!");
    }
    if (counter === 5) {
        showAdvancement("Cold Hearted", "Five no's in a row.");
        const result = confirm("Are you sure you want to keep rejecting me?");
        if (result) {
            const result2 = confirm("Are you REALLY sure?");
            if (result2) {
                
            } else {
                const name = getNameFromQuery();
                document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
                document.querySelector("img").src = "happy.png";
                document.querySelector("button#button1").style.display = "none";
                document.querySelector("button#button2").style.display = "none";
                document.querySelector("img").style.display = "block";
                document.querySelector("button#button2").style.marginLeft = "320px";
                return;
            }
        } else {
            const name = getNameFromQuery();
            document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
            document.querySelector("img").src = "happy.png";
            document.querySelector("button#button1").style.display = "none";
            document.querySelector("button#button2").style.display = "none";
            document.querySelector("img").style.display = "block";
            document.querySelector("button#button2").style.marginLeft = "320px";
            return;
        }

    }

    if (counter === 8) {
        showAdvancement("Persistent Rejection", "You kept rejecting even after all those confirmations!");
    }

    imageChange();
    button1PaddingVertical += 10;
    button1PaddingHorizontal += 16;
    button2PaddingVertical -= 5;
    button2PaddingHorizontal -= 14;
    if (button2PaddingVertical <= 0) {
    document.getElementById("button2").style.display = "none";
    expandButton1ToCoverPage();
    }
    console.log(button1PaddingVertical, button1PaddingHorizontal);
    console.log(button2PaddingVertical, button2PaddingHorizontal);
    applyButton1Padding();
    applyButton2Padding();
    moveButtonsRandomly();
    phraseChange();
    buttonPhraseChange();

    counter++;
    
});
setTitleWithName();