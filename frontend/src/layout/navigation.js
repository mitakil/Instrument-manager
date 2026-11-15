// This config files defines what pages are shown and what requires authorization.
// Not sure if this is in the final version but this is helping in the development to keep code cleaner

export const navigationConfig = {
  links: [
    { path: '/', label: 'Home' },
    { path: '/instruments', label: 'Instruments', requiresAuth: true },
  ],
}
