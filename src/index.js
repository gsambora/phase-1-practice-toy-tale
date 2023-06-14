let addToy = false;

function makeNewToy(toy){
  const addToy = document.createElement("div");
      //console.log("I received "+ name + " "+ image +" "+ likes)
      addToy.classList.add("card");

      const toyName = document.createElement("h2");
        toyName.innerHTML = toy.name;
      const toyPic = document.createElement("img");
        toyPic.src = toy.image;
        toyPic.classList.add("toy-avatar");
      const toyLikes = document.createElement("p");
        toyLikes.innerHTML = toy.likes + " Likes"
      const toyButton = document.createElement("button");
        toyButton.classList.add("like-btn")
        toyButton.id = "toy_" + toy.id
        toyButton.innerHTML = "Like ❤️"
        toyLikeUpdate(toyButton, toy.id)

      addToy.append(toyName, toyPic, toyLikes, toyButton)
      document.querySelector("#toy-collection").append(addToy)
}

function toyLikeUpdate(button, id){
  
  button.addEventListener("click", () =>{
    let currentLikes = button.parentNode.children[2].innerHTML.slice(0,-6)
    let newLikes = parseInt(currentLikes)+1

    fetch("http://localhost:3000/toys/"+id, {method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      
      body: JSON.stringify({
        "likes": newLikes})}
    )
    .then(function(response){return response.json()})
    .then(function(data){
      button.parentNode.children[2].innerHTML = data.likes +" Likes"
    })
  })
}
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //Starting toys
  fetch("http://localhost:3000/toys", {method: 'GET'})
  .then(function(response){return response.json()})
  .then(function(data){
    data.forEach(function(toy){
      //console.log(toy)
      makeNewToy(toy)
    })
    
  })

  //New toy form
  //Test url https://wallpapers.com/images/featured/vyc64jzpmoc073gd.jpg
  let form = document.querySelector(".add-toy-form")
  form.addEventListener('submit', (e) =>{
    e.preventDefault()
    //console.log(e.target)
    const inputs = e.target.querySelectorAll("input")
    //newToyCard(inputs[0].value, inputs[1].value)

    fetch("http://localhost:3000/toys",{ method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      
      body: JSON.stringify({
        "name": inputs[0].value,
        "image": inputs[1].value,
        "likes": 0
      })})
      .then(response => response.json())
      .then(data=> makeNewToy(data))
      
    form.reset()

  })
  
  //Toy likes




})
