const mapObj: any = {
  ' ': "",
  ',': ".",
};

export const normalizeNumber = (number: string) => {
  return parseFloat(number.replace(/\s|,/g, function(matched){
      return mapObj[matched];
    }))
}

export const normalizeDisplayNumber = (rate: number, number: string) => {
  return parseFloat((rate * normalizeNumber(number)).toFixed(5)).toString()
}