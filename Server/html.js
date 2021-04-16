function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function doGet() {
  return HtmlService
    .createTemplateFromFile('App/index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}