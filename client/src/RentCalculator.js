import moment from 'moment'

export default class RentCalculator {
  constructor(startedAt, finishedAt, price = 0) {
    this.startedAt = startedAt
    this.finishedAt = finishedAt
    this.price = price
  }

  diffInDays() {
    const startedTime = moment(this.startedAt)
    const finishedTime = moment(this.finishedAt)

    return finishedTime.diff(startedTime, 'days')
  }

  diffInMonths() {
    const startedTime = moment(this.startedAt)
    const finishedTime = moment(this.finishedAt)

    const diff = finishedTime.diff(startedTime, 'months')
    if (diff === 0) {
      return 1
    }
    return diff
  }

  totalPriceInDays() {
    return this.price * this.diffInDays()
  }

  totalPriceInMonths() {
    return this.price * this.diffInMonths()
  }
}
