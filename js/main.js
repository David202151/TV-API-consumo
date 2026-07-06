const button = document.querySelector('button');

function openModal(show) {
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
        <h2>${show.name}</h2>
        <img src="${show.image?.original}" class = "modal-img" alt="${show.name}">
        <p>${show.summary}</p>
        <p><strong>Géneros:</strong> ${show.genres.join(", ")}</p>
        <p><strong>Fecha de estreno:</strong> ${show.premiered}</p>
        <p><strong>Rating:</strong> ${show.rating?.average || "N/A"}</p>
    `;
    document.getElementById("modal").classList.remove("hidden");
}

const createShowCard = (show) => {
    const card = document.createElement("div");
    card.classList.add("show-card");
    const image = document.createElement("img");
    image.classList.add("show-image");
    image.src = show.image?.medium || "default-image.jpg";
    image.alt = show.name;
    const info = document.createElement("div");
    info.classList.add("show-info");
    const name = document.createElement("h2");
    name.classList.add("show-name");
    name.textContent = show.name;
    const genres = document.createElement("div");
    genres.classList.add("show-genres");
    show.genres.forEach((genre)=>{
        const span = document.createElement("span");
        span.classList.add(
            "show-genre",
            genre.replace(/\s+/g,"-")
        );
        span.textContent = genre;
        genres.appendChild(span);
    });
    info.appendChild(name);
    info.appendChild(genres);
    card.appendChild(image);
    card.appendChild(info);
    /* Recuperar el Id del show que se seleccione */
    card.addEventListener("click", async () => {
        const response = await axios.get(`https://api.tvmaze.com/shows/${show.id}`);
        openModal(response.data);
    });
    
    return card;
    return card;
};


document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementsByClassName("contenedor")[0];
    try{
        const response = await axios.get("https://api.tvmaze.com/shows");
        const shows = response.data.slice(0, 40);
        for(const show of shows){
            const showCard = createShowCard(show);
            contenedor.appendChild(showCard);
        }
        
    }catch(error){
        console.error("Error fetching data:", error);
    }
});


const closeModalButton = document.getElementsByClassName("close-modal")[0];
closeModalButton.addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});