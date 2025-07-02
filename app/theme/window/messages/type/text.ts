import { tv } from 'tailwind-variants'

const text = tv({
  slots: {
    root: 'max-w-[32rem] rounded-lg overflow-hidden py-2 px-3 text-sm [&>ul]:list-inside [&>ol]:list-inside [&>ul]:list-disc [&>ol]:list-decimal overflow-hidden select-none',
  },
  variants: {
    isOwn: {
      true: {
        root: 'bg-sky-500 text-white',
      },
      false: {
        root: 'bg-slate-100',
      },
    },
    isTemp: {
      true: {
        root: 'bg-sky-500/70',
      },
      false: {
        root: '',
      },
    },
  },
})

export default text
