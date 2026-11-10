const tools = {
  caption: {title:"Caption Creator", category:"CREATOR TOOL · 01", desc:"Describe your post and choose a style. Get a few caption ideas to personalise.", label:"What's your post about?", placeholder:"Example: sunset photos with friends...", generate:makeCaptions},
  youtube: {title:"YouTube Title Lab", category:"CREATOR TOOL · 02", desc:"Enter your video topic to create clear, clickable title ideas.", label:"What's your video about?", placeholder:"Example: a beginner's guide to video editing...", generate:makeTitles},
  bio: {title:"Bio Builder", category:"WRITING TOOL · 03", desc:"Share a few details about yourself and get short profile bio options.", label:"Tell us about yourself", placeholder:"Example: student, football fan, learning video editing...", generate:makeBios},
  notes: {title:"Study Notes Helper", category:"STUDY TOOL · 04", desc:"Create a revision outline from a topic. Check important facts against your textbook.", label:"Enter your subject and topic", placeholder:"Example: Class 10 Science — Light: Reflection and Refraction...", generate:makeNotes},
  hashtags: {title:"Hashtag Mixer", category:"CREATOR TOOL · 05", desc:"Get a starter set of topic-related hashtags for your social post.", label:"What's your post about?", placeholder:"Example: travel photography in Udaipur...", generate:makeHashtags},
  image: {title:"Image Prompt Maker", category:"WRITING TOOL · 06", desc:"Describe the image you imagine and turn it into a more detailed art prompt.", label:"Describe the image you want", placeholder:"Example: a small village beside a mountain lake...", generate:makeImagePrompt}
};
const $ = s => document.querySelector(s);
const grid = $("#toolGrid"), search = $("#searchInput");
let activeFilter = "All", activeTool = null, latestResult = "";

function clean(s){return s.trim().replace(/\s+/g," ")}
function sentence(s){s=clean(s);return s ? s[0].toUpperCase()+s.slice(1).replace(/[.!?]+$/,"") : "your idea"}
function pick(arr, seed=0){return arr[Math.abs(seed)%arr.length]}
function seedOf(s){return [...s].reduce((a,c)=>a+c.charCodeAt(0),0)}
function makeCaptions(topic,tone){
 const t=sentence(topic), n=seedOf(topic+tone);
 const sets={
 Friendly:[`A little moment, a lot to remember. ${t}. ✨`,`Good days are made of little things — like this. ${t} 💜`,`Keeping this one close. ${t} 🤍`],
 Funny:[`Proof that I occasionally leave the house. ${t} 😂`,`No context, just good vibes and ${t.toLowerCase()}.`,`Adding this to my very important collection of random moments. ${t}.`],
 Professional:[`A moment worth sharing: ${t}.`,`A fresh perspective and a new memory — ${t}.`,`Sharing a little highlight from today: ${t}.`],
 Minimal:[`${t}. Less, but better.`,`Little things. Big memories. ${t}.`,`Just this moment. ${t}.`],
 Aesthetic:[`Somewhere between a dream and a memory — ${t}. ☁️`,`Soft moments, lasting memories. ${t}. ✨`,`A frame full of feeling: ${t}. 🕊️`]};
 return pick(sets[tone]||sets.Friendly,n)+"\n\n"+pick(sets[tone]||sets.Friendly,n+1)+"\n\n"+pick(sets[tone]||sets.Friendly,n+2);
}
function makeTitles(topic,tone){
 const t=sentence(topic),n=seedOf(topic+tone);
 const templates={
 Friendly:[`Let's explore ${t}`,`${t}: A simple guide to get started`,`I tried ${t} — here's what I learned`],
 Funny:[`${t}... what could possibly go wrong?`,`I wasn't ready for ${t}!`,`Trying ${t} so you don't have to`],
 Professional:[`${t}: Complete Beginner's Guide`,`How to Understand ${t} | Step-by-Step`,`Everything to Know About ${t}`],
 Minimal:[`${t} in a nutshell`,`A quick guide to ${t}`,`Understanding ${t}`],
 Aesthetic:[`A little journey into ${t} ✦`,`The art of ${t} | Let's begin`,`Making sense of ${t} ☁️`]};
 return (templates[tone]||templates.Friendly).map((x,i)=>(i+1)+". "+x).join("\n");
}
function makeBios(info,tone){
 const t=sentence(info),n=seedOf(info+tone);
 const sets={
 Friendly:[`Just someone who loves ${t.toLowerCase()} 💜\nLearning, growing & enjoying the little things ✨`,`Here for good vibes and new ideas.\n${t} | One day at a time 🌱`],
 Funny:[`Part-time overthinker. Full-time ${t.toLowerCase()} 😅\nPowered by snacks and big ideas.`,`Currently figuring life out.\nAlso into ${t.toLowerCase()}.`],
 Professional:[`${t}.\nFocused on learning, creating and improving every day.`,`Interested in ${t}.\nAlways learning. Always building.`],
 Minimal:[`${t}.\nKeep it simple. ✦`,`Learning. Creating. ${t}.`],
 Aesthetic:[`${t} ☁️\nCollecting moments, not perfection.`,`A curious mind with a creative side.\n${t} ✨`]};
 return pick(sets[tone]||sets.Friendly,n)+"\n\n"+pick(sets[tone]||sets.Friendly,n+1);
}
function makeNotes(topic){
 const t=sentence(topic);
 return `REVISION OUTLINE: ${t}\n\n1. START HERE\n• Write a one-sentence definition of the topic.\n• List the main ideas and vocabulary from your textbook.\n\n2. KEY POINTS TO REVIEW\n• Identify the most important concepts.\n• Note any formulas, dates, names or examples that apply.\n• Add one textbook example for each major idea.\n\n3. CHECK YOUR UNDERSTANDING\n• Can you explain the topic in your own words?\n• Can you solve one related question without looking?\n• Which part needs another review?\n\n4. QUICK REVISION\n• Review your class notes and textbook.\n• Make 3 flashcards for difficult terms.\n• Practise a few questions.\n\nNote: This is a study outline, not verified subject content. Check facts and syllabus details against your textbook or teacher's notes.`;
}
function makeHashtags(topic,tone){
 const words=clean(topic).toLowerCase().replace(/[^a-z0-9\s]/g," ").split(/\s+/).filter(w=>w.length>2);
 const unique=[...new Set(words)].slice(0,5);
 const tags=unique.map(w=>"#"+w.replace(/[^a-z0-9]/g,""));
 const extras={Friendly:["#goodvibes","#dailyinspiration","#moments"],Funny:["#justforfun","#relatable","#goodtimes"],Professional:["#creativework","#newideas","#community"],Minimal:["#instadaily","#simplemoments","#inspiration"],Aesthetic:["#aesthetic","#visualdiary","#dreamy"]};
 return [...tags,...(extras[tone]||extras.Friendly),"#VYNOX"].join("  ");
}
function makeImagePrompt(topic,tone){
 const mood={Friendly:"warm, inviting and natural",Funny:"playful, imaginative and full of personality",Professional:"polished, balanced and editorial",Minimal:"minimal, clean and uncluttered",Aesthetic:"dreamy, atmospheric and visually poetic"}[tone]||"visually engaging";
 return `Create an image of ${clean(topic)}.\n\nVisual direction: ${mood}. Use thoughtful composition, clear focal point, rich but balanced lighting, cohesive colours, realistic textures and carefully considered background details. Keep the main subject easy to understand. High visual quality, refined details, pleasing depth and a strong overall composition.\n\nAvoid: messy composition, unreadable text, distorted objects, unnecessary clutter and watermarks.`;
}
function renderTools(){
 const q=search.value.toLowerCase().trim();
 let shown=0;
 [...grid.children].forEach(card=>{
  const matchCat=activeFilter==="All"||card.dataset.category===activeFilter;
  const matchText=(card.dataset.search+" "+card.innerText).toLowerCase().includes(q);
  card.hidden=!(matchCat&&matchText);if(!card.hidden)shown++;
 });
 $("#emptyState").hidden=shown!==0;
}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
 btn.classList.add("active");activeFilter=btn.dataset.filter;renderTools();
}));
search.addEventListener("input",renderTools);
function openTool(key){
 activeTool=tools[key];if(!activeTool)return;
 $("#modalEyebrow").textContent=activeTool.category;
 $("#modalTitle").textContent=activeTool.title;
 $("#modalDescription").textContent=activeTool.desc;
 $("#inputLabel").textContent=activeTool.label;
 $("#toolInput").placeholder=activeTool.placeholder;
 $("#toolInput").value="";$("#resultWrap").hidden=true;
 $("#modalBackdrop").hidden=false;document.body.style.overflow="hidden";
 setTimeout(()=>$("#toolInput").focus(),50);
}
function closeTool(){ $("#modalBackdrop").hidden=true;document.body.style.overflow=""; }
document.querySelectorAll(".open-tool").forEach(b=>b.addEventListener("click",()=>openTool(b.dataset.tool)));
$("#modalClose").addEventListener("click",closeTool);
$("#modalBackdrop").addEventListener("click",e=>{if(e.target===$("#modalBackdrop"))closeTool()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modalBackdrop").hidden)closeTool()});
$("#toolForm").addEventListener("submit",e=>{
 e.preventDefault();const input=clean($("#toolInput").value);if(!input)return;
 const tone=$("#toneSelect").value;
 latestResult=activeTool.generate(input,tone);
 $("#resultText").textContent=latestResult;$("#resultWrap").hidden=false;
});
$("#copyButton").addEventListener("click",async()=>{
 try{await navigator.clipboard.writeText(latestResult);$("#copyButton").textContent="Copied ✓";}
 catch{const range=document.createRange();range.selectNodeContents($("#resultText"));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);$("#copyButton").textContent="Select and copy";}
 setTimeout(()=>$("#copyButton").textContent="Copy result ↗",1800);
});
$("#year").textContent=new Date().getFullYear();
