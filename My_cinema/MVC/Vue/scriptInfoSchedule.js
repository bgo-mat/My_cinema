window.onload = async (event) => {

    const button = document.getElementsByClassName("okButton")[0];
    const divImgFleche1 = document.getElementsByClassName("fleche1")[0];
    const divImgFleche2 = document.getElementsByClassName("fleche2")[0];
    const blocFleche = document.getElementsByClassName("blocFleche")[0];

    let currentPage = 0;
    let globalData;
    let input;


    function nbOffUser(globalData) {
        let nbUserValue = document.getElementById('selectJs').value;
        if (nbUserValue !== "max") {
            return parseInt(nbUserValue, 10);
        } else {
            return globalData.memberInfo.length;
        }
    }


    loadInfo();

    async function loadInfo() {
        input = searchInfo();
        if (input.length === 0) {
            input = "2000-01-01";
        }

        const response = await fetch(`http://localhost:8000/Controller/controllerShowSchedule.php?date=${input}`);
        const data = await response.json();
        console.log(data);
        globalData = data;
        displayPage(globalData, currentPage);
    }

    function displayPage(inputData, pageIndex) {

        const blocAff = document.getElementsByClassName("blocAff")[0];
        blocAff.innerHTML = "";
        blocFleche.style.visibility = "visible";
        let nbUser = nbOffUser(globalData);
        let start = pageIndex * nbUser;
        let end = start + nbUser;
        let paginatedItems = inputData.movieSchedule.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
            let blocTitre = document.createElement("div");
            blocTitre.className = "blocTitre";
            blocAff.appendChild(blocTitre);

            let idRoom = document.createElement("h2");
            let title = document.createElement("h2");
            let date_begin = document.createElement("h2");

            let blocDelete = document.createElement("div");
            blocDelete.className = "blocDelete";

            let buttonDel = document.createElement("button");
            buttonDel.className = "buttonDel";
            buttonDel.innerHTML = "Delete";


            idRoom.className = "text";
            title.className = "text";
            date_begin.className = "text";

            blocTitre.appendChild(title);
            blocTitre.appendChild(date_begin);
            blocTitre.appendChild(idRoom);
            blocTitre.appendChild(blocDelete);
            blocDelete.appendChild(buttonDel);

            title.innerHTML = "Title :" + " " + paginatedItems[i].title;
            date_begin.innerHTML = "Date :" + " " + paginatedItems[i].date_begin;
            idRoom.innerHTML = "Room :" + " " + paginatedItems[i].id_room;

            let id = paginatedItems[i].id;

            buttonDel.addEventListener("click", async function () {
                await fetch(`http://localhost:8000/Controller/controllerDeleteSchedule.php?id=${id}`);
                loadInfo();
            });
        }
    }




    button.addEventListener("click", async function () {
        loadInfo();
    });

    document.getElementById('selectJs').addEventListener("input", async function () {
        loadInfo();
    });

    document.getElementById('date').addEventListener("input", async function () {
        loadInfo();
    });

    function searchInfo() {
        let date = document.getElementById('date').value;
        return date;
    }


    divImgFleche1.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            loadInfo(currentPage, globalData);
        }
    });

    divImgFleche2.addEventListener("click", function () {
        if ((currentPage + 1) * nbOffUser(globalData) < globalData.movieSchedule.length) {
            currentPage++;
            loadInfo(currentPage, globalData);
        }
    });
};
