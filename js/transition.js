

// TRANSITION EFFECT

document.addEventListener("DOMContentLoaded", () => {
    const ease = "power4.inOut";

    revealTransition().then(() => {
        gsap.set(".block", { visibility: "hidden"});
    });

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            const target = link.getAttribute("target");
            if (!link.href) return;
            const isSamePage = link.pathname === window.location.pathname;
            if (
                target ===  "_blank" || isSamePage || href.startsWith("mailto:")
            ){
                return;
            }
            event.preventDefault();
            animateTransition().then(() => {
                window.location.href = href;
            });
        });
    });

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { scaleY: 1 });
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: "auto",
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { visibility: "visible", scaleY: 0});
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: [2, 5],
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }
});