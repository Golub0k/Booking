/**
 * @title - sortByRoomTypeAndName
 * @description - Сортировать помещения сначала по наименованию типа помещения, а потом по наименованию помещения
 */

function sortByRoomTypeAndName(array) {
  return array.sort(function (a, b) {
    // Сначала сравниваем roomType.name
    const roomTypeA = a.roomType.name.toLowerCase();
    const roomTypeB = b.roomType.name.toLowerCase();
    if (roomTypeA < roomTypeB) return -1;
    if (roomTypeA > roomTypeB) return 1;

    // Если roomType.name одинаков, сравниваем name
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });
}
