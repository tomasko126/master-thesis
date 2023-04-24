import { defineNuxtPlugin } from '#app';

import { library, config } from '@fortawesome/fontawesome-svg-core';
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

library.add(fas);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
  nuxtApp.vueApp.use(createVuestic());
});
