export class  Navbar {
    public primaryBackground?: String ;
    public secondaryBackground?: String ;
    public folded?: Boolean ;
    public hidden?: Boolean ;
    public position?: String ;
    public variant?: String ;
}
export class  Toolbar {
    public customBackgroundColor?: Boolean ;
    public background?: String ;
    public hidden?: Boolean ;
    public position?: String ;
}
export class  Footer {
    public customBackgroundColor?: Boolean ;
    public background?: String ;
    public hidden?: Boolean ;
    public position?: String ;
}
export class  Sidepanel {
    public hidden?: Boolean ;
    public position?: String ;
}
export class  Layout {
    public style?: String ;
    public width?: String ;
    public navbar?: Navbar ;
    public toolbar?: Toolbar ;
    public footer?: Footer ;
    public sidepanel?: Sidepanel ;
}
export class  Fuseconfig{
    public colorTheme?: String ;
    public customScrollbars?: Boolean ;
    public layout?: Layout ;
}