var key = "563492ad6f91700001000001556702a2f87a4513a76174d22b0fa146";
const mainContent = document.querySelector(".main-content");
const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector(".search-form");
const btnSubmit = document.querySelector(".btn-submit");
const btnViewMore = document.querySelector(".view-more");
var searcImagesLink;
var currentSearch;
var searchValue;
var pageCount = 1;

btnViewMore.addEventListener("click", viewMore);


// https://api.pexels.com/v1/curated?per_page=15
// searchInput.addEventListener("input", (e) =>{
//     serchValue = e.target.value;
// })

searchInput.addEventListener("input", (e) => {
    searchValue = e.target.value;
})

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    currentSearch = searchValue;
    searchImages(searchValue);
    // alert("hi")
})

const clear = () =>{
mainContent.innerHTML = '';
searchInput.value = '';
}


const apiHandling = async (url) => {
    const fetchData = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: key
        }
    })

    const data = await fetchData.json();
    return data;
}

const insertHTML = (data) => {
    data.photos.forEach((photo, i) => {
        const gallery = document.createElement("div");
        gallery.classList.add("gallery");

        gallery.innerHTML = `<div class="image-holder"><img src=${photo.src.large}></img>:
            <div class="profile">
            <a href=${photo.photographer_url}>${photo.photographer}</a>
            <a href=${photo.src.large}><i class="fa fa-download"></i></a>
        </div> 
        </div>`
   
   mainContent.appendChild(gallery)
    })
}




// fetch("https://api.pexels.com/v1/curated?per_page=15").then((res) =>{

// })

const curatedPhotos = async () =>{
   const data = await apiHandling('https://api.pexels.com/v1/curated?per_page=15');
insertHTML(data);
}

const searchImages = async (searchQuery) => {
    clear();
    searchImagesLink = `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10`
    const data = await apiHandling(searchImagesLink);

insertHTML(data);
}

async function viewMore (){
pageCount++;
if(currentSearch){
searchImagesLink =  `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=10&page=${pageCount}`;
}else{
searchImagesLink = `https://api.pexels.com/v1/curated?per_page=${pageCount}`
}
const data = await apiHandling(searchImagesLink);
insertHTML(data)
}


searchImages();
curatedPhotos();
