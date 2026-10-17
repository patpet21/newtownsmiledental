import {useEffect,useRef,useState} from 'react';
import type {FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Compass,MessageCircle,Send,X} from 'lucide-react';

type Destination={label:string;to:string};
type Reply={text:string;links:Destination[]};
type Entry={id:number;role:'visitor'|'guide';text:string;links?:Destination[]};
const shortcuts=[
 {label:'Projects',key:'projects'},{label:'PrivacyGate',key:'privacy'},
 {label:'PrivateStone',key:'privatestone'},{label:'PropertyDEX',key:'propertydex'},
 {label:'Websites',key:'websites'},{label:'Contact',key:'contact'}
];
function respond(value:string):Reply{
 const q=value.trim().toLowerCase();
 if(/privatestone|private stone|off.market|property request/.test(q))
  return {text:'PrivateStone is an in-development concept for off-market real-estate requests among verified professionals. It is not a public property-listing platform.',links:[{label:'PrivateStone case study',to:'/projects/privatestone'},{label:'All projects',to:'/projects'}]};
 if(/privacygate|privacy gate|privacy|sensitive|personal data|mcp|anonym/.test(q))
  return {text:'PrivacyGate explores local-first protection for sensitive data before sharing it with AI tools. The desktop app has been published; integrations are at various testing stages.',links:[{label:'PrivacyGate case study',to:'/projects/privacygate'},{label:'Contact',to:'/contact'}]};
 if(/propertydex|blockchain|token|framework|web3|fractional/.test(q))
  return {text:'PropertyDEX and the Framework explore real-estate structuring, decision-support workflows and tokenization concepts. These are research and prototype projects, not an active token marketplace.',links:[{label:'PropertyDEX',to:'/projects/propertydex'},{label:'Framework',to:'/projects/propertydex-framework'}]};
 if(/websites|website|site|villa|booking|web design/.test(q))
  return {text:'The web-design case study features business, booking and hospitality website concepts. It contains demonstrations and prototypes, not unverified client results.',links:[{label:'Websites & booking',to:'/projects/websites'},{label:'Services',to:'/services'}]};
 if(/lead|automat|email|inbox/.test(q))
  return {text:'Lead Rescue is an experimental workflow for identifying enquiries and response gaps. It is a prototype, not a validated commercial service.',links:[{label:'Lead Rescue',to:'/projects/lead-rescue'}]};
 if(/learning|course|education|pdf|prompt|lab/.test(q))
  return {text:'The learning case study includes a course-platform prototype and the separate AI PM Lab resource site.',links:[{label:'Learning & AI PM Lab',to:'/projects/e-learning'}]};
 if(/management|coordination|operation|retail|vendor/.test(q))
  return {text:'Project and operations experience includes vendor coordination, technical improvements and process structuring.',links:[{label:'Retail IT case study',to:'/projects/retail-it'},{label:'Services',to:'/services'}]};
 if(/contact|collaborat|meeting|call|hire|talk/.test(q))
  return {text:'For a project enquiry or collaboration, use the contact form. This guide cannot book a meeting and does not send messages to the portfolio owner.',links:[{label:'Contact form',to:'/contact'},{label:'Services',to:'/services'}]};
 if(/about|who|background|experience/.test(q))
  return {text:'The portfolio documents digital products, project coordination, process improvement and technology research.',links:[{label:'About',to:'/about'},{label:'Projects',to:'/projects'}]};
 if(/project|work|explore|start|home/.test(q))
  return {text:'Explore eight real case studies across privacy software, real estate technology, websites, automation, operations and research. Each project has its own detail page.',links:[{label:'All projects',to:'/projects'},{label:'PrivacyGate',to:'/projects/privacygate'},{label:'PrivateStone',to:'/projects/privatestone'}]};
 return {text:'I am a preset navigation guide, not an AI or live chat. Choose a topic below, or type a project name such as PrivacyGate, PrivateStone or PropertyDEX.',links:[{label:'All projects',to:'/projects'},{label:'Contact',to:'/contact'}]};
}
export default function PortfolioGuide(){
 const [open,setOpen]=useState(false);
 const [inputValue,setInputValue]=useState('');
 const [entries,setEntries]=useState<Entry[]>([{id:0,role:'guide',text:'Welcome! I can guide you to relevant projects and pages using predefined answers. No AI or live operator. Where would you like to go?'}]);
 const nextId=useRef(1),input=useRef<HTMLInputElement|null>(null),scrollbox=useRef<HTMLDivElement|null>(null);
 useEffect(()=>{
  if(!open)return;
  input.current?.focus();
  const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
  document.addEventListener('keydown',close);
  return()=>document.removeEventListener('keydown',close);
 },[open]);
 useEffect(()=>{
  if(open&&scrollbox.current)scrollbox.current.scrollTop=scrollbox.current.scrollHeight;
 },[entries,open]);
 const ask=(question:string,topic?:string)=>{
  const cleaned=question.trim().slice(0,160);if(!cleaned)return;
  const answer=respond(topic||cleaned);
  const id=nextId.current;nextId.current+=2;
  setEntries(prev=>[...prev.slice(-22),{id,role:'visitor',text:cleaned},{id:id+1,role:'guide',text:answer.text,links:answer.links}]);
  setInputValue('');
 };
 const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();ask(inputValue);};
 return <aside className="pf-guide">
  {open&&<section id="pf-guide-panel" className="pf-guide-panel" aria-label="Portfolio navigation guide">
   <header className="pf-guide-head">
    <span className="pf-guide-symbol"><Compass size={20}/></span>
    <span className="pf-guide-heading"><strong>Portfolio Guide</strong><small>PRESET ANSWERS · NO AI</small></span>
    <button type="button" className="pf-guide-close" aria-label="Close guide" onClick={()=>setOpen(false)}><X size={19}/></button>
   </header>
   <div className="pf-guide-messages" role="log" aria-live="polite" aria-relevant="additions" ref={scrollbox}>
    {entries.map(item=><div className={'pf-guide-bubble '+(item.role==='visitor'?'pf-guide-visitor':'pf-guide-response')} key={item.id}>
     <p>{item.text}</p>
     {item.links&&<div className="pf-guide-destinations">{item.links.map(link=><Link to={link.to} key={link.to} onClick={()=>setOpen(false)}>{link.label}<ArrowUpRight size={13}/></Link>)}</div>}
    </div>)}
   </div>
   <div className="pf-guide-shortcuts" aria-label="Quick topics">{shortcuts.map(t=><button key={t.key} type="button" onClick={()=>ask(t.label,t.key)}>{t.label}</button>)}</div>
   <form className="pf-guide-compose" onSubmit={submit}>
    <label htmlFor="pf-guide-question" className="pf-guide-visually-hidden">Ask about a portfolio topic</label>
    <input id="pf-guide-question" ref={input} value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder="Ask about a project..." maxLength={160} autoComplete="off"/>
    <button type="submit" aria-label="Submit question" disabled={!inputValue.trim()}><Send size={18}/></button>
   </form>
   <p className="pf-guide-disclosure">Local keyword guide. No AI, database or stored conversation.</p>
  </section>}
  <button type="button" className={'pf-guide-trigger '+(open?'pf-guide-trigger-open':'')} aria-expanded={open}
   aria-controls={open?'pf-guide-panel':undefined} onClick={()=>setOpen(v=>!v)}>
   {open?<X size={20}/>:<MessageCircle size={20}/>}<span>{open?'Close guide':'Explore with me'}</span>
  </button>
 </aside>;
}
