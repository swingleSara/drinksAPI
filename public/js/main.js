const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteDrink);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addUnit);
});

async function deleteDrink() {
  const type = this.parentNode.childNodes[1].innerText;
  const subType = this.parentNode.childNodes[3].innerText;
  try {
    const response = await fetch("deleteDrink", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeS: type,
        subTypeS: subType,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addUnit() {
  const type = this.parentNode.childNodes[1].innerText;
  const subType = this.parentNode.childNodes[3].innerText;
  const tUnits = Number(this.parentNode.childNodes[5].innerText);
  try {
    const response = await fetch("addOneUnit", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeS: type,
        subtTypeS: subType,
        unitsS: tUnits,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
