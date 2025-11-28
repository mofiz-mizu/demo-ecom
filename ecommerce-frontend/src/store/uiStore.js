import create from 'zustand'

export const useUIStore = create((set) => ({
  dark: localStorage.getItem('dark') === 'true' || false,
  toggleDark: () => set(state => {
    const next = !state.dark
    localStorage.setItem('dark', next)
    if (next) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    return { dark: next }
  }),
}))
