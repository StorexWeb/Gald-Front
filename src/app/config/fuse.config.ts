export const AppFuseConfig = {
    default: {
        // Color themes can be defined in src/app/app.theme.scss
        colorTheme      : 'theme-default',
        customScrollbars: true,
        layout          : {
            style    : 'vertical-layout-1',
            width    : 'fullwidth',
            navbar   : {
                primaryBackground  : 'fuse-navy-white-50',
                secondaryBackground: 'fuse-navy-50',
                folded             : false,
                hidden             : false,
                position           : 'left',
                variant            : 'vertical-style-1'
            },
            toolbar  : {
                customBackgroundColor: false,
                background           : 'fuse-white-500',
                hidden               : false,
                position             : 'below-static'
            },
            footer   : {
                customBackgroundColor: true,
                background           : 'fuse-navy-900',
                hidden               : false,
                position             : 'below-fixed'
            },
            sidepanel: {
                hidden  : false,
                position: 'right'
            }
        }
    },
    login: {
        layout: {
            navbar: {
                hidden: true
            },
            toolbar: {
                hidden: true
            },
            footer: {
                hidden: true
            },
            sidepanel: {
                hidden: true
            }
        }
    },
} ;