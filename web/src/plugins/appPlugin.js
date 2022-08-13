import moment from 'moment'

function formatDate (date, options = {}) {
  const { format = 'DD/MM/YYYY - hh:mm:ss', isGetFromNow = false } = options
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
import Axios from 'axios'

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
        downloadItem (url) {
          Axios.get(url, { responseType: 'blob' })
            .then(response => {
              const blob = new Blob([response.data], { type: 'application/pdf' })
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              const splitted = url.split('/')
              link.download = splitted[splitted.length - 1]
              link.click()
              URL.revokeObjectURL(link.href)
            }).catch(console.error)
        },
        avatarUrl(user) {
          let fileName
          if (user.avatar) {
            fileName = `avatar/${user.avatar}`
          } else {
            fileName = `default-avatar-${user.gender || 'male'}.png`
          }
          return `${this.apiUrl}/${fileName}`
        },
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