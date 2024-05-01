/**
 * @title - prepareEventFiles
 * @description - Подготовить прикрепленные к мероприятию файлы для сохранения
 */

function prepareEventFiles(data) {
  let result = { documents: {} };
  data.forEach((item) => {
    switch (item.title) {
      case 'Логотип':
        result.documents.fileLogo = item.filesUpload.files[0];
        break;
      case 'Смета расходов':
        result.documents.fileCostings = item.filesUpload.files[0];
        break;
      case 'Перечень экспонентов (с кратким описанием компаний)':
        result.documents.fileListOfExhibitors = item.filesUpload.files[0];
        break;
      case 'Экспоплан':
        result.documents.filesExpoplan = item.filesUpload.files;
        break;
      case 'Протокол/сценарий':
        result.documents.filesProtocol = item.filesUpload.files;
        break;
      case 'График первых лиц':
        result.documents.filePresidentProgram = item.filesUpload.files[0];
        break;
      case 'Прочие документы':
        result.documents.filesOther = item.filesUpload.files;
        break;
    }
  });
  return result;
}
