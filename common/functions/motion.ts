export const flyInMotion = (
  direction: "up" | "down" | "left" | "right",
  distance = 100,
  delay = 0,
) => {
  const initial = {
    opacity: 0,
    x: direction === "left" ? -distance : direction === "right" ? distance : 0,
    y: direction === "up" ? -distance : direction === "down" ? distance : 0,
  };
  const animate = { opacity: 1, x: 0, y: 0 };
  return { initial, animate, transition: { duration: 0.5, delay } };
};

export const fadeInMotion = () => ({
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
});
