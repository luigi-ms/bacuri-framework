const radioBtns = document.getElementsByClassName("radio");
const radioGroup = document.getElementsByClassName("radio-group");

let radioGroupsCounter = 0;

/* Add a group name to radio inputs */
Array.from(radioBtns).forEach((radioEl) => {
  const isInRadioGroup = radioEl.parentNode.className === "btn-group-item";

  if (isInRadioGroup) {
    Array.from(radioGroup).forEach((fieldset) => {
      let groupName = `group-${radioGroupsCounter}`;

      fieldset.childNodes.forEach((label) => {
        if (label.className === "btn-group-item") {
          label.childNodes[3].name = groupName;
        }
      });

      radioGroupsCounter += 1;
    });
  }
});
