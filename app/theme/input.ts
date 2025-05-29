import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    root: 'flex items-center top-0 sticky text-slate-400',
    base: 'w-full pl-(--height) h-(--height) pr-3 bg-slate-100 border-slate-200 rounded-lg outline-none text-sm placeholder:text-slate-400 font-normal text-slate-900 duration-200',
    icon: 'absolute top-0 left-0 h-full aspect-square grid place-items-center pointer-events-none',
  },
  variants: {
    size: {
      small: {
        root: '[--height:32px]',
      },
      medium: {
        root: '[--height:40px]',
      },
      large: {
        root: '[--height:48px]',
      },
    },
    icon: {
      true: { base: 'pl-(--height)' },
      false: { base: 'pl-3' },
    },

    // TODO: Change to compoundVariants and add the `highlight` variant
    color: {
      primary: {
        base: 'ring-[1.5px] ring-inset ring-transparent focus:ring-sky-500',
      },
      error: {
        base: 'ring ring-red-500',
      },
    },
  },
})

export default input
