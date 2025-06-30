


export function Grid() {
    const WIDTH = 15
    const HEIGHT = 10
    return (
        <div className="absolute z-[100] flex-col items-center justify-center w-full top-0">
            {
                Array.from({ length: HEIGHT }, (_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        {
                            Array.from({ length: WIDTH }, (_, j) => (
                                <div key={j} className="flex w-20 aspect-square bg-red-500 m-1"></div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )

}