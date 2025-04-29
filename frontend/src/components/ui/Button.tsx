type ButtonProps = {
  title: JSX.Element | string;
  action?: () => void;
};

function Button({ title = <></>, action = () => {} }: ButtonProps) {
  return (
    <button
      className={`box-border rounded border-2 border-background-secondary bg-background-secondary p-3 font-bold text-text hover:text-text-secondary`}
      onClick={() => action()}
    >
      {title}
    </button>
  );
}

export default Button;
