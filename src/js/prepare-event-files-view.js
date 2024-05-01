/**
 * @title - prepareEventFilesView
 * @description - Подготовить прикрепленные к мероприятию файлы для отображения
 */

function prepareEventFilesView(input) {
  const output = [];

  if (input.fileLogo) {
    output.push({
      title: 'Логотип',
      requirements: 'Файл в формате .png/.jpeg',
      files: [input.fileLogo],
    });
  } else {
    output.push({
      title: 'Логотип',
      requirements: 'Файл в формате .png/.jpeg',
      files: [],
    });
  }

  if (input.fileCostings) {
    output.push({
      title: 'Смета расходов',
      requirements: 'Файл в формате .pdf',
      files: [input.fileCostings],
    });
  } else {
    output.push({
      title: 'Смета расходов',
      requirements: 'Файл в формате .pdf',
      files: [],
    });
  }

  if (input.fileListOfExhibitors) {
    output.push({
      title: 'Перечень экспонентов (с кратким описанием компаний)',
      requirements: 'Файл в формате .docx/.xls/.xlsx',
      files: [input.fileListOfExhibitors],
    });
  } else {
    output.push({
      title: 'Перечень экспонентов (с кратким описанием компаний)',
      requirements: 'Файл в формате .docx/.xls/.xlsx',
      files: [],
    });
  }

  output.push({
    title: 'Экспоплан',
    requirements: 'Файл в формате .pdf',
    files: input.filesExpoplan,
  });

  output.push({
    title: 'Протокол/сценарий',
    requirements: 'Файл в формате .docx',
    files: input.filesProtocol,
  });

  if (input.filePresidentProgram) {
    output.push({
      title: 'График первых лиц',
      requirements: 'Файл в формате .docx',
      files: [input.filePresidentProgram],
    });
  } else {
    output.push({
      title: 'График первых лиц',
      requirements: 'Файл в формате .docx',
      files: [],
    });
  }

  output.push({
    title: 'Прочие документы',
    requirements: '',
    files: input.filesOther,
  });

  return output;
}
