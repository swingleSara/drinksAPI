const deleteText = document.querySelectorAll(".fa-trash");
const thumbText = document.querySelectorAll(".fa-thumbs-up");

Array.from(deleteText).forEach((element) => {
  element.addEventListener("click", deleteDrink);
});

Array.from(thumbText).forEach((element) => {
  element.addEventListener("click", addunits);
});

async function deleteDrink() {
  const type = this.parentNode.childNodes[1].innerText;
  const subtype = this.parentNode.childNodes[3].innerText;
  const name = this.parentNode.childNodes[5].innerText;
  const content = this.parentNode.childNodes[7].innerText;
  const measurement = this.parentNode.childNodes[9].innerText;
  const units = Number(this.parentNode.childNodes[11].innerText);
  try {
    const response = await fetch("deleteDrink", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeS: type,
        subtypeS: subtype,
        nameS: name,
        contentS: content,
        measurementS: measurement,
        unitsS: units,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function addunits() {
  const type = this.parentNode.childNodes[1].innerText;
  const subtype = this.parentNode.childNodes[3].innerText;
  const name = this.parentNode.childNodes[5].innerText;
  const content = Number(this.parentNode.childNodes[7].innerText);
  const measurement = this.parentNode.childNodes[9].innerText;
  const units = Number(this.parentNode.childNodes[11].innerText);
  try {
    const response = await fetch("addunits", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        typeS: type,
        subtypeS: subtype,
        nameS: name,
        contentS: content,
        measurementS: measurement,
        unitsS: units,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
