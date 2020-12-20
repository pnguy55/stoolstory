import createBreakpoints from '@material-ui/core/styles/createBreakpoints'
import { createMuiTheme } from '@material-ui/core/styles'
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';


const breakpoints = createBreakpoints({})
const drawerWidth = 240;

let theme = createMuiTheme({
    root_content: {
        [breakpoints.down('sm')]: {
            minHeight: '90vh',
            minWidth: '100vw',
        },
        [breakpoints.up('md')]: {
            minWidth: `calc(100vw - ${drawerWidth}px)`,            
            minHeight: '90vh',
        },
    },
    typography: {
     "fontFamily": `"Fredoka One", "Raleway", "cursive", sans-serif`,
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
        fontFamily: "Fredoka One"
      },
      span: {
        fontFamily: "Raleway"
      } 
    },
    palette: {
        primary: {
            light: '#CFB08D',
            main: '#87654D',
            contrastText: '#fff',
        },
        secondary: {
            main: '#283045',
            contrastText: 'fff',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
})
theme = responsiveFontSizes(theme);
export default theme