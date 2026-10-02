// Run on the VPS after securely transferring .env.admin-mail to the project root.
import {readFile,writeFile,rename,unlink,chmod} from 'node:fs/promises';
const source='.env.admin-mail',target='.env.local';
const allowed=['ADMIN_ORIGIN','ZOHO_CLIENT_ID','ZOHO_CLIENT_SECRET','MAIL_SESSION_KEY'];
const lines=(await readFile(source,'utf8')).split(/\r?\n/);
const values=Object.fromEntries(lines.filter(line=>allowed.includes(line.split('=')[0])).map(line=>[line.slice(0,line.indexOf('=')),line.slice(line.indexOf('=')+1)]));
if(values.ADMIN_ORIGIN!=='https://ceidbd.com'||!values.ZOHO_CLIENT_ID||!values.ZOHO_CLIENT_SECRET||! /^[a-f0-9]{64}$/i.test(values.MAIL_SESSION_KEY||''))throw new Error('Mail configuration incomplete. No files changed.');
let previous='';try{previous=await readFile(target,'utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
const retained=previous.split(/\r?\n/).filter(line=>!allowed.includes(line.split('=')[0]));
const result=[...retained,...allowed.map(key=>`${key}=${values[key]}`),''].join('\n');
await writeFile('.env.mail-install.tmp',result,{mode:0o600});await chmod('.env.mail-install.tmp',0o600);await rename('.env.mail-install.tmp',target);await unlink(source);
console.log('Admin mail configuration installed privately. Rebuild and restart CEID to activate.');
