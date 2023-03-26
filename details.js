let search = window.location.search

search = search.substring(1)

// console.log(search)
const desc = document.querySelector(".desc")
const image = document.querySelector(".image")
const addImage = document.querySelector(".addImg")
const game = document.querySelector(".gameName")
const platforms = document.querySelector(".platforms")
const publisher = document.querySelector(".publishers")
const shop = document.querySelector(".shop")
const genres = document.querySelector(".genres")

function DescItem(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","description")
    div_item.innerHTML = `${item}`
    desc.appendChild(div_item)
}

function gameName(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","name")
    div_item.innerHTML = `<h1>${item}</h1>`
    game.appendChild(div_item)
}

function ImageItem(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","pic")
    div_item.innerHTML = `<img src="${item}" alt="">`
    image.appendChild(div_item)
}

function AddImg(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","picture")
    div_item.innerHTML = `<img src="${item}" alt="">`
    addImage.appendChild(div_item)
}

function genre(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","genre")
    div_item.innerHTML = `<h4>${item}</h4>`
    genres.appendChild(div_item)
}

function available(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","platform")
    div_item.innerHTML = `<h4>${item}</h4>`
    platforms.appendChild(div_item)
}

function publishers(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","publish")
    div_item.innerHTML = `<h4>${item}</h4>`
    publisher.appendChild(div_item)
}

function stores(item){
    let div_item = document.createElement("div")
    div_item.setAttribute("class","store")
    div_item.innerHTML = `<h4><a href="https://${item.domain}">${item.name}</h4>`
    shop.appendChild(div_item)
}

function parseQuery(queryString){
    let arr = queryString.split("=")
    // console.log(arr)
    const queries = {};
    queries[arr[0]] = arr[1];
    // console.log(queries)
    return queries
}

const queries = parseQuery(search)
let gameUrl = "https://api.rawg.io/api/games/" + queries.id + "?key=7c795ae517ee40ba9819d5dcc5f14405"
fetch(gameUrl, {method: 'GET'})
    .then(response => response.json())
    .then(response => {
        console.log(response)
        DescItem(response.description)
        ImageItem(response.background_image_additional)
        AddImg(response.background_image)
        gameName(response.name)
        for(let i = 0; i < response.genres.length; i++){
            genre(response.genres[i].name)
        }
        for(let i = 0; i < response.platforms.length; i++){
            available(response.platforms[i].platform.name)
        }
        for(let i = 0; i < response.publishers.length; i++){
            publishers(response.publishers[i].name)
        }
        for(let i = 0; i < response.stores.length; i++){
            stores(response.stores[i].store)
        }
    })
    .catch(err => console.error(err));

function back(){
    window.location.href="index.html"
}