export interface SideMenuProps {
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
  container: (() => HTMLElement) | undefined;
  drawerWidth: number;
  mainBg:string;
}

export interface MenuItem {
  id: number;
  title: string;
  icon: JSX.Element;
  iconActive: JSX.Element;
  slug: string;
  activekey: string;
}
