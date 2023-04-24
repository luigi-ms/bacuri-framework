const radioBtns = document.getElementsByClassName('radio');
const radioGroup = document.getElementsByClassName('radio-group');

let radioGroupsCounter = 0;

Array.from(radioBtns).forEach(rb => {
  const isInRadioGroup = (rb.parentNode.className === "btn-group-item");

  if(isInRadioGroup){
    Array.from(radioGroup).forEach(fieldset => {
      let groupName = `group-${radioGroupsCounter}`;

      fieldset.childNodes.forEach(label => {
        if(label.className === "btn-group-item"){
          label.childNodes[3].name = groupName;
        }
      });

      radioGroupsCounter += 1;
    });
  }
});
