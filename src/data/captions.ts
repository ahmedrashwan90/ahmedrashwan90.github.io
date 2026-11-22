import captions from './captions.json';
export const sampleCaption=(project:string,file:string)=>captions.find((c:{project:string;file:string})=>c.project===project&&c.file===file);
