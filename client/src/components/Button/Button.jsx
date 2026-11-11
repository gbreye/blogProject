function Button({ type = 'button', className = '', children, ...props }) {
  return (
    <button type={type} className={`button ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;
