import { userAnimationInstance } from "@/store/useAnimationInstanceStore";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import { createTimeline } from "animejs";

/**
 * createTimelineAsync
 * -------------------
 * Create an anime.js timeline and a Promise that resolves when the
 * timeline completes. This helper exposes both the timeline instance and
 * a `finished` promise so callers can `await` the completion of animations.
 *
 * @returns {{ tl: import("animejs").AnimeTimelineInstance, finished: Promise<void> }}
 */
function createTimelineAsync(): {
  tl: ReturnType<typeof createTimeline>;
  finished: Promise<void>;
} {
  let resolve: () => void;

  const finished = new Promise<void>((r) => {
    resolve = r;
  });

  const tl = createTimeline({
    onComplete: () => {
      resolve();
    },
  });

  return { tl, finished };
}

/**
 * toggleCalculatorMode
 * --------------------
 * Animate a morphing transition between the small toggle button and the
 * large button area, then toggle the calculator display mode in the store.
 *
 * Implementation notes:
 * - We create two temporary "cover" elements that visually morph between the
 *   toggle button bounds and the button area bounds. These covers are animated
 *   using an anime.js timeline so all timing is coordinated in one place.
 * - The function reads DOM rectangles from reactive instances managed by the
 *   `userAnimationInstance` store. If any required instance or rect is missing
 *   the function will bail out early (no-op).
 * - Side effects:
 *   - Appends two `div.transition-cover` elements to `document.body`.
 *   - Removes the covers when their exit animations complete.
 *   - Calls `calculatorStore.toggleMode()` at the configured timeline point.
 *
 * @returns {Promise<boolean>}
 */
export async function toggleCalculatorMode(): Promise<boolean> {
  const { tl, finished } = createTimelineAsync();
  const state = userAnimationInstance().$state;
  const calculatorStore = useCalculatorStore();

  const toggleBtnInstance = state.toggleButton;
  const buttonAreaInstance = state.buttonArea;
  if (!toggleBtnInstance || !buttonAreaInstance) return true;

  const toggleBtnRect = state.toggleButton?.getBoundingClientRect();
  const buttonAreaRect = state.buttonArea?.getBoundingClientRect();

  if (!toggleBtnRect || !buttonAreaRect) return false;

  /**
   * createCover
   * Create a full-featured, fixed-position cover element that matches the
   * provided DOMRect. The element is appended to `document.body` and returned
   * to the caller so it can be animated and later removed.
   *
   * @param {DOMRect} rect - The rectangle (top/left/width/height) to match.
   * @returns {HTMLDivElement} The newly created cover element.
   */
  function createCover(rect: DOMRect): HTMLDivElement {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "fixed",
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      opacity: "0",
    });
    el.className = "transition-cover";
    document.body.append(el);
    return el;
  }

  // Create the two covers used to morph between the toggle button and the
  // button area. These are temporary DOM nodes that will be removed once the
  // transition completes.
  const toggleCover = createCover(toggleBtnRect);
  const areaCover = createCover(buttonAreaRect);

  // Common animation options reused for the morphing covers. `transformOrigin`
  // is set to `top left` so translate/scale operate relative to the rect
  // coordinates we computed above.
  const common = { transformOrigin: "top left" } as const;
  if (!toggleCover || !areaCover) return false;

  const DURATIONS = {
    fade: 200,
    morph: 500,
  } as const;

  // Animation timing configuration (milliseconds) reused across the
  // timeline to keep durations consistent and easy to adjust.

  const TIME_LINE_POINTS = {
    instanceFadeOut: 0, // start fading out the toggle button and button area
    coverFadeIn: 0, // start fading in the covers
    morphStart: 100, // start the morph/scale/translate animation
    toggleMode: 200, // call the store toggle at this timeline moment
    fadeIn: 600, // fade the UI elements back in after the morph
    coverFadeOut: 600, // fade the covers out and remove them
    instanceFadeIn: 500, // fade the toggle button and button area after the morph
  } as const;

  // Fade out the visible UI nodes (toggle button and button area)
  tl.add(
    [toggleBtnInstance, buttonAreaInstance],
    {
      opacity: [1, 0],
      duration: DURATIONS.fade,
    },
    TIME_LINE_POINTS.instanceFadeOut,
  );

  // Fade in the covers so the morph layers appear underneath the fading UI.
  tl.add(
    [toggleCover, areaCover],
    {
      opacity: [0, 1],
      duration: DURATIONS.fade,
    },
    TIME_LINE_POINTS.coverFadeIn,
  );

  // Morph the toggleCover to the button area's position+size.
  tl.add(
    toggleCover,
    {
      ...common,
      translateX: buttonAreaRect.left - toggleBtnRect.left,
      translateY: buttonAreaRect.top - toggleBtnRect.top,
      scaleX: buttonAreaRect.width / toggleBtnRect.width,
      scaleY: buttonAreaRect.height / toggleBtnRect.height,
      duration: DURATIONS.morph,
    },
    TIME_LINE_POINTS.morphStart,
  );

  // Simultaneously morph the areaCover back to the toggle button's
  // coordinates so both covers animate as a pair, producing a convincing
  // morphing effect.
  tl.add(
    areaCover,
    {
      ...common,
      translateX: toggleBtnRect.left - buttonAreaRect.left,
      translateY: toggleBtnRect.top - buttonAreaRect.top,
      scaleX: toggleBtnRect.width / buttonAreaRect.width,
      scaleY: toggleBtnRect.height / buttonAreaRect.height,
      duration: DURATIONS.morph,
    },
    TIME_LINE_POINTS.morphStart,
  );

  // At the configured timeline point call the store to toggle the calculator
  // mode. Placing this call inside the timeline (instead of a separate
  // setTimeout) guarantees the toggle occurs exactly when the timeline reaches
  // this anchor, even if the animations are later adjusted.
  tl.call(() => {
    calculatorStore.toggleMode();
  }, TIME_LINE_POINTS.toggleMode);

  // Fade the UI elements back in after the morph has completed so the new
  // layout appears naturally.
  tl.add(
    [toggleBtnInstance, buttonAreaInstance],
    {
      opacity: [0, 1],
      duration: DURATIONS.fade,
    },
    TIME_LINE_POINTS.fadeIn,
  );

  // Fade out the covers and remove them in the onComplete callback. Removing
  // the temporary DOM nodes here prevents leaving orphan elements in the DOM.
  tl.add(
    [toggleCover, areaCover],
    {
      opacity: [1, 0],
      duration: DURATIONS.fade,
      onComplete: () => {
        toggleCover.remove();
        areaCover.remove();
      },
    },
    TIME_LINE_POINTS.coverFadeOut,
  );

  tl.add(
    toggleBtnInstance,
    {
      opacity: [0, 1],
      translateY: {
        from: 50,
        to: 0,
      },
      duration: DURATIONS.fade,
    },
    TIME_LINE_POINTS.instanceFadeIn,
  );

  tl.add(
    buttonAreaInstance,
    {
      opacity: [0, 1],
      translateX: {
        from: -50,
        to: 0,
      },
      translateY: {
        from: -50,
        to: 0,
      },
      duration: DURATIONS.fade,
    },
    TIME_LINE_POINTS.instanceFadeIn,
  );

  await finished;

  return true;
}
