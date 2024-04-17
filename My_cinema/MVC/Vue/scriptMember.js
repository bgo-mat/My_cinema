window.onload = (event) => {
    const form = document.getElementsByTagName("form")[0];
    const affichageParent = document.getElementsByClassName("blocAffichage")[0];
    const divImgFleche1 = document.getElementsByClassName("fleche1")[0];
    const divImgFleche2 = document.getElementsByClassName("fleche2")[0];
    const blocFleche = document.getElementsByClassName("blocFleche")[0];

    let currentPage = 0;
    let globalData;

    function nbOffUser(globalData) {
        let nbUserValue = document.getElementById('selectJs').value;
        if (nbUserValue !== "max") {
            return parseInt(nbUserValue, 10);
        } else {
            return globalData.memberInfo.length;
        }
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        loadValue();
    });

    form.addEventListener("input", async function (e) {
        e.preventDefault();
        loadValue();
    });

    function loadPage(memberFirstName, memberLastName) {
        affichageParent.innerHTML = "";

        fetch(`http://localhost:8000/Controller/controllerMember.php?memberFirstName=${memberFirstName}&memberLastName=${memberLastName}`)
            .then(response => response.json())
            .then(data => {
                globalData = data;
                displayPage(currentPage, data);
            });
    }

    function loadValue() {
        let memberValFirstName = form.memberFirstName.value.trim();
        let memberValLastName = form.memberLastName.value.trim();
        if (form.memberFirstName.value === "" && form.memberLastName.value != "") {
            memberValLastName = form.memberLastName.value;
            memberValFirstName = "vide";
        } else if (form.memberLastName.value === "" && form.memberFirstName.value != "") {
            memberValFirstName = form.memberFirstName.value;
            memberValLastName = "vide";
        } else if (form.memberLastName.value === "" && form.memberFirstName.value === "") {
            memberValLastName = "vide";
            memberValFirstName = "vide";
        } else if (form.memberLastName.value != "" && form.memberFirstName.value != "") {
            memberValFirstName = form.memberFirstName.value;
            memberValLastName = form.memberLastName.value;
        }

        let memberFirstName = memberValFirstName.trim();
        let memberLastName = memberValLastName.trim();
        blocFleche.style.visibility = "visible";
        loadPage(memberFirstName, memberLastName);
    }


    function displayPage(pageIndex, data) {
        affichageParent.innerHTML = "";
        let nbUser = nbOffUser(globalData);
        let start = pageIndex * nbUser;
        let end = start + nbUser;
        let paginatedItems = data.memberInfo.slice(start, end);
        console.log(paginatedItems);
        for (let i = 0; i < paginatedItems.length; i++) {


            var divCarte = document.createElement("div");
            divCarte.className = "userCard";
            affichageParent.appendChild(divCarte);

            var divUserImg = document.createElement("div");
            divUserImg.className = "userImg";
            divCarte.appendChild(divUserImg);

            var divUserImgIcone = document.createElement("img");
            divUserImgIcone.className = "imgUserIcone";
            divUserImgIcone.src = "http://localhost:8000/assets/iconUser.png";
            divUserImg.appendChild(divUserImgIcone);

            var blocUserInfo = document.createElement("div");
            blocUserInfo.className = "blocUserInfo";
            divCarte.appendChild(blocUserInfo);

            var userFirstName = document.createElement("h2");
            userFirstName.className = "userFirstName";
            blocUserInfo.appendChild(userFirstName);
            userFirstName.innerHTML = paginatedItems[i][2] + " " + paginatedItems[i][3];


            var userLastName = document.createElement("h2");
            userLastName.className = "userFirstName";
            blocUserInfo.appendChild(userLastName);
            userLastName.innerHTML = paginatedItems[i][1];

            var userId = document.createElement("h2");
            userId.className = "userFirstName";
            blocUserInfo.appendChild(userId);
            userId.innerHTML = "User ID : " + paginatedItems[i][0];
            document.getElementsByClassName("userCard")[i].addEventListener("click", async function () {

                window.open(`http://localhost:8000/Vue/changeSub.html?memberId=${paginatedItems[i][0]}&memberFirstName=${paginatedItems[i][2]}&memberLastName=${paginatedItems[i][3]}`, `_self`);

            });

        }


    }
    divImgFleche1.addEventListener("click", function () {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage, globalData);
        }
    });

    divImgFleche2.addEventListener("click", function () {
        if ((currentPage + 1) * nbOffUser(globalData) < globalData.memberInfo.length) {
            currentPage++;
            displayPage(currentPage, globalData);
        }
    });

};