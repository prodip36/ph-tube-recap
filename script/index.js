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
    `;
    category_container.appendChild(category_div);
  }
}

function displayVideos(videos) {
  const display_videos = document.getElementById("display-videos");
  videos.forEach((video) => {
    const div_videos = document.createElement("div");
    div_videos.innerHTML = `
      <div class="card bg-base-100 shadow-sm ">
  <figure class="px-10 pt-10">
    <img class="h-44 w-64"
      src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
      `;
    display_videos.appendChild(div_videos);
  });
}

loadCategories();
loadVideos();
