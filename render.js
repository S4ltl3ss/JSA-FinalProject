const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c4c538f350msh761d740953b0a93p140054jsn86e4d860aef5',
		'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
	}
};

const list_item = document.querySelector("#list-item");

function hyperlink(id){
	window.location.href = "details.html?id=" + id;
}

function createVideoItem(item) {
	let div_item = document.createElement("div");
	div_item.setAttribute("class", "item-vid")
	div_item.innerHTML = `
    <video onmouseenter="playvideo(this)" onmouseout="pausevideo(this)" class="trailer-video" >
        <source src="${item.data.max}" type="video/mp4">
    </video>`;
	return div_item
}

function createNoPreview(){
	let div_item = document.createElement("div");
	div_item.setAttribute("class", "item-vid")
	div_item.innerHTML = `
    <h1>NO PREVIEW</h1>`;
	return div_item
}

function createItem(item) {
	let div_item = document.createElement("div");
	div_item.setAttribute("class", "item");
	div_item.setAttribute("onclick","hyperlink("+item.id+")")
	div_item.setAttribute("id", "g_"+item.id);
	div_item.innerHTML = `
    <div class="item-image">
        <img src="${item.background_image}" alt="">
    </div>
    <div class="item-content">
        <div class="item-name">${item.name}</div>
    </div>`;
	return div_item;
}

function renderListItem(data) {
	list_item.innerHTML = "";
	data.forEach(function (item, index) {
		const itemUI = createItem(item);
		list_item.appendChild(itemUI);
	});
}

function preview(trailers, gameId){
	
}

const film = async (trailers, gameId) => {
	await fetch(trailers, { method: 'GET' })
		.then(response => response.json())
		.then(response => {
			console.log("films >>>", response)
			
			if (response.results.length > 0) {
				const film = document.querySelector(`#g_${gameId} .item-image`);
				console.log("exist films >>>", response.results)
				const filmUI = createVideoItem(response.results[0]);
				// film.innerHTML = "";
				film.appendChild(filmUI);
			}
			else {
				const film = document.querySelector(`#g_${gameId} .item-image`);
				const noPreview = createNoPreview()
				film.appendChild(noPreview)
			}
		})
		.catch(err => console.error(err));
}


function getApi(url) {
	fetch(url, options)
		.then(response => response.json())
		.then(response => {
			console.log("games >>", response)
			renderListItem(response.results)
			

			for (let i = 0; i < response.results.length; i++) {
				const gameId = response.results[i].id;
				let trailers = 'https://api.rawg.io/api/games/' + gameId + '/movies?key=7c795ae517ee40ba9819d5dcc5f14405';
				// console.log("trailer >>>>", trailers)

				film(trailers, gameId)
			}
			// function search() {                              
			//     const inputSearch = document.querySelector(".header-search");
			//     inputSearch.addEventListener("change", function () {
			//         const searchValue = inputSearch.value;
			//         const searchArray = [];
			//         response.results.forEach(function (item) {
			//             if (item.name.includes(searchValue) === true) {
			//                 searchArray.push(item)
			//             }
			//         })
			//         renderListItem(searchArray)
			//     })
			// }

			
			// search()
		})



		.catch(err => console.error(err));
}


const url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=7c795ae517ee40ba9819d5dcc5f14405&page_size=20&tags=1'
getApi(url)
function handleLogOut() {
	localStorage.removeItem("isLogin");
	window.location.href = "form.html"
}

const inputSearch = document.querySelector(".header-search");


function handlePagination(page) {
	let currentActive = document.querySelector(".active-page");
	currentActive.classList.remove("active-page");
	let nowActive = document.querySelector("#page_" + page);
	nowActive.classList.add("active-page");
	const tag = getDataLocalStorage("tag")
	let url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=7c795ae517ee40ba9819d5dcc5f14405&page_size=20' + '&page=' + page + '&tags='+ tag + '&search=' + inputSearch.value;
	getApi(url)
}

function search() {
	let url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=7c795ae517ee40ba9819d5dcc5f14405&page_size=20' + '&search=' + inputSearch.value;
	getApi(url)
}

function handleTags(tag){
	let url = 'https://rawg-video-games-database.p.rapidapi.com/games?key=7c795ae517ee40ba9819d5dcc5f14405&page_size=20' + '&tags='+ tag + '&search=' + inputSearch.value;
	getApi(url)
	localStorage.removeItem("tag")
	setDataToLocalStorage("tag", tag)
}

function playvideo(video) {
	video.play()
	video.volume = 0.2;
}

function pausevideo(video){
	video.pause()
}

function getDataLocalStorage(item){
    return JSON.parse(localStorage.getItem(item))||[]

}

function setDataToLocalStorage(item, data){
    localStorage.setItem(item, JSON.stringify(data))
}

function checkLogin(){
	const isLogin = JSON.parse(localStorage.getItem("isLogin"));
	if(!isLogin){
			window.location.href = "form.html"
	}
}

checkLogin()

window.onload = function(){
	handleTags('1')
}