import Vue from 'vue'
import { 
  Button, 
  Table, TableColumn, 
  Checkbox, 
  Tabs, TabPane,
  Pagination,
  Breadcrumb, BreadcrumbItem,
  Tag,
  Form, FormItem,
  Dialog,
  Input, Select, Option, Col,
  Icon,
  Card,
  Popover,
  Upload,
  Row,
  Menu, MenuItem, MenuItemGroup, Submenu,
  Dropdown, DropdownMenu, DropdownItem,
  Empty,
  Notification, MessageBox, Popconfirm,
  Tooltip,
  Loading,
  DatePicker, TimePicker
 } from 'element-ui'

const eleComponents = [
  Button, 
  Table, TableColumn, 
  Checkbox, 
  Tabs, TabPane,
  Pagination,
  Breadcrumb, BreadcrumbItem,
  Tag,
  Form, FormItem,
  Dialog,
  Input, Select, Option, Col,
  Icon,
  Card,
  Popover,
  Upload,
  Row,
  Menu, MenuItem, MenuItemGroup, Submenu,
  Dropdown, DropdownMenu, DropdownItem,
  Empty,
  Popconfirm,
  Tooltip,
  // Loading,
  DatePicker, TimePicker
]

const useElementui = function(component){
  Vue.use(component)
}

// elementui 组件注册
eleComponents.forEach(useElementui)


const {service, directive} = Loading
const {alert, confirm, prompt} = MessageBox
const {info, success, warning} = Notification

Vue.use(directive)
Vue.prototype.$loading = service

Vue.prototype.$info = info
Vue.prototype.$success = success
Vue.prototype.$warning = warning


Vue.prototype.$alert = alert
Vue.prototype.$confirm = confirm
Vue.prototype.$prompt = prompt
