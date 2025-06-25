import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollToPlugin)

  return {
    provide: {
      gsap,
      ScrollToPlugin,
    },
  }
})
