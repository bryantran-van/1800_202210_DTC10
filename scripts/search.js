//const searchInput = document.querySelector("[data-search]")
//let users = []
//
//searchInput.addEventListener("input", e => {
//
//  const value = e.target.value.toLowerCase()
//  console.log(value)
//  users.forEach(user => {
//    const isVisible =
//      user.name.toLowerCase().includes(value) ||
//      user.email.toLowerCase().includes(value)
//    user.element.classList.toggle("hide", !isVisible)
//  })
//})

//function myFunction() {
//    var input, filter, ul, li, a, i, txtValue;
//    input = document.getElementById("search");
//    filter = input.value.toUpperCase();
//    ul = document.getElementById("myUL");
//    li = ul.getElementsByTagName("li");
//    for (i = 0; i < li.length; i++) {
//        a = li[i].getElementsByTagName("a")[0];
//        txtValue = a.textContent || a.innerText;
//        if (txtValue.toUpperCase().indexOf(filter) > -1) {
//            li[i].style.display = "";
//        } else {
//            li[i].style.display = "none";
//        }
//    }
//}

//$(document).ready(function(){
//  $("#search").on("keyup", function() {
//    var value = $(this).val().toLowerCase();
//    $("#container *").filter(function() {
//      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//    });
//  });
//});

var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
//        console.log(currentUser);

        // the following functions are always called when someone is logged in
//        populateCardsDynamically();
//        displaySearchValue();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../html/login.html";
    }
});


function displaySearchValue(){
    let userCardTemplate = document.getElementById("hikeCardTemplate");
    let userCardGroup = document.getElementById("hikeCardGroup");
//    console.log(document.getElementById("mySearch"));
    var x = document.getElementById("mySearch").value;
//    z = console.log(document.getElementById("mySearch"));
//    w = $("mySearch").val();
//    console.log(z);
//    console.log(w);
//    console.log(x);
//    alert (x);

db.collection("users").where("name", ">=", x).limit(5)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            var userName = doc.data().name;
            var hikeID = doc.data().userID;
            console.log(doc.userID, " => ", doc.data());
                let userCard = userCardTemplate.content.cloneNode(true);
                userCard.querySelector('.card-title').innerHTML = userName;
                 //gets the unique ID field
              userCard.querySelector('a').onclick = () => setHikeData(hikeID);
              userCard.querySelector('.read-more').href = "../html/other-user-profile.html?hikeName="+userName +"&id=" + hikeID;
//                NEW LINE: update to display length, duration, last updated
//                testHikeCard.querySelector('.card-length').innerHTML =
//                "Length: " + doc.data().length + " km <br>" +
//                "Duration: " + doc.data().length_time + "min <br>" +
//                "Last updated: " + doc.data().last_updated.toDate();
//                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
//                testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
//                next 2 lines are new for demo#11
//                this line sets the id attribute for the <i> tag in the format of "save-hikeID"
//                so later we know which hike to bookmark based on which hike was clicked
//                ps. this works because we have only one icon.
//                if you have other icons, you will need a unique selector
//                testHikeCard.querySelector('i').id = 'save-' + hikeID;
//                 this line will call a function to save the hikes to the user's document
//                testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);
//                testHikeCard.querySelector('img').src = `./images/${hikeID}.jp
                userCardGroup.appendChild(userCard);
        });
    });
}
//displaySearchValue();

function setup(){

   $("#mySearch").click(displaySearchValue);
}

function setHikeData(userID){
    localStorage.setItem ('hikeID', userID);
}

jQuery(document).ready(setup)

//function populateCardsDynamically() {
//    let userCardTemplate = document.getElementById("hikeCardTemplate");
//    let userCardGroup = document.getElementById("hikeCardGroup");
//
//    db.collection("users")           //NEW LINE;  what do you want to sort by?
//        .limit(10)                       //NEW LINE:  how many do you want to get?
//        .get()
//        .then(allUsers => {
//            allUsers.forEach(doc => {
//                var userName = doc.data().name; //gets the name field
////                var hikeID = doc.data().id; //gets the unique ID field
////                var hikeLength = doc.data().length; //gets the length field
//
//                let userCard = userCardTemplate.content.cloneNode(true);
//                userCard.querySelector('.card-title').innerHTML = userName;
////
////                NEW LINE: update to display length, duration, last updated
////                testHikeCard.querySelector('.card-length').innerHTML =
////                "Length: " + doc.data().length + " km <br>" +
////                "Duration: " + doc.data().length_time + "min <br>" +
////                "Last updated: " + doc.data().last_updated.toDate();
////
////                testHikeCard.querySelector('a').onclick = () => setHikeData(hikeID);
////                testHikeCard.querySelector('.read-more').href = "eachHike.html?hikeName="+hikeName +"&id=" + hikeID;
////                next 2 lines are new for demo#11
////                this line sets the id attribute for the <i> tag in the format of "save-hikeID"
////                so later we know which hike to bookmark based on which hike was clicked
////                ps. this works because we have only one icon.
////                if you have other icons, you will need a unique selector
////                testHikeCard.querySelector('i').id = 'save-' + hikeID;
////                 this line will call a function to save the hikes to the user's document
////                testHikeCard.querySelector('i').onclick = () => saveBookmark(hikeID);
////
////                testHikeCard.querySelector('img').src = `./images/${hikeID}.jpg`;
//                userCardGroup.appendChild(userCard);
//            })
//        })
//}

//populateCardsDynamically();


//function myFunction() {
//  var input, filter, table, tr, td, i, txtValue;
//  input = document.getElementById("search");
//  filter = input.value.toUpperCase();
//  table = document.getElementsByClassName("user-cards");
//  tr = document.getElementsByClassName("cards");
//  for (i = 0; i < tr.length; i++) {
//    td = tr[i].getElementsByClassName("td")[0];
//    if (td) {
//      txtValue = td.textContent || td.innerText;
//      if (txtValue.toUpperCase().indexOf(filter) > -1) {
//        tr[i].style.display = "";
//      } else {
//        tr[i].style.display = "none";
//      }
//    }
//  }
//}

//function saveBookmark(hikeID) {
//    currentUser.set({
//            bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeID)
//        }, {
//            merge: true
//        })
//        .then(function () {
//            console.log("bookmark has been saved for: " + currentUser);
//            var iconID = 'save-' + hikeID;
//            //console.log(iconID);
//            document.getElementById(iconID).innerText = 'bookmark';
//        });
//}


//--------------------------------------------------------------
// This function saves the current hikeID into the localStorage
//--------------------------------------------------------------



//const userCardTemplate = document.querySelector("[data-user-template]")
//const userCardContainer = document.querySelector("[data-user-cards-container]")

//
//fetch("https://jsonplaceholder.typicode.com/users")
//  .then(res => res.json())
//  .then(data => {
//    users = data.map(user => {
//      const card = userCardTemplate.content.cloneNode(true).children[0]
//      const header = card.querySelector("[data-header]")
//      const body = card.querySelector("[data-body]")
//      header.textContent = user.name
//      body.textContent = user.email
//      userCardContainer.append(card)
//      return { name: user.name, email: user.email, element: card }
//    })
//  })

//function search(name){
//    var div=document.getElementById('user-card');
//    var _name= document.createElement('h2');
//
//    _name.innerHTML='Name: '+name;
//    div.appendChild(_name);
//}
//
//function getSearch(){
//
//    firebase.data().ref('users').once('value',function(snapshot){
//        snapshot.forEach(
//            function(ChildSnapshot){
//                let name = ChildSnapshot.val().name;
//                search(name);
//            }
//        )
//
//    })
//}