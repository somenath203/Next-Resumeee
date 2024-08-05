import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2C1D79",
          borderRadius: 2,
        },
        components : {
            Button : {
                controlHeight: 42,
                controlOutline : 'none'
            },
            Input : {
                controlHeight: 42,
                controlOutline : 'none'
            }
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;