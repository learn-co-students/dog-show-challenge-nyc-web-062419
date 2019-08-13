///////////////////////////////
//////////////DOM Content Load
document.addEventListener('DOMContentLoaded', () => {

////////////////////
////fetch invocation
fetchDogs()


///////////////////
////GET fetch dogs
function fetchDogs() {
    return fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(function(json){
        renderAllDogs(json)
    })
}


function renderAllDogs(dogs){
    let dogTable = document.querySelector("#table-body")
    dogTable.innerHTML = ""
    dogs.forEach(dog => {
        renderDog(dog)
    });
}


//////////////////////////////
////////render dogs from fetch
function renderDog(dog){
    let dogTable = document.querySelector("#table-body")
    dogTable.insertAdjacentHTML("beforeend", 
    `
    <tr class=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-btn" data-id="${dog.id}">Edit</button></td></tr>
    `
    )

}

////////////////////////////////////////////////
//////////////DOM element selector for the table
let dogTable = document.querySelector("#table-body")

//////////////////////////////////////////////
////////////////////edit button event listener
////passes dog to the edit form fetch function
dogTable.addEventListener("click", function(e){
    if(e.target.className === "edit-btn"){
        console.log(e.target.dataset.id)
        let dogId = e.target.dataset.id
        fetch (`http://localhost:3000/dogs/${dogId}`)
        .then(resp => resp.json())
        .then(dog => editForm(dog))
    } 
})

/////////////////////////////////
///////edit form with PATCH fetch
function editForm(dog){
    let dogNameInput =  document.querySelector("#dog-form > input[type=text]:nth-child(1)")
    let dogBreedInput =  document.querySelector("#dog-form > input[type=text]:nth-child(2)")
    let dogSexInput =  document.querySelector("#dog-form > input[type=text]:nth-child(3)")
    dogNameInput.value = dog.name
    dogBreedInput.value = dog.breed
    dogSexInput.value = dog.sex

    let dogForm = document.querySelector("form")

    dogForm.addEventListener("submit", function(e){
        e.preventDefault()
        id = parseInt(dog.id)
        
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: dogNameInput.value, breed: dogBreedInput.value, sex: dogSexInput.value})
        })
        .then(response => response.json())
        .then(function(dog){
            fetchDogs(dog)
        })
        dogForm.reset()
    })
}





//////////////////////////////
//////DOM Content Loaded close    
})