import type { APIRoute } from 'astro';
import {basePath} from '../data/projects';
export const GET:APIRoute=({site})=>{
 const rules=`User-agent: *\nAllow: ${basePath('/')}\n`;
 const sitemap=site?`Sitemap: ${new URL(basePath('/sitemap.xml'),site).href}\n`:'';
 return new Response(rules+sitemap,{headers:{'content-type':'text/plain; charset=utf-8'}});
};
