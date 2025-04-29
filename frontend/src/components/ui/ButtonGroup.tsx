import { useRef, useState } from 'react';

type ButtonGroupProps = {
  buttons: {
    title: JSX.Element;
    action?: () => void;
  }[];
  defaultActiveButtonIndex?: number;
  vertical?: boolean;
};

function ButtonGroup({
  buttons = [],
  defaultActiveButtonIndex,
  vertical,
}: ButtonGroupProps) {
  const [activeButton, setActiveButton] = useState<HTMLButtonElement | null>(
    null,
  );
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (defaultActiveButtonIndex === undefined) {
    defaultActiveButtonIndex = 0;
  }

  function setRef(index: number, ref: HTMLButtonElement | null) {
    if (
      index === defaultActiveButtonIndex &&
      !activeButton &&
      !buttonRefs.current[index]
    ) {
      buttonRefs.current[index] = ref;
      updateActiveButton(index);
    }
    buttonRefs.current[index] = ref;
  }

  function isActive(index: number) {
    return buttonRefs.current.indexOf(activeButton) === index;
  }

  function activeButtonStyle() {
    if (activeButton) {
      return {
        width: `${activeButton.offsetWidth}px`,
        height: `${activeButton.offsetHeight}px`,
        left: `${activeButton.offsetLeft}px`,
        top: `${activeButton.offsetTop}px`,
      };
    }
    return {};
  }

  function updateActiveButton(index: number) {
    const button = buttonRefs.current?.[index] ?? null;
    setActiveButton(button);
    if (button) {
      buttons[index]?.action?.();
    }
  }

  return (
    <div
      className={`relative w-fit rounded bg-background-gray p-[2px] font-bold ${vertical ? '' : 'flex'}`}
    >
      {buttons.map((b, index) => (
        <div key={index}>
          <button
            className={`relative z-20 h-full w-full rounded px-2 py-2 ${isActive(index) ? 'text-text-primary' : 'text-text-secondary'} linear transition-all duration-200 hover:text-text`}
            onClick={() => updateActiveButton(index)}
            ref={(ref) => setRef(index, ref)}
          >
            <div className="flex justify-center align-middle">{b.title}</div>
          </button>
        </div>
      ))}
      <div
        className="linear absolute z-10 flex rounded bg-background-secondary drop-shadow transition-all duration-200"
        style={activeButtonStyle()}
      ></div>
    </div>
  );
}

export default ButtonGroup;
