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

Vue.use(Loading.directive)

// elementui 组件注册
eleComponents.forEach(useElementui)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;