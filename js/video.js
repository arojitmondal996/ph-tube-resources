function getTimeString(time) {
    // get hour and rest second
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

// 1. Fetch, Load Categories on html

// Created load catagories
const loadCatagories = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};

// load videos function
const cardDemo = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

const loadVideos = () => {
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos?title=")
        .then((res) => res.json())
        .then((data) => displayVideo(data.videos))
        .catch((error) => console.log(error));
};

// input the video details

const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri= `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri);
    const data = await res.json();
    // console.log(data);
    displayDetails(data.video);
};

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");

    detailContainer.innerHTML = `
    <img src=${video.thumbnail}/>
    <p class="mt-5">${video.description}</p>
    `;

    // way-1
    // document.getElementById("showModalData").click();
    // way-2
    document.getElementById("customModal").showModal();
}

// {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const displayVideo = (videos) => {
    const videoContainer = document.getElementById("video");
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assest/icon.png"/>
        <h2 class="text-center text-xl font-bold">
         No Content Here in this category
        </h2>
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add("grid");
    }

    videos.forEach((video) => {
        // console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded py-1 text-white">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
    </div>
    <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="item-center gap-2 flex">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>

            ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
            
        </div>
        <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button> </p>
        
    </div>
  </div>
        `;
        videoContainer.append(card);
    });

};

////////////////////// 
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    // console.log(buttons);
    for (let btn of buttons) {
        btn.classList.remove("active");
    }
};


const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {

            // sobaike active class remove koro
            removeActiveClass();
            // // id er class ke remove kro

            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn)
            activeBtn.classList.add("active");
            displayVideo(data.category);
        })
        .catch((error) => console.log(error));
};



// Create DisplayCategories
const displayCategories = (categories) => {
    // console.log(data);
    const categoryContainer = document.getElementById("categories");

    // add the html
    categories.forEach((item) => {
        console.log(item);

        // // create a button
        // const button = document.createElement("button");
        // button.classList = "btn";
        // button.innerText = item.category;


        // create a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =
            `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>

        `;

        // add button to a category container
        categoryContainer.append(buttonContainer);
    });
};

loadCatagories();
loadVideos();