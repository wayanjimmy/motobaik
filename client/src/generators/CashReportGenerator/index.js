import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../logo.png'
import generateTable from './table'
import generateTotal from './total'
import { randomString } from '../../utils'

export default class CashReportGenerator {
  doc = new jsPDF()
  page = {
    width: 220,
  }
  padding = 0

  constructor(rents, month, options = {}) {
    this.rents = rents
    this.month = month
    this.padding = options.padding ? options.padding : 0
  }

  save() {
    this.doc.save(`${randomString()}.pdf`)
  }

  generate() {
    let title = 'Cash Monthly Report'

    this.doc.setProperties({
      title,
    })

    return new Promise(resolve => {
      this.doc.addImage(logo, 'PNG', this.padding, this.padding)

      const logoOffset = 26
      this.doc.setDrawColor(220)
      this.doc.line(
        this.padding,
        logoOffset,
        this.page.width - 2 * this.padding,
        logoOffset
      )

      const tableEndY = generateTable(this, 30)
      generateTotal(this, tableEndY + 15)

      resolve(this.doc)
    })
  }
}
