
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//SCROLLYTELLING SETTINGS HERE

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const textBlocks = gsap.utils.toArray('.award-text-block');
    const cards = gsap.utils.toArray('.award-card');

    gsap.set(cards[0], { opacity: 1, scale: 1});
    textBlocks[0].classList.add('active');

    textBlocks.forEach((block, i) => {
        ScrollTrigger.create ({
            trigger: block,
            start: "top center",
            end: "bottom center",

            toggleClass: "active",

            onToggle: (self) => {
                if(self.isActive) {
                    updateAward(i);
                }
            }
        });
    });

    function updateAward(index) {
        cards.forEach((card, i)=> {
            if (i !== index) {
                gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.5, overwrite: true});
            }
        });

        if(cards[index]) {
            gsap.to(cards[index], { opacity: 1, scale: 1, duration: 0.5, overwrite: true});
        }
    }
});

