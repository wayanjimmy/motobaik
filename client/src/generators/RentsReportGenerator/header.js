const header = (generator, startY) => {
  let { customer } = generator
  const { month, doc, padding } = generator
  let columns = ['DETAIL']
  const now = new Date()

  if (!customer) {
    customer = {
      name: '-',
      phone: '-',
      address: '-',
    }
  }

  let data = [[`Customer : ${customer.name}`], [`Date : ${now.toDateString()}`]]
  const areaWidth = generator.page.width - 2 * padding
  const textColor = 80

  doc.autoTable(columns, data, {
    startY,
    margin: {
      left: padding - 2,
      right: padding + 2,
    },
    theme: 'plain',
    columnStyles: {
      0: { columnWidth: areaWidth * 0.66 },
      1: { columnWidth: areaWidth * 0.15 },
    },
    styles: {
      textColor,
    },
  })

  const customerDetailOffset = startY + 18
  data = []
  data.push(`Phone : ${customer.phone}`)
  data.push(`Address : ${customer.address}`)
  data.push(`Month : ${month}`)

  data = data.map(d => {
    return {
      0: d,
    }
  })
  doc.autoTable([''], data, {
    startY: customerDetailOffset,
    margin: {
      left: padding - 0.5,
      right: padding + 3.5,
    },
    theme: 'plain',
    styles: {
      cellPadding: 0.5,
      textColor,
    },
  })
}

export default header
