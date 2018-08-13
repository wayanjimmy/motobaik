import { currency } from '../../utils'
import RentCalculator from '../../RentCalculator'

const total = (generator, startY) => {
  let { rents } = generator
  const { doc, padding } = generator

  const fontSize = 3.5
  const cellPadding = 2.5
  const lineWidth = 0.3
  const areaWidth = generator.page.width - 2 * padding

  const grandTotalPrice = rents.reduce((carrier, rent) => {
    const calc = new RentCalculator(
      rent.started_at,
      rent.finished_at,
      +rent.price
    )
    let totalPrice = calc.totalPriceInDays()

    if (!rent.daily) {
      totalPrice = calc.totalPriceInMonths()
    }

    return carrier + totalPrice
  }, 0)

  const totalCompany = rents.reduce(
    (carrier, rent) => (carrier += parseFloat(rent.company_cash)),
    0
  )

  const totalCommission = rents.reduce((carrier, rent) => {
    const calc = new RentCalculator(
      rent.started_at,
      rent.finished_at,
      +rent.price
    )
    let totalPrice = calc.totalPriceInDays()

    if (!rent.daily) {
      totalPrice = calc.totalPriceInMonths()
    }
    const companyCash = parseFloat(rent.company_cash)

    return (carrier += totalPrice - companyCash)
  }, 0)

  const data = [
    ['Total', currency(grandTotalPrice)],
    ['Total Company', currency(totalCompany)],
    ['Total Commission', currency(totalCommission)],
  ]

  const startX = padding + 118
  doc.autoTable(['', ''], data, {
    startY,
    showHeader: 'never',
    margin: {
      top: padding,
      bottom: padding,
      left: startX,
      right: padding,
    },
    theme: 'plain',
    styles: {
      cellPadding,
      textColor: 80,
    },
    columnStyles: {
      0: {
        fontStyle: 'bold',
      },
      1: {
        halign: 'right',
      },
    },
    drawCell: (cell, data) => {
      if (data.row.index === 2 && data.column.index === 1) {
        doc.setFontStyle('bold')
        doc.autoTableText(cell.raw, cell.textPos.x, cell.textPos.y, cell.styles)
        return false
      }
    },
  })

  const rowHeight = fontSize + cellPadding * 2 + lineWidth
  doc.setDrawColor(230)
  doc.setLineWidth(lineWidth)
  doc.line(startX, startY, areaWidth, startY)
  doc.line(startX, startY + rowHeight, areaWidth, startY + rowHeight)
  doc.line(startX, startY + rowHeight * 2, areaWidth, startY + rowHeight * 2)

  return startY + 3 * (fontSize + cellPadding * 2 + lineWidth)
}

export default total
