import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../logo.png'
import generateHeader from './header'
import generateTable from './table'
import generateTotal from './total'
import { randomString } from '../../utils'

export default class RentReportGenerator {
  doc = new jsPDF()
  page = {
    width: 220,
  }
  padding = 0

  constructor(rent, options = {}) {
    this.rent = rent
    this.padding = options.padding ? options.padding : 0
  }

  save() {
    this.doc.save(`${randomString()}.pdf`)
  }

  generate() {
    this.doc.setProperties({
      title: 'Rent Report',
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

      generateHeader(this, 32)
      const tableEndY = generateTable(this, 75)
      generateTotal(this, tableEndY + 15)

      resolve(this.doc)
    })
  }
}
