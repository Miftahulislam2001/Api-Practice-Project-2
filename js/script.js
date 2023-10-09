const loadCategoriesData = () =>{
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        showCategories(data.data.news_category)
    })
};

const showCategories = (data) =>{
    const LinkContainer = document.getElementById('link-container');
    data.forEach(categories => {
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
        showAllCategoryNews(data.data, category_name);
    })
};

const showAllCategoryNews = (category_id, category_name) =>{
    const alertCategoryNumber = document.getElementById('news-count');
    alertCategoryNumber.innerText = category_id.length;
    const alertCategoryName = document.getElementById('category-name');
    alertCategoryName.innerText = category_name;

    category_id.forEach(singleNews => {
        showSingleNews(singleNews)
    });
};

const showSingleNews = (single_News) =>{
    console.log(single_News);
};


//loadCategoriesData();