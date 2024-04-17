window.onload = async (event) => {

    const form = document.getElementsByTagName("form")[0];
    const sub = document.getElementsByClassName("userSub")[0];
    const buttonDelete = document.getElementsByClassName("buttonDelete")[0];
    const firstName = document.getElementsByClassName("firstName")[0];
    const lastName = document.getElementsByClassName("lastName")[0];
    const firstName2 = document.getElementsByClassName("firstName")[1];
    const lastName2 = document.getElementsByClassName("lastName")[1];
    const blocHisto = document.getElementsByClassName("blocHistoName")[0];
    const formFilm = document.getElementsByTagName("form")[1];
    const blocFilm = document.getElementsByClassName("blocChoix")[0];

    const getUrl = window.location.href;
    var url = new URL(getUrl);
    var valUrlId = url.searchParams.get("memberId");
    var valUrlFirstName = url.searchParams.get("memberFirstName");
    var valUrlLastName = url.searchParams.get("memberLastName");

    firstName.innerHTML = valUrlFirstName;
    lastName.innerHTML = valUrlLastName;
    firstName2.innerHTML = valUrlFirstName;
    lastName2.innerHTML = valUrlLastName;

    let subId;
    let globalData;

    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var year = today.getFullYear();

    today = year + '-' + month + '-' + day;
    document.getElementsByClassName("calendar")[0].value = today;



    loadSub(sub);

    async function loadSub(sub) {
        sub.innerHTML = "";
        const response = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}`);
        const data = await response.json();
        globalData = data;
        sub.innerHTML = data.subInfo[0].name;
        return data;
    }

    async function chageSub(sub, form, subId, valUrlId) {
        const memberSubId = form.memberSub.value;

        if (memberSubId.toLowerCase() === "vip") {
            subId = 1;
        } else if (memberSubId.toLowerCase() === "gold") {
            subId = 2;
        } else if (memberSubId.toLowerCase() === "classic") {
            subId = 3;
        } else if (memberSubId.toLowerCase() === "pass day") {
            subId = 4;
        }

        const sendSub = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}&inputSubId=${subId}`);
        const data2 = await sendSub.json();

        sub.innerHTML = data2.subInfo[0].name;
        loadSub(sub);
    }

    form.addEventListener("input", async function (e) {
        e.preventDefault();
        chageSub(sub, form, subId, valUrlId);
    });

    const response = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}`);
    const data = await response.json();

    data.histoInfo.forEach((film) => {
        var blocH = document.createElement("div");
        blocH.className = "blocH";
        blocHisto.appendChild(blocH);

        var histoName = document.createElement("h2");
        histoName.className = "histoName";
        blocH.appendChild(histoName);
        histoName.innerHTML = film.title;

        var histoame = document.createElement("h2");
        histoame.className = "histoName";
        blocH.appendChild(histoame);
        histoame.innerHTML = film.date_of_view;

        var histoDel = document.createElement("img");
        histoDel.className = "buttonAdd";
        histoDel.src = "http://localhost:8000/assets/iconeCroix.png";
        blocH.appendChild(histoDel);

        histoDel.addEventListener("click", async function () {
            blocH.remove();
            await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}&filmId=${film.id}`);

        });
    });



    buttonDelete.addEventListener("click", async function (e) {
        e.preventDefault();
        let subId;
        subId = 5;

        const sendSub = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}&inputSubId=${subId}`);
        const data2 = await sendSub.json();

        sub.innerHTML = data2.subInfo[0].name;
    });


    formFilm.addEventListener("submit", async function (e) {
        e.preventDefault();
        loadPage();
    });

    formFilm.addEventListener("input", async function (e) {
        e.preventDefault();
        loadPage();
    });

    async function loadPage() {
        const inputFilm = formFilm.filmName.value;
        const inputDate = formFilm.inputDate.value;
        const sendFilm = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?filmName=${inputFilm}&memberId=${valUrlId}&dateAdd=${inputDate}`);
        const data3 = await sendFilm.json();

        blocFilm.innerHTML = "";
        for (let i = 0; i < data3.nomFilm.length; i++) {

            var prop = document.createElement("div");
            prop.className = "choixFilm";
            blocFilm.appendChild(prop);

            const propfilm = document.getElementsByClassName("choixFilm")[i];

            var histoName = document.createElement("h2");
            histoName.className = "histoProp";
            propfilm.appendChild(histoName);
            histoName.innerHTML = data3.nomFilm[i].title;

            var histoAdd = document.createElement("img");
            histoAdd.className = "buttonAdd";
            histoAdd.src = "http://localhost:8000/assets/iconeAdd.png";
            propfilm.appendChild(histoAdd);



            histoAdd.addEventListener("click", async function () {

                const changeFilm = await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?filmNameChange=${data3.nomFilm[i].title}&memberId=${valUrlId}&dateAdd=${inputDate}`);
                const data4 = await changeFilm.json();
                for (let i = 0; i < data4.nomFilm.length; i++) {

                    var blocH = document.createElement("div");
                    blocH.className = "blocH";
                    blocHisto.appendChild(blocH);

                    var histoName = document.createElement("h2");
                    histoName.className = "histoName";
                    blocH.appendChild(histoName);
                    histoName.innerHTML = data4.nomFilm[i].title;

                    var histoame = document.createElement("h2");
                    histoame.className = "histoName";
                    blocH.appendChild(histoame);
                    histoame.innerHTML = inputDate;

                    var histoDel = document.createElement("img");
                    histoDel.className = "buttonAdd";
                    histoDel.src = "http://localhost:8000/assets/iconeCroix.png";
                    blocH.appendChild(histoDel);


                    histoDel.addEventListener("click", async function () {
                        document.getElementsByClassName("blocH")[i].remove();
                        await fetch(`http://localhost:8000/Controller/controllerHistoSub.php?memberId=${valUrlId}&filmId=1`);
                    });

                }


            });


        }
    }
};
