import moment from 'moment'

function formatDate (date, options = {}) {
  const { format = 'DD/MM/YYYY - hh:mm:ss', isGetFromNow = true } = options
  if (
    ['boolean', 'undefined'].indexOf(typeof date) === -1 &&
    (!Number(date) || Number(date) > 24339600000)
  ) {
    const tmpDate = moment(date)
    if (date && String(tmpDate) !== 'Invalid Date') {
      if (isGetFromNow && moment().isSame(tmpDate, 'day')) {
        return tmpDate.fromNow()
      }
      return tmpDate.format(format)
    }
  }

  return date
}

import Popup from '../components/Popup.vue'

export default {
  install: (app, options) => {
    app.mixin({
      components: {
        Popup
      },
      filters: {
        formatDate
      },
      data: () =>  ({
        apiUrl: import.meta.env.VITE_API_URL
      }),
      methods: {
        formatDate,
        goBack (n = -1) {
          this.$router.go(n)
        },
        goTo (route, newTab) {
          if (newTab === true || (newTab instanceof MouseEvent && newTab.ctrlKey) || (newTab instanceof MouseEvent && newTab.type === 'mouseup' && newTab.which === 2)) {
            const routeData = this.$router.resolve(route)
            return window.open(routeData.href, '_blank')
          }
          this.$router.push(route)
        }
      }
    });
  },
};