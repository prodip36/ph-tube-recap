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
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
    `
    category_container.appendChild(category_div);
  }
}

function displayVideos(videos){
   const display_videos = document.getElementById("display-videos");
    videos.forEach(video =>{
      console.log(video);
    })
}

loadCategories();
loadVideos();
