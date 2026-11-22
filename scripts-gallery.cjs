const fs = require('node:fs');
const path = require('node:path');
const project = __dirname;
const root = path.join(project,'src/assets');
const ids = ['city-pumps','el-samah-retail','beauty-life-clinics','heba-sager-beauty','uptown-mass-gym','el-samah-advertising'];
const output = Object.fromEntries(ids.map(id => {
 const dir = path.join(root,id,'designs');
 const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(f => ({ file:f })) : [];
 return [id,files];
}));
fs.writeFileSync(path.join(project,'src/data/gallery.json'), JSON.stringify(output,null,2));
