

function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => (res.json()))
    .then((data) => (displayCategories(data.categories)) )
}

function displayCategories(data){
    const category_container=document.getElementById('category-container');

for(const item of data){
    
    const category_div=document.createElement('div');
    category_div.innerHTML=`
    <button class="btn btn-sm">${item.category}</button>
    `
    category_container.appendChild(category_div);
}
}




loadCategories();