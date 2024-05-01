/**
 * @title - getCurators
 * @description - Подготовить данные об изменениях в списке организаторов
 */

function getCurators(eventData) {
  const result = [];

  const curatorsOld = eventData.eventOld.curators;
  const curatorsNew = eventData.eventNew.curators;

  const maxCurators = Math.max(curatorsOld.length, curatorsNew.length);

  for (let i = 0; i < maxCurators; i++) {
    const curatorOld = i < curatorsOld.length ? curatorsOld[i].user : null;
    const curatorNew = i < curatorsNew.length ? curatorsNew[i].user : null;

    const oldValue = curatorOld ? `${curatorOld.fullName} <br> ${curatorOld.phoneView}` : null;
    const newValue = curatorNew ? `${curatorNew.fullName} <br> ${curatorNew.phoneView}` : null;

    result.push({
      name: 'Куратор ' + (i + 1),
      oldValue: oldValue,
      newValue: newValue,
    });
  }

  return result;
}
