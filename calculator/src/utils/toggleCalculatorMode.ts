import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { animate } from "animejs";

export function toggleCalculatorMode() {
  const state = userAnimationInstance().$state;
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

  const common = { duration: 500, transformOrigin: "top left" } as const;

  animate(toggleCover, {
    translateX: buttonAreaRect.left - toggleBtnRect.left,
    translateY: buttonAreaRect.top - toggleBtnRect.top,
    scaleX: buttonAreaRect.width / toggleBtnRect.width,
    scaleY: buttonAreaRect.height / toggleBtnRect.height,
    opacity: [0.5, 1],
    ...common,
    // complete: () => toggleCover.remove(),
  });

  animate(areaCover, {
    translateX: toggleBtnRect.left - buttonAreaRect.left,
    translateY: toggleBtnRect.top - buttonAreaRect.top,
    scaleX: toggleBtnRect.width / buttonAreaRect.width,
    scaleY: toggleBtnRect.height / buttonAreaRect.height,
    opacity: [0, 1],
    ...common,
    // complete: () => areaCover.remove(),
  });
}
