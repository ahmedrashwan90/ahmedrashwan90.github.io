const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=[];
function read(f){return fs.readFileSync(path.join(root,f),'utf8').replace(/^\uFEFF/,'')}
function blocks(md,re){return md.split(re).slice(1)}
const city=read('01-city-pumps/captions/city-pumps-captions.md');
for(const block of blocks(city,/^## Image \d+ — /m)){
 const first=block.match(/^([^\r\n]+)/)?.[1]??''; const sourceMatch=block.match(/\[Original post\]\((https?:[^)]+)\)/); if(!sourceMatch)continue;
 const file=first.replace(/-original(?=\.)/,'').replace(/\.png$/i,'.jpeg');
 const after=block.slice(sourceMatch.index+sourceMatch[0].length).replace(/^\r?\n\r?\n/,'');
 if(file&&after.trim())out.push({project:'city-pumps',file,text:after.trim(),source:sourceMatch[1],sourceLabel:'original'});
}
const retail=read('02-el-samah-retail/captions/el-samah-retail-captions.md');
for(const block of blocks(retail,/^## \d+\. /m)){
 const file=block.match(/التصميم: `([^`]+)`/)?.[1];const design=block.match(/التصميم: `[^`]+`/); if(!file||!design)continue;
 let caption=block.slice(design.index+design[0].length).replace(/^\r?\n\r?\n/,'').trim();caption=caption.replace(/\r?\n#مؤسسة_السماح[\s\S]*$/,'').trim();
 if(caption)out.push({project:'el-samah-retail',file,text:caption,source:'https://www.facebook.com/ElSamahForWaterPumps',sourceLabel:'brand'});
}
const gym=read('05-uptown-mass-gym/captions/facebook-2022.md');
for(const block of blocks(gym,/^## \d+\. /m)){
 const file=block.match(/\*\*الصورة:\*\* `\.\.\/designs\/([^`]+)`/)?.[1],source=block.match(/\*\*المنشور:\*\* (https?:\S+)/)?.[1]; if(!file||!source)continue;
 const idx=block.indexOf(source),caption=block.slice(idx+source.length).replace(/^\r?\n\r?\n/,'').trim();if(caption)out.push({project:'uptown-mass-gym',file,text:caption,source,sourceLabel:'original'});
}
// Beauty Life: numbered posts in captions/README.md, matched visually to designs. Unmatched posts and reels are skipped.
const beautyMap={1:"q-switch-tattoo.jpeg",3:"olidia-collagen.jpeg",5:"rich-p-skin-booster.jpeg",7:"new-year-50.jpeg",9:"candela-right-place.jpeg",10:"jawline-lips-chin-filler.jpeg",11:"black-friday-50.jpeg"};
const beauty=read("03-beauty-life-clinics/captions/README.md");
for(const block of blocks(beauty,/^## (?=\d+\. )/m)){
 const n=Number(block.match(/^(\d+)\./)?.[1]),file=beautyMap[n],source=block.match(/\*\*الرابط:\*\* (https?:\S+)/)?.[1]; if(!file||!source)continue;
 let caption=block.slice(block.indexOf(source)+source.length).trim();
 caption=caption.replace(/^.*انستا باي.*$\r?\n?/gm,'').trim(); // drop the third-party InstaPay payee line
 if(caption)out.push({project:'beauty-life-clinics',file,text:caption,source,sourceLabel:'original'});
}
const ad=read('06-el-samah-advertising/captions/README.md');
// One "## " section per post: **التصميم:** line, **رابط المنشور:** line, then "### الكابشن الأصلي".
for(const block of blocks(ad,/^## /m)){
 const file=block.match(/\*\*التصميم:\*\* `\.\.\/designs\/([^`]+)`/)?.[1],source=block.match(/\*\*رابط المنشور:\*\* (https?:\S+)/)?.[1];
 const caption=block.split(/^### الكابشن الأصلي\s*$/m)[1]?.trim();
 // Extra carousel slides shown inside the same post: **شرائح الكاروسيل:** `a.jpg` · `b.jpg`
 const slidesLine=block.match(/\*\*شرائح الكاروسيل:\*\*([^\n]+)/)?.[1]??'';
 const slides=[...slidesLine.matchAll(/`([^`]+)`/g)].map(m=>m[1]);
 if(file&&source&&caption)out.push({project:'el-samah-advertising',file,text:caption,source,sourceLabel:'original',...(slides.length?{slides}:{})});
}
fs.writeFileSync(path.join(__dirname,'src/data/captions.json'),JSON.stringify(out,null,2));console.log(`Caption source mappings: ${out.length}`);
