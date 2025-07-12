import { tv } from 'tailwind-variants'

const button = tv({
  slots: {
    base: 'rounded-lg h-9 px-4 flex items-center justify-center text-white text-sm duration-200 gap-2 relative overflow-hidden not-disabled:cursor-pointer',
    loading: 'absolute left-0 top-0 w-full h-full bg-inherit flex items-center justify-center',
  },
  variants: {
    variant: {
      primary: {
        base: 'bg-sky-500 not-disabled:hover:bg-sky-600',
      },
      secondary: {
        base: '',
      },
    },
  },
})

export default button
