/**
 * @title - getOrganizers
 * @description - Подготовить данные об изменениях в списке организаторов
 */

function getOrganizers(eventData) {
  const result = [];

  const organizersOld = eventData.eventOld.organizers;
  const organizersNew = eventData.eventNew.organizers;

  const maxOrganizers = Math.max(organizersOld.length, organizersNew.length);

  for (let i = 0; i < maxOrganizers; i++) {
    const organizerOld = i < organizersOld.length ? organizersOld[i].partner : null;
    const organizerNew = i < organizersNew.length ? organizersNew[i].partner : null;

    const oldValue = organizerOld
      ? `${organizerOld.name}<br>${organizerOld.mainContactPerson.fullName} <br> ${organizerOld.mainContactPerson.phone}`
      : null;
    const newValue = organizerNew
      ? `${organizerNew.name}<br>${organizerNew.mainContactPerson.fullName} <br> ${organizerNew.mainContactPerson.phone}`
      : null;

    result.push({
      name: 'Контрагент ' + (i + 1),
      oldValue: oldValue,
      newValue: newValue,
    });
  }

  return result;
}
