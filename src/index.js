var buttonPress
document.addEventListener("DOMContentLoaded", () => {
  getAllDogs()

  const form = document.querySelector("#dog-form")
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    const dogId = buttonPress.id.split("-")[1]
    patchDog(e.target, dogId)
  })
})

function renderDogs(dogs) {
  const table = document.querySelector("#table-body")
  table.innerHTML = ""
  let dogRows = ""
  dogs.forEach(dog => {
    dogRows += makeDogRow(dog)
  })
  table.innerHTML = dogRows
  table.addEventListener("click", function(e) {
    const dogTr = e.target.parentElement.parentElement
    buttonPress = dogTr
    populateForm(dogTr)
  })
}

function makeDogRow(dog) {
  return `
    <tr id='dog-${dog.id}'>
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit ${dog.name}</button></td>
    </tr>
    `
}

function populateForm(dog) {
  const form = document.querySelector("#dog-form")
  let name = dog.children[0]
  let breed = dog.children[1]
  let sex = dog.children[2]
  form.name.value = name.innerText
  form.breed.value = breed.innerText
  form.sex.value = sex.innerText
}

function getAllDogs() {
  fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(function(dogs) {
      renderDogs(dogs)
    })
}

function patchDog(form, dogId) {
  fetch(` http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value
    })
  })
    .then(resp => resp.json())
    .then(function(response) {
      getAllDogs()
    })
}
