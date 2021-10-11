console.log('content file loaded!!!')

// var script = document.createElement('script');
// script.type = 'text/javascript';
// script.src = './js/custom.js';    

// document.getElementsByTagName('body')[0].appendChild(script);

function fun(){
    var template = `
    <div id="container">
        <div id="exampleModal" class="reveal-modal">
        ........
        <a href="#">Close Modal</a>
        </div>
    </div>
    `;

    template.style = `
    #container {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        visibility: hidden;
        display: none;
        background-color: rgba(22,22,22,0.5); /* complimenting your modal colors */
    }
    #container:target {
        visibility: visible;
        display: block;
    }
    `;

    document.getElementById("flex").appendChild(template);
    console.log("on click");
}

// function fun(){
//     console.log('fun');
// }

function myFunction() {
    console.log('in fun');
    var mid = document.getElementById("flex");
    var share = document.createElement("div");
    console.log('div found!!');
    share.innerHTML = `
    <script>
        function say(s){
            alert(s);
        }
    </script>
    <button id='ytshare' onclick='say('share clicked')'> share with friends </button>
    `
    mid.appendChild(share);
}


if (window.attachEvent) {window.attachEvent('onload', myFunction);}
else if (window.addEventListener) {window.addEventListener('load', myFunction, false);}
else {document.addEventListener('load', myFunction, false);}
  
if (window.attachEvent) {window.attachEvent('onload', myFunction);}
else if (window.addEventListener) {window.addEventListener('load', myFunction, false);}
else {document.addEventListener('load', myFunction, false);}