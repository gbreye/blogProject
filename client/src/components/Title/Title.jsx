function Title({ as: Tag = 'h1', subtitle = false, className = '', children, ...props }) {
  const classes = [subtitle ? 'subtitle' : 'title', className].filter(Boolean).join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}

export default Title;
