export const formatMoney = (number?: number | string |null) =>{
  if (typeof number == 'number'){
    return number?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  return number
}


export const getPG = (word: string, plural?: boolean, genre?: 'M' | 'F') => {
  if (genre) {
    if (word.endsWith('o')) {
      word = word.substring(0, word.length - 1) + 'a';
    } else if (word.endsWith('a')) {
      word = word.substring(0, word.length - 1) + 'o';
    }
  }

  if (plural) {
    const original = word;
    for (const i of 'aeiou') {
      if (original == word && original.endsWith(i)) {
        word = word + 's';
      }
    }
    if (original == word) {
      word = word + 'es';
    }
  }
  return word;
};
