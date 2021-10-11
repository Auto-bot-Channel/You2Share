console.log('on youtube main page');
var username;
var video_list;

chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
    username = response.status;
});

function addJsFunctions(){
    console.log('in add js functions');
    var script = document.createElement('script');
    script.innerHTML = `
    function say(){
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("ytshare");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function() {
        modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }

    function submitShare(){
        var notif;
        var pemail = document.getElementById("send_email").value;
        console.log(pemail);

        let xhr = new XMLHttpRequest();
        
        xhr.open('POST', 'https://you2share.herokuapp.com/api', true);
    
        xhr.getResponseHeader('Content-type', 'application/json');
        
        xhr.onload = function () {
           if(this.status === 200){
            notif = this.responseText
           }
           else {
            notif = "Some error occured"
           }
       }
    
       obj = '{"share_email":"'+ pemail + '", "video_url":"'+ document.URL + '"}';
       xhr.send(obj);
    }
    `
    var css = document.createElement('style')
    css.innerHTML = `
    /* The Modal (background) */
    .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top *pemail/
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;   /* should be 0 */
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
    background-color: #fefefe;
    margin: auto;
    margin-top: 5%;
    padding: 30px;
    border: 1px solid #888;
    width: 30%;
    }

    /* The Close Button */
    .close {
    color: #aaaaaa;
    float: right;
    font-size: 36px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    }

    /* share button */
    .ytshare-class {
        background-color: #ce381c; 
        border-radius: 4px;
        border-color: #ce381c;
        color: White;
        font-weight: bold;
        padding: 8px; 
        font-size: 12px;

      }
    `
    if(document.getElementsByClassName('ytshare-class').length == 0){
        document.getElementsByTagName('head')[0].appendChild(script); 
        document.getElementsByTagName('head')[0].appendChild(css); 
        console.log('added js');
    }
}

function addHTMLFunctions(){
    console.log('in add js functions');
    var script = document.createElement('div');
    script.id = 'myModal';
    script.className = 'modal';
    script.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Enter the email of your friend you want to share.</h3>
            <label for="email">Email</label>
            <input type="text" id="send_email" style="width:70%;" name="email">
            <button type="submit" onclick="submitShare()"> share </button> 
        </div>
    `
    if(document.getElementsByClassName('ytshare-class').length == 0){
        parentElement = document.getElementsByTagName('body')[0]
        parentElement.insertBefore(script, parentElement.children[2]);
        console.log('added js');
    }
}


//  for adding the share button in page
function shareButton() {
    console.log('in fun');
    var mid = document.getElementById("flex");
    var share = document.createElement("div");
    console.log('div found!!');
    share.innerHTML = `&ensp;
    <button id='ytshare' class='ytshare-class' onclick='say()'> SHARE WITH FRIENDS </button>
    `
    // pushing only once
    if(document.getElementsByClassName('ytshare-class').length == 0){
        mid.appendChild(share);   
    }
}

// for adding the view of urls in home page
function fetchVideos(username){
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', 'https://you2share.herokuapp.com/api', true);

    xhr.getResponseHeader('Content-type', 'application/json');
    
    xhr.onload = function () {
       if(this.status === 200){
        video_list = this.responseText
       }
       else {
        video_list = "Some error occured"
       }
   }

   obj = '{"username":"'+ username + '"}';
   xhr.send(obj);
}


function pageSelecter(s,username){
    if (s.indexOf('watch') > 0){
        console.log('on share page');
        this.addJsFunctions();
        this.addHTMLFunctions();
        this.shareButton();
        
    }
    else{
        console.log('on main page');
        this.fetchVideos(username);
        
        // checking for video list 
        chrome.runtime.sendMessage({video: this.video_list}, function(response) {
            console.log(this.video_list, 'sent to back');
        });
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // listen for messages sent from background.js
      if (request.message === 'hello!') {
        console.log(request.url); // new url is now in content scripts!
        this.pageSelecter(request.url,username);
        console.log(username);
      }
});

   
