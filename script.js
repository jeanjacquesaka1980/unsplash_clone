const BUTTON = document.getElementById("search-button");
const PREV = document.getElementById("prev");
const NEXT = document.getElementById("next");
const LINKS = document.querySelectorAll(".page");
let currentPage = 1;
// console.log(LINKS);
// console.log(LINKS.length);

changeNumColor = () => {
    LINKS.forEach(function (item) {
        // console.log(item);

        item.addEventListener('click', function () {
          //reset the color of other links
          LINKS.forEach(function (item) {
            // console.log(item);
            item.classList.remove("current");
            item.style.backgroundColor = "#f9f9f9";
            item.style.color = "#007BFF";
          })
          // apply the style to the link
          this.classList.add("current");
          this.style.backgroundColor = "#007BFF";
          this.style.color = "#f9f9f9";
          console.log(this);
          
          if (currentPage < this.innerHTML) {
            nextPage();
          } else if(currentPage == this.innerHTML) {
            currentPage == this.innerHTML;
            getPhoto();
          } else if (currentPage > this.innerHTML){
            previousPage();
          }
        });
      })

}

changeNumColor();


generateApiUrl = () => {

    const KEY = "d66f6cc48c5b0614a8e1baf0945eb2eb9b2e88467708296d637080e532848ea2";
    const SEARCH = document.getElementById("search").value;
    const PER_PAGE = 20;

    const UNSPLASHURL = `https://api.unsplash.com/search/collections/?query=${SEARCH}&client_id=${KEY}&per_page=${PER_PAGE}&page=${currentPage}`;
    console.log(SEARCH);

    // console.log(UNSPLASHURL);
    return UNSPLASHURL;
}

cleanUp = () => {
    document.getElementById("result").innerHTML = "";
}

loadPhotos = data => {

    cleanUp();

    for (let i = 0; i < data.results.length; i++) {
        const IMAGE = data.results[i].cover_photo.urls.small;

        const NEWIMG = document.createElement("img");
        NEWIMG.setAttribute("src", IMAGE);
        document.getElementById("result").appendChild(NEWIMG);
    }
}

getPhoto = () => {

    const URL = generateApiUrl();
    console.log(URL);

    fetch(URL)
        .then(resp => {
            return resp.json();
        })
        .then(data => {
            loadPhotos(data);
            // console.log(data.results[0].cover_photo.urls.small);
            // document.getElementById("nav-pagination").style.display = "block";
        });
}

nextPage = () => {
    if (currentPage == 3){
        return currentPage;
    } else {
        currentPage += 1; 
        getPhoto();
    }
}

previousPage = () => {
    currentPage -= 1;
    getPhoto();
}


BUTTON.addEventListener("click", getPhoto);
NEXT.addEventListener("click", nextPage);
PREV.addEventListener("click", previousPage)