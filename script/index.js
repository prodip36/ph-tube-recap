function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
// load videos
function loadVideos(input="") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}
const loadVideoDetails=(videoId)=>{
  url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  // console.log(url);
  fetch(url)
  .then(res=>res.json())
  .then(data=> displayVideoDescription(data.video))
}
const displayVideoDescription=(video)=>{
  console.log(video);

  const details_container = document.getElementById("details-container");
  details_container.innerHTML="";
  const details =document.createElement('div');
  details.innerHTML = `
  <div class="rounded-lg bg-base-100 image-full shadow-sm item-center justify-center">
  <figure>
    <img class="h-full w-full opacity-80"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
   
  </div>
</div>
  
  `;
  details_container.appendChild(details);
    document.getElementById("video_details").showModal();
}
function removeActiveClass() {
  const active_button = document.getElementsByClassName("active");
  for (let btn of active_button) {
    btn.classList.remove("active");
  }
}
function displayCategories(data) {
  const category_container = document.getElementById("category-container");
  for (const item of data) {
    const category_div = document.createElement("div");
    category_div.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id}) " class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `;
    category_container.appendChild(category_div);
  }
}
function loadCategoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickedButton = document.getElementById(`btn-${id}`);
      console.log(clickedButton);
      removeActiveClass();
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
}
function displayVideos(videos) {
  const display_videos = document.getElementById("display-videos");
  display_videos.innerHTML = "";
  if (videos.length == 0) {
    display_videos.innerHTML = `
     <div class="flex flex-col gap-3 justify-center col-span-full py-5 text-center items-center">
        <img src="./resources/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>`;
    return;
  }
  videos.forEach((video) => {
    const div_videos = document.createElement("div");
    div_videos.innerHTML = `
    <div class="card bg-base-100">
        <figure class="relative h-[200px]">
          <img
            src="${video.thumbnail}"
            alt="Shoes"
            class="h-full w-full rounded-xl"
          />
          <span
            class="absolute bottom-2 right-2 bg-black text-white text-sm rounded px-1"
          >
            3hrs 56 min ago
          </span>
        </figure>
        <div class="flex gap-3 py-5">
          <!-- profile pic -->
          <div class="">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-10 rounded-full">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <!-- description --> 
          <div class=" space-y-3">
            <h2 class="font-bold text-xl">${video.title}</h2>
            <p class="text text-gray-400 flex gap-1 items-center">${
              video.authors[0].profile_name
            }
            ${
              video.authors[0].verified == true
                ? '<img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""> ' : ""
            }
            
            </p>
            <p class="text text-gray-400">${video.others.views}</p>
          </div>
        </div>
        <button  onclick=loadVideoDetails('${
          video.video_id
        }') class="btn btn-block">Show Details</button>
      </div>
      `;
    display_videos.appendChild(div_videos);
  });
}
document.getElementById('search-input').addEventListener("keyup",(event)=>{
  const input=event.target.value;
  loadVideos(input);
})


//videos sorting section
document.getElementById("sort-videos").addEventListener("click",(event)=>{
 const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
 fetch(url)
 .then(res=>res.json())
 .then(data=>loadSortData(data.videos))
//  const active_btn=document.getElementsByClassName('active');
// console.log(active_btn);
});
//load sort data func
const loadSortData=(videos)=>{
  videos.sort(
    (a, b) => parseViews(b.others.views) - parseViews(a.others.views)
  );
  displayVideos(videos);
}
//converting view to numeric
function parseViews(strView){
  if(!strView) return 0;
  const clean=strView.replace(/,/g,'').toUpperCase();
  const num=parseFloat(clean);
  if(clean.includes('K')) return num*1000;
  if(clean.includes('M')) return num*1000000;
  if(clean.includes('B')) return num*1000000000;
  
}
loadCategories();
loadVideos();
