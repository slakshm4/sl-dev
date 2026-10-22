// idle.ts · decorations that loop forever (floating stickers, the spinning burst, the bobbing arrows) are paused while they are off screen,
// so a long page is not animating dozens of things nobody can see. what you can see is unchanged; each one carries on from where it stopped.
let io: IntersectionObserver | null = null;

export function initIdle() {
  if (!("IntersectionObserver" in window)) return;
  io?.disconnect();
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.target.classList.toggle("is-idle", !e.isIntersecting)),
    { rootMargin: "160px" },
  );
  document
    .querySelectorAll(".float, .burst--spin, .sprite--quiver, .cta--down .cta-arrow, .tw-cursor, .spinner")
    .forEach((el) => io!.observe(el));
}
