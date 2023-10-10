let fetchData = [];
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
      fetchData = data.data;
      showAllCategoryNews(data.data, category_name);
    })
};

const showAllCategoryNews = (category_id, category_name) =>{
    const alertCategoryNumber = document.getElementById('news-count');
    alertCategoryNumber.innerText = category_id.length;
    const alertCategoryName = document.getElementById('category-name');
    alertCategoryName.innerText = category_name;

    
        showSingleNews(category_id)
    
};

const showSingleNews = (single_News) =>{
  const cardContainer = document.getElementById('all-news');
  cardContainer.innerHTML = '';
  single_News.forEach(singleNews => {
    console.log(singleNews);
      const {thumbnail_url, title, details, total_view, _id, rating, } = singleNews;
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-3">
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-9 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0, 300)}...</p>
          </div>
          
          <div class="d-flex justify-content-between align-items-center p-3">
            <div class="d-flex gap-2 align-items-center">
              <img class="rounded-circle" height="40" width="40" src="${singleNews.author.img}" alt="">
              <div class="d-flex flex-column gap-0">
                <p class="p-0 m-0">${singleNews.author.name ? singleNews.author.name : "Not Available"}</p>
                <p class="p-0 m-0">${singleNews.author.published_date}</p>
              </div>
            </div>
            <div class="d-flex align-items-center gap-2 ">
              <i class="fa-regular fa-eye"></i>
              <p class="p-0 m-0">${total_view ? total_view : "Not Available"}</p>
            </div>
            <div class = "d-flex align-items-center justify-content-center">
              ${generateStars(rating.number)}
              <p class = "p-0 m-0">${rating.number}</p>
            </div>
            <div>
              <i onclick = "loadNewsDetails('${_id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal"
              data-bs-target="#exampleModal"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
      cardContainer.appendChild(div);
    });
   
};

const loadNewsDetails = (news_id) =>{
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        displayNewsDetails(data.data[0]);
    })
};

const displayNewsDetails = (modal_data) =>{
    const modalContainer = document.getElementById('modal-body');
    const {image_url, title, details, total_view, _id, others_info} = modal_data;
    modalContainer.innerHTML = `
    <div class="card mb-3">
    <div class="d-flex flex-column g-1">
      <div class="">
        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class=" d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : "Not Trending"}</span></h5>
          <p class="card-text">${details.slice(0, 300)}...</p>
        </div>
        
        <div class="d-flex justify-content-between align-items-center p-3">
          <div class="d-flex gap-2 align-items-center">
            <img class="rounded-circle" height="40" width="40" src="${modal_data.author.img}" alt="">
            <div class="d-flex flex-column gap-0">
              <p class="p-0 m-0">${modal_data.author.name}</p>
              <p class="p-0 m-0">${modal_data.author.published_date}</p>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2 ">
            <i class="fa-regular fa-eye"></i>
            <p class="p-0 m-0">${total_view}</p>
          </div>
          <div>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
};

const showTrendingNews = () =>{
  const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true)
  const category_name = document.getElementById("category-name").innerText;
  showAllCategoryNews(trendingNews, category_name)
};

const showTodaysPick = () =>{
  const todayPick = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
  const category_name = document.getElementById("category-name").innerText;
  showAllCategoryNews(todayPick, category_name)
};


const generateStars= rating =>{
    let ratingHTML= '';
    for (let i = 1; i <= Math.floor(rating); i++){
        ratingHTML +=`<i class="fas fa-star"></i>`;
      
    }
    if(rating - Math.floor(rating)>0){
        ratingHTML+=`<i class="fas fa-star-half"></i>`
    }
    return ratingHTML;
};