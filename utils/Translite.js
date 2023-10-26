export function transliterate(text) {
  const cyrillic = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return text
    .split('')
    .map(char => {
      const index = cyrillic.indexOf(char);
      return index !== -1 ? latin[index] : char;
    })
    .join('');
}