import { supabase } from "./supabase-client.js";

const demoBusinesses = [
 {name:"Rangrez Fashion House",category:"Fashion",area:"Sitamarhi Town",emoji:"👗",desc:"Everyday wear, ethnic styles and festive collections.",phone:"",wa:""},
 {name:"Mithila Sweets & Bakers",category:"Food",area:"Dumra",emoji:"🍰",desc:"Sweets, bakery treats and celebration orders.",phone:"",wa:""},
 {name:"City Mobile Hub",category:"Electronics",area:"Sitamarhi Town",emoji:"📱",desc:"Smartphones, accessories and repair enquiries.",phone:"",wa:""},
 {name:"Shree Jewellery House",category:"Jewellery",area:"Sitamarhi Town",emoji:"💎",desc:"Jewellery collections and gifting options.",phone:"",wa:""},
 {name:"Apna Home Decor",category:"Home",area:"Dumra",emoji:"🛋️",desc:"Furniture and home furnishing enquiries.",phone:"",wa:""},
 {name:"SmartFix Services",category:"Services",area:"Dumra",emoji:"🛠️",desc:"Local repair and home-service enquiries.",phone:"",wa:""}
];
let activeCategory="All", query="";
const grid=document.getElementById("businessGrid"), empty=document.getElementById("emptyState");
function render(){
 const area=document.getElementById("areaFilter").value;
 const list=demoBusinesses.filter(b=>(activeCategory==="All"||b.category===activeCategory)&&(area==="All"||b.area===area)&&(`${b.name} ${b.category} ${b.area} ${b.desc}`.toLowerCase().includes(query)));
 grid.innerHTML=list.map(b=>`<article class="business-card"><div class="business-visual ${b.category.toLowerCase()}"><span class="sample-tag">DEMO PREVIEW</span>${b.emoji}</div><div class="business-body"><div class="business-meta"><span>${b.category}</span><span>📍 ${b.area}</span></div><h3>${b.name}</h3><p>${b.desc}</p><div class="business-actions"><a href="#list-business">Enquire</a><a href="#list-business">View details</a></div></div></article>`).join("");
 empty.hidden=list.length!==0;
}
document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;document.querySelectorAll("[data-category]").forEach(x=>x.classList.toggle("active",x===btn));document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("selected",x.dataset.filter===activeCategory));render();document.getElementById("discover").scrollIntoView({behavior:"smooth"});}));
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("selected",x===btn));document.querySelectorAll("[data-category]").forEach(x=>x.classList.toggle("active",x.dataset.category===activeCategory));render();}));
document.getElementById("areaFilter").addEventListener("change",render);
document.getElementById("searchButton").addEventListener("click",()=>{query=document.getElementById("searchInput").value.trim().toLowerCase();render();document.getElementById("discover").scrollIntoView({behavior:"smooth"});});
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("searchButton").click();});
document.getElementById("listingForm").addEventListener("submit", async (e) => {
 e.preventDefault();
 const formElement=e.currentTarget, data=new FormData(formElement);
 const message=document.getElementById("listingMessage");
 const button=formElement.querySelector('button[type="submit"]');
 const show=(text,isError=false)=>{message.textContent=text;message.style.color=isError?"#b42318":"#176b45";};
 button.disabled=true;button.textContent="Creating account...";
 const { data: result, error } = await supabase.auth.signUp({
   email:String(data.get("email")).trim(),
   password:String(data.get("password")),
   options:{
     data:{
       business_name:String(data.get("business")).trim(),
       owner_name:String(data.get("owner")).trim(),
       phone:String(data.get("phone")).trim(),
       category:String(data.get("category")),
       area:String(data.get("area"))
     },
     emailRedirectTo:`${window.location.origin}/merchant-dashboard.html`
   }
 });
 if(error){
   show(error.message,true);button.disabled=false;button.textContent="Create account & submit listing ↗";return;
 }
 formElement.reset();
 if(result.session){
   show("Registration submitted. Your business is pending review. Opening your dashboard...");
   window.location.href="merchant-dashboard.html";
 }else{
   show("Registration received. Please check your email and confirm your address before signing in. Your business listing is pending review.");
   button.textContent="Registration submitted";
 }
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
