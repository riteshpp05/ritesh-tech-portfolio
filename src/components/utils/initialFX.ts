import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "var(--bg-primary)",
    duration: 0.5,
    delay: 1,
  });

  // Staggered reveal for texts without SplitText
  gsap.fromTo(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { opacity: 0, y: 30, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Re-enable text loops for specific landing texts with simpler setup
  LoopText(".landing-h2-info", ".landing-h2-info-1");
  LoopText(".landing-h2-1", ".landing-h2-2");
}

function LoopText(selectorA: string, selectorB: string) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    selectorB,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      delay: delay,
    },
    0
  )
    .fromTo(
      selectorA,
      { y: 30 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        delay: delay2,
      },
      1
    )
    .fromTo(
      selectorA,
      { y: 0 },
      {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: delay,
      },
      0
    )
    .to(
      selectorB,
      {
        y: -30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
        delay: delay2,
      },
      1
    );
}
