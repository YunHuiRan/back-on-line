import { defineStore } from 'pinia'

type instanceType =
    | "toggleButton"
    | "buttonArea"

export const userAnimationInstance = defineStore('animationInstance', {
    state: () => ({
        toggleButton: null as HTMLElement | null,
        buttonArea: null as HTMLElement | null,
    }),

    actions: {
        setAnimationInstance(instance: HTMLElement, type: instanceType): void {
            this[type] = instance;
        }
    }
})