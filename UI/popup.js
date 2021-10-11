function call_saving_fun(){
    console.log('fun called');
    console.log(localStorage["inputText"]);
    var data = document.getElementById("email").value;
    localStorage["inputText"] = data; 
    console.log(localStorage["inputText"]);
    window.location.reload();
  }

function logout(){
    console.log('log me out');
    localStorage.removeItem('inputText');
    window.location.reload();
}
function test(x){
    console.log(x);
}


// fetching vidoe from local storage into html
function feedVideo(){
    var dict = JSON.parse(localStorage['video']);
    var vl = dict['videos'];
    console.log(vl);

    var arrayLength = vl.length;
    var video_card = document.createElement("div");

    for (var i = 0; i < arrayLength; i++) {
        console.log(vl[i]);
        video_card.innerHTML += `
        <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
                <p class="card-text">URL: ${vl[i]}</p>
                <button id="play_btn${i}" class="btn btn-danger">Play</a>
            </div>
            </div>
        </div>
        `
    }
    return video_card
}

if (typeof(Storage) !== "undefined") {
    console.log('data',localStorage)
    if (localStorage["inputText"] != null){
        // make as old user
        var x = document.getElementById("new_user");
        x.style.display = "none";
    }
    else{
        // make as new user 
        var x = document.getElementById("old_user");
        x.style.display = "none";
    }
}

document.getElementById('submit_btn_pop').addEventListener("click", call_saving_fun);
document.getElementById('logout').addEventListener("click", logout);
document.getElementById('user_name').innerText = 'Hello, '+ localStorage["inputText"];

document.getElementById('logout').addEventListener("click", logout);



var div = feedVideo();
document.getElementById('video_list').appendChild(feedVideo())

var dict = JSON.parse(localStorage['video']);
var vl = dict['videos'];


for (let i = 0; i < vl.length; i++) {
    console.log(i);
    //  this is why we use let in for loop!!
    document.getElementById('play_btn'+i).addEventListener('click', function(){
        console.log(i);
        chrome.tabs.create({url:vl[i]});
    })
}
console.log(localStorage);