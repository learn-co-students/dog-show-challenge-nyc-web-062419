let dogs = [];
document.addEventListener("DOMContentLoaded", () => {
  const dogForm = document.getElementById("dog-form");
  const dogUrl = "http://localhost:3000/dogs";
  const tableBody = document.getElementById("table-body");
  let dogInfo;
  let opacity = 1;

  fetch(dogUrl)
    .then(resp => resp.json())
    .then(data => {
      dogs = data;
      data.forEach(renderDogs);
    });

  function renderDogs(dog) {
    tableBody.insertAdjacentHTML(
      "beforeend",
      `
            <tr data-id="${dog.id}">
            <td name="name">${dog.name}</td>
            <td name="breed">${dog.breed}</td> 
            <td name="sex">${dog.sex}</td> 
            <td><button data-dog-id="${dog.id}">Edit</button></td>
            </tr>
            `
    );
  }

  function findById(id) {
    return dogs.find(dog => dog.id === id);
  }

  tableBody.addEventListener("click", e => {
    //prettier ignore
    if (e.target.innerHTML === "Edit" && e.target.tagName === "BUTTON") {
      dogInfo = tableBody.querySelector(
        `[data-id="${e.target.dataset.dogId}"]`
      );
      const foundDog = findById(parseInt(e.target.dataset.dogId));
      plugInForm(foundDog);
    }
  });

  function plugInForm(dog) {
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
  }

  dogForm.addEventListener("submit", e => {
    e.preventDefault();
    if (dogInfo === undefined) {
      alert("Please select a dog to edit first");
    } else {
      updateDog(e.target);
    }
  });

  function updateDog(dog) {
    fetch(`${dogUrl}/${dogInfo.dataset.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: dog.name.value,
        breed: dog.breed.value,
        sex: dog.sex.value
      })
    })
      .then(resp => resp.json())
      .then(data => {
        renderUpdatedDog(data);
        dog.reset();
      });
  }

  function renderUpdatedDog(dog) {
    let dogArr = findById(dog.id);
    Object.keys(dogArr).map(function(key) {
      dogArr[key] = dog[key];
    });
    dogInfo.cells.name.innerText = dog.name;
    dogInfo.cells.breed.innerText = dog.breed;
    dogInfo.cells.sex.innerText = dog.sex;
    dogInfo.style.backgroundColor = "rgba(255, 0, 0, 1)";
    opacity = 1;
    let fader = setInterval(() => {
      dogInfo.style.backgroundColor = `rgba(255, 0, 0, ${opacity})`;
      opacity -= 0.01;
    }, 15);
  }
});
