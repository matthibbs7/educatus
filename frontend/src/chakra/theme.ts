import { extendTheme } from "@chakra-ui/react";
import "@fontsource/nunito-sans";
export const theme = extendTheme({
    colors: {
        brand: {
            100: "#29CC98",
            900: "#1a202c",
        }
    },
    fonts: {
        body: `"Nunito Sans"`,
    },
    styles: {
        global: () => ({
            body: {
                bg: "#212427",
            }
        })
    }
})
