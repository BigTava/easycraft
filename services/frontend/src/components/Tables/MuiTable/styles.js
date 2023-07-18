// Styles
import { createTheme } from "@mui/material/styles";

export const theme = () =>
  createTheme({
    components: {
      MUIDataTable: {
        styleOverrides: {
          root: {
            boxShadow: "none !important",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#494d53",
            fontSize: "0.875rem",
            fontWeight: 600,
            fontFamily: "Inter",
            textTransform: "none",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: "#494d53",
            fontSize: "0.875rem",
            fontWeight: 600,
            fontFamily: "Inter",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#494d53",
            fontSize: "0.875rem",
            fontFamily: "Inter",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            padding: "24px 16px 24px 16px",
          },
        },
      },
    },
  });
