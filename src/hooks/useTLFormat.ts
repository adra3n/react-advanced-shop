const useTLFormatter = (value: number = 0): string => {
  let formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  })
  let formatted = formatter.format(value)
  return formatted.replace(/,00|₺/g, '')
}

export default useTLFormatter
