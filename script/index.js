function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}
// load videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategories(data) {
  const category_container = document.getElementById("category-container");
  for (const item of data) {
    const category_div = document.createElement("div");
    category_div.innerHTML = `
    <button onclick="loadCategoryVideos(${item.category_id}) " class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `;
    category_container.appendChild(category_div);
  }
}
function loadCategoryVideos(id){
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
  .then(res=> res.json())
  .then(data=>displayVideos(data.category))
}
function displayVideos(videos) {
  const display_videos = document.getElementById("display-videos");
  display_videos.innerHTML='';
  if(videos.length==0) {
    display_videos.innerHTML = `
     <div class="flex flex-col gap-3 justify-center col-span-full py-5 text-center items-center">
        <img src="./resources/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>`;
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
            <p class="text text-gray-400 flex gap-1 items-center">${video.authors[0].profile_name} <img class="h-5 w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
            <p class="text text-gray-400">${video.others.views}</p>
          </div>
        </div>
      </div>
      `;
    display_videos.appendChild(div_videos);
  });
}

loadCategories();
// loadVideos();
