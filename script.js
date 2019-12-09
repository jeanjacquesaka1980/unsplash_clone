const BUTTON = document.getElementById("search-button");
const PREV = document.getElementById("prev");
const NEXT = document.getElementById("next");
const LINKS = document.querySelectorAll(".page");
// console.log(LINKS);
const CURRENT = document.querySelector(".current");
let currentPage = 1;
// console.log(LINKS);
// console.log(LINKS.length);

changeNumColor = () => {
    LINKS.forEach(function (item) {
        // console.log(item);

        item.addEventListener('click', function () {
            //reset the color of other links
            LINKS.forEach(function (item) {

                item.classList.remove("current");
            })
            // apply the style to the link
            this.classList.add("current");
            // console.log(this);

            if (currentPage < Number(this.innerHTML) || currentPage > Number(this.innerHTML)) {
                currentPage = "";
                currentPage = Number(this.innerHTML);
                getPhoto();
                console.log(currentPage);
            } else if (currentPage == Number(this.innerHTML)) {
                return currentPage;
                getPhoto();
            }
            console.log(Number(this.innerHTML));
        });
    })

}
changeNumColor();


generateApiUrl = () => {

    const KEY = "d66f6cc48c5b0614a8e1baf0945eb2eb9b2e88467708296d637080e532848ea2";
    const SEARCH = document.getElementById("search").value;
    const PER_PAGE = 20;

    const UNSPLASHURL = `https://api.unsplash.com/search/collections/?query=${SEARCH}&client_id=${KEY}&per_page=${PER_PAGE}&page=${currentPage}`;
    // console.log(SEARCH);

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
            document.getElementById("nav-pagination").style.display = "block";
        });
}

changeNumColorOnNext = () => {
    if (LINKS[0].classList.contains("current")) {
        LINKS[0].classList.remove("current");
        LINKS[1].classList.add("current");
        currentPage = LINKS[1].tabIndex;
        console.log(currentPage);
        console.log(LINKS[1]);
    } else if (LINKS[1].classList.contains("current")) {
        LINKS[1].classList.remove("current");
        LINKS[2].classList.add("current");
        currentPage = LINKS[2].tabIndex;
        console.log(currentPage);
    };
}

nextPage = () => {
    if (currentPage == 3) {
        return currentPage;
    } else {
        changeNumColorOnNext();
        getPhoto();
    }
}

changeNumColorOnPrevious = () => {
    if (LINKS[2].classList.contains("current")) {
        LINKS[2].classList.remove("current");
        LINKS[1].classList.add("current");
        currentPage = LINKS[1].tabIndex;
    } else if (LINKS[1].classList.contains("current")) {
        LINKS[1].classList.remove("current");
        LINKS[0].classList.add("current");
        currentPage = LINKS[0].tabIndex;
        // console.log(LINKS[2]);
    };
}

previousPage = () => {
    if (currentPage == 1) {
        return currentPage;
    } else {
        changeNumColorOnPrevious();
        getPhoto();
    }
}


BUTTON.addEventListener("click", getPhoto);
NEXT.addEventListener("click", nextPage);
PREV.addEventListener("click", previousPage)