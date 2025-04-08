const help = document.getElementById("help");
const text = document.getElementById("text");
const num = document.getElementById("num");
const tutID = document.getElementById("tutID");

const helpOne = document.getElementById("helpOne");
const helpTwo = document.getElementById("helpTwo");
const helpThree = document.getElementById("helpThree");
const helpFour = document.getElementById("helpFour");
const helpFive = document.getElementById("helpFive");
const helpSix = document.getElementById("helpSix");
const helpSeven = document.getElementById("helpSeven");
const helpEight = document.getElementById("helpEight");

let lastPressedCard = null;

function openMenu(menuId) {
    const menus = ["TMenu", "BMenu", "AMenu", "EMenu", "FMenu"];
    menus.forEach(id => {
        const menu = document.getElementById(id);
        if (id === menuId) {
            menu.style.display = 'block';
            setTimeout(() => {
                menu.style.opacity = 1;
                menu.style.pointerEvents = 'auto';
            }, 10);
        } else {
            menu.style.opacity = 0;
            menu.style.pointerEvents = 'none';
            setTimeout(() => {
                menu.style.display = 'none';
            }, 300);
        }
    });
}

function closeMenu() {
    const menus = ["TMenu", "BMenu", "AMenu", "EMenu", "FMenu"];
    menus.forEach(menuId => {
        const menu = document.getElementById(menuId);
        menu.style.opacity = 0;
        menu.style.pointerEvents = 'none';
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);
    });
}

function moveSafetyNets(container) {
    const safetyNets = document.getElementById("safetyNets");
    container.appendChild(safetyNets);
}

function oneCardSafetyNet(container) {
    const safetyNet = document.getElementById("oneCard")
    container.appendChild(safetyNet);
}

function openTutorial(element, tutorialName, totalSteps, safetyNet) {
    help.style.display = 'block';
    text.style.display = 'block';
    var container = document.getElementById(element);
    container.style.display = 'block';

    if (safetyNet === "no") {
        oneCardSafetyNet(container);
    } else {
        moveSafetyNets(container);
    }

    document.getElementById("safetyNetMiddle").style.display = "block";
    document.getElementById("safetyNetRight").style.display = "block";
    num.innerText = `1/${totalSteps}`;
    tutID.innerText = tutorialName;
    setTimeout(() => {
        container.style.opacity = 1;
        container.style.pointerEvents = 'auto';
        help.style.opacity = 1;
        help.style.pointerEvents = 'auto';
        text.style.opacity = 1;
    }, 10);
}

function closeTutorial() {
    const containers = [
        "sliderContainer", "trackerContainer", "TRandomiserContainer", "andContainer", "startContainer", "signContainer", "brickContainer",
        "orContainer", "xorContainer", "notContainer", "ARandomiserContainer", "gravityContainer", "endContainer", "cheeseContainer",
        "iceContainer", "lavaContainer", "woodContainer", "grappleContainer", "glavaContainer", "breakingContainer", "colourContainer",
        "bounceContainer", "frostContainer", "triggerContainer", 'editorControlsContainer', 'particlesContainer', 'sublevelsContainer',
        'walkingContainer', 'jumpingContainer', 'grapplingContainer', 'triggerModesContainer', 'weeklySpotlightContainer', 'miniGamesContainer',
        'awesomeSeriesContainer', 'oneOfAKindContainer', 'developerPicksContainer', 'showcaseMapsContainer', 'aChallengeContainer', 'pastCompetitionsContainer',
        'buildContainer', 'selectionContainer', 'colorsContainer', 'ambienceContainer', 'levelContainer', 'prefabsContainer', 'otherContainer',
        'connectingContainer', 'triggeredByContainer'
    ];

    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container.style.opacity == 1) {
            container.style.opacity = 0;
            container.style.pointerEvents = 'none';
            help.style.opacity = 0;
            help.style.pointerEvents = 'none';
            help.classList.remove("active");
            text.style.opacity = 0;

            const elements = container.querySelectorAll(".card");
            elements.forEach(element => {
                element.classList.remove("active", "activeTwo");
                element.style.zIndex = '';
                element.style.pointerEvents = 'auto';
            });

            let [currentNum, total] = num.innerText.split('/').map(Number);

            function decrement() {
                if (currentNum > 1) {
                    currentNum--;
                    num.innerText = `${currentNum}/${total}`;
                    setTimeout(decrement, 50);
                }
            }

            decrement();

            setTimeout(() => {
                container.style.display = 'none';
                help.style.display = 'none';
                text.style.display = 'none';
                Array.from(document.getElementsByClassName("safetyNet")).forEach(net => {
                    net.style.display = "none";
                });
            }, 300);
        }
    });

    const helpElements = [helpTwo, helpThree, helpFour, helpFive];
    helpElements.forEach(helpElement => {
        helpElement.style.opacity = "0";
    });

    helpOne.style.opacity = "1";

    document.querySelectorAll(".cardOne").forEach(cardOne => {
        cardOne.classList.remove("active");
    });

    document.querySelectorAll(".cardGroup").forEach(card => {
        card.style.pointerEvents = 'none';
        setTimeout(() => {
            card.style.pointerEvents = 'auto';
        }, 300);
    });
}

document.querySelectorAll(".card").forEach((card, index) => {
    card.addEventListener("click", function() {
        const active = document.querySelector(".card.active");
        lastPressedCard = this;
        this.style.pointerEvents = 'none';

        if (this.classList.contains("cardFour")) {
            setTimeout(() => {
                document.getElementById("safetyNetRight").style.display = "none";
            }, 700);
        }

        if (this.classList.contains("cardThree")) {
            document.getElementById("safetyNetRight").style.display = "block";
        }

        if (this.classList.contains("cardTwo")) {
            document.querySelectorAll(".cardOne").forEach(cardOne => {
                cardOne.classList.add("active");
                document.getElementById("safetyNetLeft").style.display = "block";
            });
        }

        document.querySelectorAll(".cardOne").forEach(cardOne => {
            cardOne.addEventListener("click", function() {
                if (this.classList.contains("cardOne")) {
                    this.classList.remove("active");
                    setTimeout(() => {
                        document.getElementById("safetyNetLeft").style.display = "none";
                    }, 700);

                    if (active) {
                        active.classList.remove("active");
                    }

                    const middleCard = document.querySelector(".card.active");
                    if (middleCard) {
                        middleCard.classList.remove("active");
                        middleCard.style.pointerEvents = 'auto';
                    }

                    let currentNum = parseInt(num.innerText.split('/')[0]);
                    if (currentNum > 1) {
                        num.innerText = `${currentNum - 1}/${num.innerText.split('/')[1]}`;
                    }
                }
            });
        });

        if (!this.classList.contains("active") && !this.classList.contains("activeTwo")) {
            this.classList.add("active");
            if (active) {
                active.classList.add("activeTwo");
                active.classList.remove("active");
                active.style.pointerEvents = "auto";
            }
            let currentNum = parseInt(num.innerText.split('/')[0]);
            num.innerText = `${currentNum + 1}/${num.innerText.split('/')[1]}`;
        } else if (this.classList.contains("active") && !this.classList.contains("activeTwo")) {
            this.classList.add("activeTwo");
            this.classList.remove("active");
        } else if (!this.classList.contains("active") && this.classList.contains("activeTwo")) {
            this.classList.remove("activeTwo");
            this.classList.add("active");
            if (active) {
                active.classList.remove("active");
                active.style.pointerEvents = 'auto';
            }
            let currentNum = parseInt(num.innerText.split('/')[0]);
            num.innerText = `${currentNum - 1}/${num.innerText.split('/')[1]}`;
        }
    });
});

document.getElementById("help").addEventListener("click", function() {
    this.classList.toggle("active");
});

document.querySelectorAll('.tutorialGroup').forEach(group => {
    group.addEventListener('wheel', function(event) {
        if (event.deltaY !== 0) {
            event.preventDefault();
            this.scrollLeft += event.deltaY * 6;
        }
    });
});

document.querySelector('#EMenu .groupTwoContainer .tutorialGroup').addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
        event.preventDefault();
        this.scrollLeft += event.deltaY * 10;
    }
});

document.querySelector('#EMenu .groupThreeContainer .tutorialGroup').addEventListener('wheel', function(event) {
    if (event.deltaY !== 0) {
        event.preventDefault();
        this.scrollLeft += event.deltaY * 15;
    }
});

document.querySelectorAll('.cardContainer').forEach(container => {
    container.addEventListener('click', function(event) {
        if (event.target === this) {
            closeTutorial();
        }
    });
});

function showHelp(helpId) {
    const helpElements = [helpOne, helpTwo, helpThree, helpFour, helpFive, helpSix, helpSeven, helpEight];
    helpElements.forEach(helpElement => {
        if (helpElement.id === helpId) {
            helpElement.style.opacity = 1;
            helpElement.style.pointerEvents = 'auto';
        } else {
            helpElement.style.opacity = 0;
            helpElement.style.pointerEvents = 'none';
        }
    });
}

document.querySelectorAll(".helpOne").forEach(element => {
    element.addEventListener("click", () => showHelp("helpOne"));
});

document.querySelectorAll(".helpTwo").forEach(element => {
    element.addEventListener("click", () => showHelp("helpTwo"));
});

document.querySelectorAll(".helpThree").forEach(element => {
    element.addEventListener("click", () => showHelp("helpThree"));
});

document.querySelectorAll(".helpFour").forEach(element => {
    element.addEventListener("click", () => showHelp("helpFour"));
});

document.querySelectorAll(".helpFive").forEach(element => {
    element.addEventListener("click", () => showHelp("helpFive"));
});

document.querySelectorAll(".helpSix").forEach(element => {
    element.addEventListener("click", () => showHelp("helpSix"));
});

document.querySelectorAll(".helpSeven").forEach(element => {
    element.addEventListener("click", () => showHelp("helpSeven"));
});

document.querySelectorAll(".helpEight").forEach(element => {
    element.addEventListener("click", () => showHelp("helpEight"));
});

document.getElementById("TRandomiserGroup").addEventListener("mouseenter", () => {
    const colors = ["TRandomiserPurple", "TRandomiserRed", "TRandomiserGreen", "TRandomiserYellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colors.forEach(color => {
        const element = document.getElementById(color);
        if (color === randomColor) {
            element.style.display = "block";
            element.style.opacity = 1;
        } else {
            element.style.opacity = 0;
            element.style.display = "none";
        }
    });
});

document.getElementById("TRandomiserGroup").addEventListener("mouseleave", () => {
    const colors = ["TRandomiserPurple", "TRandomiserRed", "TRandomiserGreen", "TRandomiserYellow"];
    colors.forEach(color => {
        const element = document.getElementById(color);
        element.style.opacity = 0;
        element.style.display = "none";
    });
});

document.getElementById("ARandomiserGroup").addEventListener("mouseenter", () => {
    const alts = ["ARalt1", "ARalt2", "ARalt3", "ARalt4", "ARalt5"];
    const randomAlt = alts[Math.floor(Math.random() * alts.length)];
    alts.forEach(alt => {
        const element = document.getElementById(alt);
        if (alt === randomAlt) {
            element.style.display = "block";
            element.style.opacity = 1;
        } else {
            element.style.opacity = 0;
            element.style.display = "none";
        }
    });
});

document.getElementById("ARandomiserGroup").addEventListener("mouseleave", () => {
    const alts = ["ARalt1", "ARalt2", "ARalt3", "ARalt4", "ARalt5"];
    alts.forEach(alt => {
        const element = document.getElementById(alt);
        element.style.opacity = 0;
        element.style.display = "none";
    });
});

document.querySelectorAll("#grapplingGroup img, #jumpingGroup img, #walkingGroup img, triggerModesGroup img").forEach(img => {
    const staticSrc = img.src;
    const gifSrc = img.src.replace("main.svg", "gif.gif");

    img.addEventListener("mouseenter", () => {
        img.src = "";
        img.src = gifSrc;
    });

    img.addEventListener("mouseleave", () => {
        img.src = staticSrc;
    });
});