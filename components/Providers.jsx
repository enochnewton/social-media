import ThemeRegistry from "@utils/theme";
import MyProvider from "@state/MyProvider";

const Providers = ({ children }) => {
  return (
    <MyProvider>
      <ThemeRegistry>{children}</ThemeRegistry>
    </MyProvider>
  );
};

export default Providers;
