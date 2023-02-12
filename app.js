let button = document.querySelector("#button");
let image = document.querySelector("#image");
let pokeNumber = document.querySelector("#number");
let pokeName = document.querySelector("#name");

const changePokemon = async () => {
    // La fonction Math random prend une valeur entre 0 et 1, on la multiplie par 151 ce qui nous permet d'atteindre jusqu'à 150.999, on englobe dans Math ceil qui définit le plafond, ça permettra d'arrondir à la valeur supérieure c'est à dire 151, on rajoute 1 pour que ça ne prenne pas en compte le 0 qui n'existe pas
    let randomNumber = Math.ceil(Math.random()* 150) + 1;

    // On a besoin des backticks pour pouvoir injecter notre variable dans l'url
    let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

    //On obtient une promesse, fetch code asynchrone il faut indiquer à la fonction qu'elle contient du code asynchrone pour qu'elle attende de résoudre la récupération des données avant d'éxécuter la suite de la fonction, on ajoute aussi await devant la méthode qui doit etre éxécutée avant de passer à la suite
    let data = await fetch(requestString);
    console.log(data);

    let response = await data.json();
    console.log(response);

    //On indique la source de l'image en allant la chercher dans la réponse en json avec la clé sprite puis la clé front_default
    image.src = response.sprites.front_default;

    //On opère de même pour l'id et le nom, ici on concatène juste avec un hashtag
    pokeNumber.textContent = `#${response.id}`;

    pokeName.textContent = response.name;
};

// On l'appelle une première fois pour avoir un premier pokémon affiché sans passer par le bouton
changePokemon();
button.addEventListener("click", changePokemon);