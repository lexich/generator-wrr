import <%= props.componentName %> from "components/<%= props.componentName %>";
import styleCSS from "./<%= props.finalName %>.css";
import applyStyle from "wrr-applystyle";

const Wrapper = applyStyle(Hello, styleCSS);
export default Wrapper;
