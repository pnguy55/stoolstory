import { createContext } from 'react';

const MenuDrawerContext = createContext({
  mobileOpen: false,
  handleDrawerToggle: () => {},
});

export default MenuDrawerContext
