const loadCategoriesData = () =>{
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        showCategories(data.data.news_category)
    })
};

const showCategories = (data) =>{
    console.log(data);
    const LinkContainer = document.getElementById('link-container');
    data.forEach(categories => {
        //console.log(categories);
        const link = document.createElement('p');
        link.innerHTML = `<a class="nav-link" href="#" onclick = "showCategoryNews('${categories.category_id}', '${categories.category_name}')">${categories.category_name}</a>`
        LinkContainer.appendChild(link)
    });
};

const showCategoryNews = (category_id, category_name) =>{
    const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data =>{
        showAllCategoryNews(data.data.length, category_name);
    })
};

const showAllCategoryNews = (category_id, category_name) =>{
    console.log(category_id, category_name);
    const alertCategoryNumber = document.getElementById('news-count');
    alertCategoryNumber.innerText = category_id;
    const alertCategoryName = document.getElementById('category-name');
    alertCategoryName.innerText = category_name;
};


//loadCategoriesData();