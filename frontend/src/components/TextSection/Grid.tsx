export function Grid() {
  const WIDTH = 15;
  const HEIGHT = 10;
  return (
    <div className="absolute top-0 z-[100] w-full flex-col items-center justify-center">
      {Array.from({ length: HEIGHT }, (_, i) => (
        <div key={i} className="flex items-center justify-center">
          {Array.from({ length: WIDTH }, (_, j) => (
            <div
              key={j}
              className="m-1 flex aspect-square w-20 bg-red-500"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
