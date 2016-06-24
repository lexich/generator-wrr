import React from "react";

export default function(Component, overwriteStyle) {
  function WrapComponent(props) {
    return (<Component {...props} />);
  }

  const defaultProps = Component.defaultProps || {};
  const style = defaultProps.style || {};

  WrapComponent.propTypes = { ...Component.propTypes };

  if (!WrapComponent.propTypes.style) {
    WrapComponent.propTypes.style = React.PropTypes.object.isRequired;
  }

  WrapComponent.defaultProps = {
    ...defaultProps,
    style: {
      ...style,
      ...overwriteStyle
    }
  };
  return WrapComponent;
}
