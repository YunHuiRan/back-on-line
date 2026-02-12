import { defineStore } from 'pinia'

type instanceType =
    | "startParent"
    | "child"
    | "endParent"

export const userAnimationInstance = defineStore('animationInstance', {
    state: () => ({
        startParent: null as HTMLElement | null,
        child: null as HTMLElement | null,
        endParent: null as HTMLElement | null
    }),

    actions: {
        setAnimationInstance(instance: HTMLElement, type: instanceType): void {
            this[type] = instance;
            console.log(this.$state);

        }

    }
})