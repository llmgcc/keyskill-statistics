export function Complexity() {
  return (
    <div className="mt-2 resize rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">Skill complexity</div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">Senior level</div>
        <div className="flex flex-col items-end">
          <div className="text-2xl font-bold">75%</div>
          {/* <div className="mx-1 flex items-center text-xs text-green-400"> */}
          {/* 75% */}
          {/* </div> */}
          {/* <div className="relative h-[4px] w-24 rounded bg-background-secondary"> */}
          {/* <div className="absolute left-0 top-0 z-20 h-full w-[75%] rounded bg-background-gray text-xs text-text-secondary"></div> */}
          {/* </div> */}
        </div>
      </div>

      <div className="mb-2 text-xs text-text-secondary">
        {/* Навык чаще встречается у опытных специалистов */}
        Skill is more common among experienced specialists
      </div>

      <div>
        {/* <div className='text-lg'> */}
        {/* 12.5% */}
        {/* </div> */}
        <div></div>
      </div>
      <div className="gap- relative flex w-full">
        <div className="h-full w-[33%]">
          <div className="text-xs text-text-secondary">Junior</div>
          <div className="flex h-2 items-center justify-center rounded-l bg-sky-300/70">
            {/* Junior */}
          </div>
        </div>
        <div className="h-full w-[33%]">
          <div className="text-xs text-text-secondary">Middle</div>
          <div className="flex h-2 items-center justify-center bg-amber-300/70">
            {/* Junior */}
          </div>
        </div>
        <div className="h-full w-[33%]">
          <div className="text-xs text-text-secondary">Senior</div>
          <div className="flex h-2 items-center justify-center rounded-r bg-rose-400/70">
            {/* Junior */}
          </div>
        </div>
        <div className="absolute h-2 w-full">
          <div className="absolute left-[75%] top-[10px] flex h-5 w-5 items-center justify-center rounded-full bg-background-primary">
            <div className="size-1/2 rounded-full bg-text-primary"></div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-base">
        <div className="text-base text-text-primary">
          Complexity is calculated based on the frequency of occurrence of the
          skill among specialists of different levels
        </div>
        {/* <div className="mb-1 font-medium">Как рассчитывается сложность:</div>
        <div>
          (Без опыта × 0 + 1-3 года × 0.3 + 3-6 лет × 0.6 + Более 6 лет × 1.0)
        </div>
        <div className="mt-1">Сумма / Общее количество</div> */}
      </div>

      <div className="mt-1">
        <div className="text-base">Distribution</div>
        <div className="flex h-5 w-full gap-1">
          <div className="h-full w-[5%] rounded bg-gray-600/70"></div>
          <div className="h-full w-[20%] rounded bg-yellow-200/70"></div>
          <div className="h-full w-[25%] rounded bg-green-300/70"></div>
          <div className="h-full w-[15%] rounded bg-cyan-300/70"></div>
          <div className="h-full w-[35%] rounded bg-purple-400/70"></div>
        </div>

        <div className="mt-2">
          <div className="my-1 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-gray-400"></div>
              <div className="text-sm text-text-secondary">Unknown - 5%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-yellow-400"></div>
              <div className="text-sm text-text-secondary">
                No experience - 20%
              </div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-red-400"></div>
              <div className="text-sm text-text-secondary">1-3 years - 35%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-cyan-400"></div>
              <div className="text-sm text-text-secondary">3-6 years - 35%</div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
          <div className="my-2 flex h-5 items-center justify-between">
            <div className="flex h-full items-center gap-1">
              <div className="h-full w-2 rounded bg-pink-400"></div>
              <div className="text-sm text-text-secondary">
                More than 6 years - 35%
              </div>
            </div>
            <div className="text-sm text-text-primary">225</div>
          </div>
        </div>
      </div>
    </div>
  );
}
