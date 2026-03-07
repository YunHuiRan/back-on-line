import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { animate } from "animejs";

export function toggleCalculatorMode() {
  const state = userAnimationInstance().$state;
  const calculatorStore = useCalculatorStore();

  const toggleBtnInstance = state.toggleButton;
  const buttonAreaInstance = state.buttonArea;
  if (!toggleBtnInstance || !buttonAreaInstance) return;

  const toggleBtnRect = state.toggleButton?.getBoundingClientRect();
  const buttonAreaRect = state.buttonArea?.getBoundingClientRect();

  if (!toggleBtnRect || !buttonAreaRect) return;

  function createCover(rect: DOMRect) {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
    el.className = "transition-cover";
    document.body.append(el);
    return el;
  }

  const toggleCover = createCover(toggleBtnRect);
  const areaCover = createCover(buttonAreaRect);

  const common = { transformOrigin: "top left" } as const;

  if (!toggleCover || !areaCover) return;

  setTimeout(() => {
    calculatorStore.toggleMode();
  }, 300);

  // Toggle button and button area fade out, then fade in after the cover animation completes

  animate(toggleBtnInstance, {
    opacity: [
      { from: 1, to: 0, duration: 200, delay: 0 },
      { from: 0, to: 1, duration: 200, delay: 500 },
    ],
  });

  animate(buttonAreaInstance, {
    opacity: [
      { from: 1, to: 0, duration: 200, delay: 0 },
      { from: 0, to: 1, duration: 200, delay: 500 },
    ],
  });

  // Animate the covers to create a morphing effect between the toggle button and the button area
  animate(toggleCover, {
    ...common,
    opacity: [
      { from: 0, to: 1, duration: 200, delay: 0 },
      { from: 1, to: 0, duration: 200, delay: 500 },
    ],
    translateX: {
      to: buttonAreaRect.left - toggleBtnRect.left,
      duration: 400,
      delay: 100,
    },
    translateY: {
      to: buttonAreaRect.top - toggleBtnRect.top,
      duration: 400,
      delay: 100,
    },
    scaleX: {
      to: buttonAreaRect.width / toggleBtnRect.width,
      duration: 400,
      delay: 100,
    },
    scaleY: {
      to: buttonAreaRect.height / toggleBtnRect.height,
      duration: 400,
      delay: 100,
    },
    onComplete: () => toggleCover.remove(),
  });

  animate(areaCover, {
    ...common,
    opacity: [
      { from: 0, to: 1, duration: 200, delay: 0 },
      { from: 1, to: 0, duration: 200, delay: 500 },
    ],
    translateX: {
      to: toggleBtnRect.left - buttonAreaRect.left,
      duration: 400,
      delay: 100,
    },
    translateY: {
      to: toggleBtnRect.top - buttonAreaRect.top,
      duration: 400,
      delay: 100,
    },
    scaleX: {
      to: toggleBtnRect.width / buttonAreaRect.width,
      duration: 400,
      delay: 100,
    },
    scaleY: {
      to: toggleBtnRect.height / buttonAreaRect.height,
      duration: 400,
      delay: 100,
    },
    onComplete: () => areaCover.remove(),
  });
}
