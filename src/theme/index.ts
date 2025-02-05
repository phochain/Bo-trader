import {extendTheme, ThemeConfig} from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: "#011022",
        color: "#fff",
        fontFamily: "Sarabun, sans-serif",
        margin: 0,
        padding: 0,
      },
    },
  },
})

export const colors = {
  blue: '#007bff',
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#e83e8c',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#28a745',
  teal: '#20c997',
  cyan: '#17a2b8',
  white: '#fff',
  gray: '#6c757d',
  grayDark: '#2f3342',
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  info: '#17a2b8',
  warning: '#ffc107',
  danger: '#fc5f5f',
  light: '#f8f9fa',
  dark: '#343a40',
}
export const backgrounds = {
  dark: '#2a2a2a',
  colorText: '#252a2b',
  colorBg: '#f5f5f5',
  colortitle: '#333333',
  homeCollection1bg: '#831713',
  white: '#ffffff',
  footerBgcolor3: '#222222',
  grayDark: '#2f3342',
  gray: "#8b8d96",
  darkBlu: '#02142b',
  iconGray:"#1d233b"
}

export const borderColors = {
  white: 'hsla(0,0%,100%,.1)'
}
export default theme