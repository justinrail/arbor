// 默认 widgets
import defaultWidgets from 'vue-page-designer-widgets'
import vpd from '../mixins/vpd'
import slider from '../components/slider.vue'
import icon from '../components/icon.vue'

var widgets
var widgetStyle = {}

const install = (Vue, config = {}) => {
  if (install.installed) return

  widgets = Object.assign({}, defaultWidgets, config.widgets)
  // Vue.component([slider.name], slider)
  // Vue.component([icon.name], icon)
  Object.keys(widgets).forEach(key => {
    Vue.component(key, widgets[key])
    Vue.component(key, Vue.extend(widgets[key]).extend(vpd))
    // style panel
    if (widgets[key]['panel']) {
      const panel = Object.assign({}, widgets[key]['panel'], {
        type: key
      })
      Vue.component(panel.name, Vue.extend(panel).extend(vpd))
      widgetStyle[panel.name] = panel
      // remove panel from object
      delete widgets[key]['panel']
    }
  })
}

export default {
  install,
  getWidgets () {
    return widgets
  },
  getWidgetStyle () {
    return widgetStyle
  }
}
