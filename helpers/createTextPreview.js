export const createTextPreview = (fullText, symbolsLimit) => {
  let textPreview;
  if (fullText.length < symbolsLimit) textPreview = fullText;
  else textPreview = fullText.slice(0, symbolsLimit).concat("...");

  return textPreview;
};
