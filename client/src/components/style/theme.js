import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { createMuiTheme } from '@material-ui/core/styles'


const breakpoints = createBreakpoints({})
const drawerWidth = 240;

const theme = createMuiTheme({
    root_content: {
        [breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,
        },
    },
    typography: {
     "fontFamily": `"Fredoka One", "Montserrat", "cursive", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500,
      h1: {
        fontFamily: "Fredoka One"
      },
      h2: {
        fontFamily: "Fredoka One"
      },
      h3: {
        fontFamily: "Fredoka One"
      },
      h4: {
        fontFamily: "Fredoka One"
      },
      button: {
        fontFamily: "Comic Sans MS"
      },
      span: {
        fontFamily: "Montserrat"
      } 
    }
})

export default theme