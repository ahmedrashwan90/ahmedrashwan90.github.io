import { defineConfig } from 'astro/config';
const base=process.env.BASE_PATH||'/';
const site=process.env.SITE_URL||undefined;
export default defineConfig({site,base,trailingSlash:'always',build:{assets:'_astro'}});
