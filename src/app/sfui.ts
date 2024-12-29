import localFont from "next/font/local";

const sfui = localFont({
  src: [
    {
      path: "./fonts/SFUIDisplay-Ultralight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Thin.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SFUIDisplay-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default sfui;
