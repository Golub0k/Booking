/**
 * @title - prepareMainContactPerson
 * @description - Подготовка контактных лиц
 */

function prepareMainContactPerson(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let partner = arr[i].partner;
    let name = partner.mainContactPerson.fullName;
    let phone = partner.mainContactPerson.phone;
    result.push(name + ',\n' + phone);
  }
  return result;
}
