import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#62639B'
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    height: '100vh',
                    height: 'calc(var(--vh, 1vh) * 100)',
                    overflow: 'hidden',
                },
                body: {
                    width: '100%',
                    height: '100%',
                    // background: 'linear-gradient(rgb(56, 165, 255), rgb(0, 98, 255))',
                    background: grey[200],
                }
            }
        },
        MuiContainer: {
            variants: [
                {
                    props: { variant: ' inner' },
                    style: {
                        width: 1,
                        padding: '8px 0'
                    }
                }
            ]
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: '12px'
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    height: '3px',
                    borderRadius: '3px 3px 0 0'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                }
            },
            variants: [
                {
                    props: { format: 'square' },
                    style: {
                        minWidth: 0,
                        padding: '5px'
                    }
                }
            ]
        },
        MuiAvatar: {
            variants: [
                {
                    props: { size: 'small'},
                    style: {
                        width: '28px',
                        height: '28px',
                        fontSize: '14px'
                    }
                }
            ]
        },
        MuiLink: {
            styleOverrides: {
                root: ({ theme }) => ({
                    cursor: 'pointer',
                    textDecoration: 'none',
                    ':hover' : {
                        color: theme.palette.primary.light
                    }
                })
            }
        }
    }
})