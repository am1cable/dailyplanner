import React from "react";
import Pages from "./pages/pages";
import { HashRouter as Router } from "react-router-dom";
import "./App.scss";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FF6A00',
      main: '#FF6A00',
      dark: '#FF6A00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
export const App = () => (
  <div className="daily-planner">
    <Router><ThemeProvider theme={theme}>
    <Pages />
    </ThemeProvider>
  </Router>
  </div>
);

export default App;