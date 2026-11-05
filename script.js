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
document.getElementById("listingForm").addEventListener("submit",e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);
 const phone=(data.get("phone")||"").replace(/\D/g,"");
 const message=`Namaste Sitamarhi Bazar! I want to list my business.%0A%0ABusiness: ${encodeURIComponent(data.get("business"))}%0AOwner: ${encodeURIComponent(data.get("owner"))}%0APhone: ${encodeURIComponent(data.get("phone"))}%0ACategory: ${encodeURIComponent(data.get("category"))}%0AArea: ${encodeURIComponent(data.get("area"))}`;
 const adminNumber=""; 
 if(!adminNumber){alert("Website setup note: add your Sitamarhi Bazar WhatsApp number in script.js (adminNumber) before publishing. Your details have not been sent.");return;}
 window.open(`https://wa.me/${adminNumber}?text=${message}`,"_blank","noopener");
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
