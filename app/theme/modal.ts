import { tv } from 'tailwind-variants'

const modal = tv({
  slots: {
    base: 'w-full h-full fixed top-0 left-0 bg-black/20 z-[60] grid place-items-center',
    container: 'bg-white w-[522px] rounded-lg shadow-xl divide-y overflow-hidden divide-neutral-200',
    header: 'p-6 font-semibold',
    body: 'p-6',
    footer: 'p-6',
  },
})

export default modal
