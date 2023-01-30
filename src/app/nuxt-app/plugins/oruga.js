import { defineNuxtPlugin } from '#app';
import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';

import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

library.add(far, fas);

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
    nuxtApp.vueApp.use(Oruga, {
        ...bulmaConfig,
        iconComponent: 'font-awesome-icon',
        iconPack: 'fas',
    });
});
