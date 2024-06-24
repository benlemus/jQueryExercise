let ratingObj = {};
let ratingArr = [];
let titleArr = [];

function makesGrid(title, rating) {
  $(`<div class='gridContainer'><div class="newTitle">${title}</div>
        <div class="newRating">${rating}</div>
        <div class="deleteInput">X</div></div>`).appendTo(
    ".newRatingsContainer"
  );
}

function makeNewTitleGrid(newArr) {
  $(".gridContainer").remove();
  $(".newTitle").remove();
  $(".newRating").remove();

  $('<div class="gridContainer"></div>').appendTo(".newRatingsContainer");
  $('<div class="newTitle">TITLE</div>').appendTo(".gridContainer");
  $('<div class="newRating">RATING</div>').appendTo(".gridContainer");
  newArr.forEach((val) => {
    let newTitle = val;
    let newRating = ratingObj[val];
    makesGrid(newTitle, newRating);
  });
}

function sortAlphaAZ(arr) {
  let newArr = arr.sort();

  makeNewTitleGrid(newArr);
}

function sortAlphaZA(arr) {
  let newArr = arr.sort();
  newArr.reverse();

  makeNewTitleGrid(newArr);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function makeNewRatingGrid(newArr) {
  $(".gridContainer").remove();
  $(".newTitle").remove();
  $(".newRating").remove();

  $('<div class="gridContainer"></div>').appendTo(".newRatingsContainer");
  $('<div class="newTitle">TITLE</div>').appendTo(".gridContainer");
  $('<div class="newRating">RATING</div>').appendTo(".gridContainer");
  newArr.forEach((val) => {
    let newTitle = getKeyByValue(ratingObj, val);
    let newRating = val;
    makesGrid(newTitle, newRating);
  });
}
function sortRatingLowestHighest(arr) {
  let newArr = arr.sort((a, b) => {
    return a - b;
  });
  makeNewRatingGrid(newArr);
}

function sortRatingHighestLowest(arr) {
  let newArr = arr.sort((a, b) => {
    return a - b;
  });
  newArr.reverse();
  makeNewRatingGrid(newArr);
}

function makeNewRating() {
  let title = $(".movieTitle").val();
  let rating = $("#ratingInput").val();

  if (titleArr.indexOf(title) !== -1) {
    alert("Title already submitted");
  } else if (title.length >= 2) {
    makesGrid(title, rating);
    $(".movieTitle").val("");

    ratingObj[title] = rating;
    titleArr.push(title);
    ratingArr.push(rating);
  } else {
    alert("Title must be atleast 2 characters");
  }
}

$("#submitBtn").on("click", function () {
  makeNewRating();
});

$("ul a").on("click", (e) => e.preventDefault());
$(".sortContainer").on("click", (e) => {
  if (e.target.className === "highest") {
    sortRatingHighestLowest(ratingArr);
  }
  if (e.target.className === "lowest") {
    sortRatingLowestHighest(ratingArr);
  }

  if (e.target.className === "a-z") {
    sortAlphaAZ(titleArr);
  }
  if (e.target.className === "z-a") {
    sortAlphaZA(titleArr);
  }
});

$(".newRatingsContainer").on("click", function (e) {
  if (e.target.className === "deleteInput") {
    e.target.parentElement.remove();
    let parent = e.target.parentElement;
    let titleChild = parent.firstChild.innerText;
    let ratingChild = ratingObj[titleChild];

    delete ratingObj[titleChild];
    const indx = titleArr.indexOf(titleChild);
    if (indx !== -1) {
      titleArr.splice(indx, 1);
    }

    const ratingIndx = ratingArr.indexOf(ratingChild);
    if (ratingIndx !== -1) {
      ratingArr.splice(ratingIndx, 1);
    }
  }
});
