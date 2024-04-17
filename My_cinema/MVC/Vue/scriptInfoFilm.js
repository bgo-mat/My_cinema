window.onload = async (event) => {

    const blocAff = document.getElementsByClassName("blocFilm")[0];
    const form = document.getElementsByTagName("form")[0];

    const getUrl = window.location.href;
    var url = new URL(getUrl);
    const filmRelease = url.searchParams.get("filmRelease").trim();


    function setDate(filmRelease) {
        let date = new Date(filmRelease);
        let jour = date.getDate();
        let mois = date.getMonth() + 1;
        let annee = date.getFullYear();
        jour = jour < 10 ? '0' + jour : jour;
        mois = mois < 10 ? '0' + mois : mois;
        let releaseDate = jour + "-" + mois + "-" + annee;
        return releaseDate;
    }



    function displayInfo(url) {
        let val = [url.searchParams.get("filmTitle").trim(),
        url.searchParams.get("filmDistributor").trim(), url.searchParams.get("filmDuration").trim(),
        url.searchParams.get("filmDirector").trim(), setDate(filmRelease)];
        let tab = ["Title :", "Distributor :", "Duration :", "Director :", "Release date :"];
        for (let i = 0; val.length > i; i++) {

            let blocTitre = document.createElement("div");
            blocTitre.className = "blocTitre";
            blocAff.appendChild(blocTitre);

            let texte = document.createElement("h2");
            let info = document.createElement("h2");
            info.className = "infoMovie";
            texte.className = "text";
            blocTitre.appendChild(texte);
            blocTitre.appendChild(info);

            if (i === 2) {
                info.innerHTML = val[i] + "min";
            } else {
                info.innerHTML = val[i];
            }

            texte.innerHTML = tab[i];

        }
    }

    displayInfo(url);

    async function scheduleAdd() {
        const getUrl = window.location.href;
        var url = new URL(getUrl);
        let id_movie = url.searchParams.get("filmId").trim();
        let id_room = document.getElementById('room_id').value;
        let date = document.getElementById('date').value;
        let hour = document.getElementById('hour').value + ":00";
        let date_begin = date + " " + hour;

        await fetch(`http://localhost:8000/Controller/controllerInfoFilm.php?id_movie=${id_movie}&id_room=${id_room}&date_begin=${date_begin}`);
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        scheduleAdd();
        alert("Movie add to schedule ✅");
    });
};