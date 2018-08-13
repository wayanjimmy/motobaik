import { currency } from '../../utils'
import RentCalculator from '../../RentCalculator'

const table = (generator, startY) => {
  const { rent, doc, padding } = generator

  const columns = ['Vehicle', 'Started At', 'Duration', 'Price', 'Total Price']
  let data = []

  const fontSize = 3.5
  const cellPadding = 2.5
  const lineWidth = 0.3
  const headerHeight = fontSize + cellPadding * 2 + lineWidth * 2
  const endY = startY + headerHeight

  const startedAt = new Date(rent.started_at).toDateString()
  const calc = new RentCalculator(rent.started_at, rent.finished_at, rent.price)

  let duration = 0
  let totalPrice = 0
  let type = 'days'
  if (rent.daily) {
    duration = calc.diffInDays()
    totalPrice = calc.totalPriceInDays()
  } else {
    duration = calc.diffInMonths()
    totalPrice = calc.totalPriceInMonths()
  }

  data.push([
    `${rent.vehicle.police_number} - ${rent.vehicle.brand}`,
    startedAt,
    `${duration} ${type}`,
    currency(rent.price),
    currency(totalPrice),
  ])

  doc.autoTable(columns, data, {
    startY,
    margin: {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
    },
    theme: 'grid',
    styles: {
      cellPadding,
      lineWidth,
      lineColor: 230,
    },
    headerStyle: {
      fillColor: 246,
      textColor: 51,
    },
    columnStyles: {
      0: { columnWidth: 50 },
      1: { columnWidth: 45 },
    },
  })

  return endY
}

export default table
