window.onload = (event) => {
    const form = document.getElementsByTagName("form")[0];
    const blocAff = document.getElementsByClassName("carteFilm")[0];
    const divImgFleche1 = document.getElementsByClassName("fleche1")[0];
    const divImgFleche2 = document.getElementsByClassName("fleche2")[0];
    const blocFleche = document.getElementsByClassName("blocFleche")[0];


    let currentPage = 0;
    let globalData;

    function nbOffUser(globalData) {
        let nbUserValue = document.getElementById('selectNb').value;
        if (nbUserValue !== "max") {
            return parseInt(nbUserValue, 10);
        } else {
            return globalData.memberInfo.length;
        }
    }

    async function loadFilm() {
        let inputName = form.inputName.value;
        let inputGenre = form.inputGenre.value;
        let inputDistrib = form.inputDistributor.value;
        if (form.inputGenre.value === "all") {
            inputGenre = "vide";
        } else {
            inputGenre = form.inputGenre.value;
        }

        if (form.inputDistributor.value === "") {
            inputDistrib = "vide";
        } else {
            inputDistrib = form.inputDistributor.value;
        }


        const response = await fetch(`http://localhost:8000/Controller/controllerNomFilm.php?inputName=${inputName}&inputGenre=${inputGenre}&inputDistributor=${inputDistrib}`);
        const data = await response.json();
        globalData = data;
        displayFilm(globalData, currentPage);
    }

    function displayFilm(globalData, pageIndex) {
        blocAff.innerHTML = "";
        blocFleche.style.visibility = "visible";
        let nbUser = nbOffUser(globalData);
        let start = pageIndex * nbUser;
        let end = start + nbUser;
        let paginatedItems = globalData.film.slice(start, end);
        for (let i = 0; i < paginatedItems.length; i++) {

            var divCarte = document.createElement("div");
            divCarte.className = "userCard";
            blocAff.appendChild(divCarte);

            var blocUserInfo = document.createElement("div");
            blocUserInfo.className = "blocUserInfo";
            divCarte.appendChild(blocUserInfo);

            var userFirstName = document.createElement("h2");
            userFirstName.className = "userFirstName";
            blocUserInfo.appendChild(userFirstName);
            userFirstName.innerHTML = paginatedItems[i].title;



            document.getElementsByClassName("userCard")[i].addEventListener("click", async function () {

                window.open(`http://localhost:8000/Vue/infoFilm.html?filmId=${decodeURI(globalData.film[i][0])}
                &filmTitle=${decodeURI(globalData.film[i].title)}
                &filmDistributor=${decodeURI(globalData.film[i].name)}
                &filmDuration=${decodeURI(globalData.film[i].duration)}
                &filmDirector=${decodeURI(globalData.film[i].director)}
                &filmRelease=${globalData.film[i].release_date}`, `_self`);
            });


        }

    }
    form.addEventListener("input", async function (e) {
        e.preventDefault();
        loadFilm();
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        loadFilm();
    });

    divImgFleche1.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            loadFilm(currentPage, globalData);
        }
    });

    divImgFleche2.addEventListener("click", function () {
        if ((currentPage + 1) * nbOffUser(globalData) < globalData.film.length) {
            currentPage++;
            loadFilm(currentPage, globalData);
        }
    });
};