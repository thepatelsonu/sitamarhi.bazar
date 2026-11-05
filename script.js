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

const listingForm=document.getElementById("listingForm");
const listingStatus=document.getElementById("listingStatus");
const submitButton=listingForm.querySelector('button[type="submit"]');
listingForm.addEventListener("submit",async e=>{
 e.preventDefault();
 listingStatus.textContent="";
 listingStatus.className="form-status";
 if(!listingForm.reportValidity()) return;
 if(!window.sitamarhiBazarSupabase){
   listingStatus.textContent="The listing form is temporarily unavailable. Please try again later or contact our team.";
   listingStatus.classList.add("error");
   return;
 }
 const data=new FormData(listingForm);
 const payload={
   business_name:String(data.get("business")||"").trim(),
   owner_name:String(data.get("owner")||"").trim(),
   phone:String(data.get("phone")||"").trim(),
   category:String(data.get("category")||"").trim(),
   area:String(data.get("area")||"").trim()
 };
 submitButton.disabled=true;
 submitButton.textContent="Submitting...";
 listingStatus.setAttribute("aria-live","polite");
 try{
   const {error}=await window.sitamarhiBazarSupabase
     .from("merchant_listing_requests")
     .insert(payload);
   if(error) throw error;
   listingForm.reset();
   listingStatus.textContent="Thank you! Your listing request has been received. Our team will review it and contact you. Your shop is not live yet.";
   listingStatus.classList.add("success");
 }catch(error){
   console.error("Merchant listing submission failed:",error);
   listingStatus.textContent="We couldn't submit your request right now. Please check your internet connection and try again.";
   listingStatus.classList.add("error");
 }finally{
   submitButton.disabled=false;
   submitButton.textContent="Send listing request ↗";
 }
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
