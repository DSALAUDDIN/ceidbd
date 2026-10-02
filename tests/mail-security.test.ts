import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { seal,unseal,allowedAccount,validId,validMessage,parseZoho } from "../src/lib/mail-security.ts";
test("encrypted session rejects tampering and a different key",()=>{
 const key=randomBytes(32).toString("hex"),value=seal({refresh:"private-token"},key);
 assert.equal(value.includes("private-token"),false);
 assert.deepEqual(unseal(value,key),{refresh:"private-token"});
 assert.throws(()=>unseal(value,randomBytes(32).toString("hex")));
 const raw=Buffer.from(value,"base64url");raw[30]^=1;assert.throws(()=>unseal(raw.toString("base64url"),key));
});
test("only the real info mailbox is admitted, not aliases or external accounts",()=>{
 assert(allowedAccount({type:"ZOHO_ACCOUNT",primaryEmailAddress:"info@ceidbd.com",mailboxAddress:"info@ceidbd.com"}));
 assert(!allowedAccount({type:"IMAP_ACCOUNT",primaryEmailAddress:"info@ceidbd.com",mailboxAddress:"info@ceidbd.com"}));
 assert(!allowedAccount({type:"ZOHO_ACCOUNT",primaryEmailAddress:"other@ceidbd.com",mailboxAddress:"info@ceidbd.com"}));
});
test("IDs retain precision and reject path injection",()=>{
 assert.equal(parseZoho('{"messageId":1709876190693100009}').messageId,"1709876190693100009");
 assert(!validId("../accounts"));assert(validId("1709876190693100009"));
});
test("send validation rejects header injection, extra recipients and empty mail",()=>{
 const m={to:"recipient@example.com",subject:"A subject",content:"Hello"};
 assert(validMessage(m));assert(!validMessage({...m,to:"a@b.com,c@d.com"}));
 assert(!validMessage({...m,subject:"Hello\r\nBcc: someone@example.com"}));
 assert(!validMessage({...m,content:" "}));assert(!validMessage({...m,replyId:"../../bad"}));
});
