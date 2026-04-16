// LANGUAGE SWITCH
function setLanguage(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });
}

// PAGE LOAD
window.addEventListener("load", function () {
    setLanguage('en');

    // Show fade elements
    document.querySelectorAll(".fade-in").forEach(el => {
        el.classList.add("show");
    });
});

// SCROLL EFFECT (HEADER + NAV)
window.addEventListener("scroll", function() {
    let header = document.querySelector("header");
    let nav = document.querySelector("nav");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        nav.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
        nav.classList.remove("scrolled");
    }
});

// SIMPLE SCROLL ANIMATION
function revealOnScroll() {
    const elements = document.querySelectorAll(".fade-in");

    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// ACTIVE MENU
window.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll("nav a");
    let currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

// MODAL (SERVICES)
function openService(service) {
    let title = "";
    let text = "";

    if (service === "education") {
        title = "Education";
        text = "We support schools and help children access quality education.";
    }

    if (service === "nutrition") {
        title = "Nutrition";
        text = "We provide nutrition programs for vulnerable communities.";
    }

    if (service === "environment") {
        title = "Environment";
        text = "We protect nature and promote sustainability.";
    }

    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-text").innerText = text;
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// IMAGE POPUP
function openImage(img) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("popupImg").src = img.src;
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}
let slideIndex = 0;
//let slides = document.querySelectorAll(".slide");
//let dots = document.querySelectorAll(".dots span");
let interval;

/* SHOW SLIDE */
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dots span");
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

/* NEXT / PREV */
function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

/* DOT CLICK */
if (typeof dots !== "undefined" && dots.length > 0) {
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            slideIndex = i;
            showSlide(slideIndex);
        });
    });
}

/* AUTO SLIDE */
function startSlider() {
    interval = setInterval(nextSlide, 4000);
}

/* PAUSE ON HOVER */
const hero = document.querySelector(".hero");

if (hero) {
    hero.addEventListener("mouseenter", () => clearInterval(interval));
    hero.addEventListener("mouseleave", startSlider);
}

/* ARROWS */
//document.querySelector(".next").onclick = nextSlide;
//document.querySelector(".prev").onclick = prevSlide;
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) nextBtn.onclick = nextSlide;
if (prevBtn) prevBtn.onclick = prevSlide;

/* INIT */
function animateCounters() {
    const counters = document.querySelectorAll(".counter");

    console.log("Counters found:", counters.length); // DEBUG

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);

        console.log("Target value:", target); // DEBUG

        if (!target) {
            counter.innerText = "ERR";
            return;
        }

        let count = 0;

        const update = () => {
            const increment = Math.ceil(target / 50);

            if (count < target) {
                count += increment;
                counter.innerText = count;
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };

        update();
    });
}
// TRIGGER WHEN VISIBLE
window.addEventListener("load", () => {
    animateCounters();
});

// INIT EMAILJS
(function(){
    emailjs.init("cjTwhVY-gv7C1cvsS"); // 🔴 replace
})();
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // SPAM CHECK
    if (this.website.value !== "") return;

    const form = this;

    // 1️⃣ SEND TO ADMIN
    emailjs.sendForm(
        "service_cw4g14q",
        "template_ebfs4ns",
        form
    )
    .then(() => {

        // 2️⃣ AUTO REPLY TO USER
        return emailjs.sendForm(
            "service_cw4g14q",
            "template_ubmhb2p",
            form
        );

    })
    .then(() => {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch((error) => {
        alert("Failed to send message.");
        console.log(error);
    });
});
