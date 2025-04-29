import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsEye, BsFire } from 'react-icons/bs';
import { CiClock1 } from 'react-icons/ci';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineRocketLaunch } from 'react-icons/md';

import ButtonGroup from '../ui/ButtonGroup.tsx';
import SkillDescription from '../ui/SkillDescription.tsx';
import StatCard from '../ui/StatCard.tsx';

type Highlight = {
  count: number;
  prev_count: number;
  plot: number[];
  name: string;
};

type Trending = {
  title: string;
  icon: JSX.Element;
  top: Highlight[];
};

function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}

function change(count: number, prev_count: number, percent = true) {
  let value = count;
  if (percent) {
    value = getPercentDifference(count, prev_count);
  }

  const className = value >= 0 ? 'text-green-400' : 'text-red-400';

  const valueString = percent ? `${value.toFixed(1)}%` : value;

  return (
    <div className={`flex items-center ${className} text-xs`}>
      <div className="highlight-card-data-change-value-icon">
        {
          // value >= 0 ? <MdOutlineArrowDropUp size={15} /> : <MdOutlineArrowDropDown size={15} />
        }
      </div>
      <div>{valueString}</div>
    </div>
  );
}

function TrendingCard(props: Trending & { percent?: boolean }) {
  // function image(h : Highlight) {
  //     let image = {}
  //     let name = h.title.toLowerCase()
  //     name = name.replace('#', 'sharp')
  //     name = name.replace('/', '-')
  //     let path = `/icons/${name}.webp`
  //     return (
  //         <div className='size-5 border-[0px] rounded border-text-secondary flex items-center justify-center'>
  //             <div className='text-text-primary' style={image}>
  //                 {/* <img src={path} alt="" /> */}
  //                 <FaServer/>
  //             </div>
  //         </div>
  //     )
  // }

  const size = 14;
  const buttonsPlot = [
    {
      title: (
        <div className="">
          <BsFire size={size} />
        </div>
      ),
    },
    {
      title: (
        <div className="">
          <CiClock1 size={size} />
        </div>
      ),
    },
    {
      title: (
        <div className="">
          <BsEye size={size} />
        </div>
      ),
    },
  ];

  return (
    <StatCard header="Stat">
      <StatCard.Settings>
        <div className="flex cursor-pointer rounded border-2 p-1 text-text-secondary hover:bg-background-secondary">
          <div>
            <IoMdAdd />
          </div>
          <div>Add</div>
        </div>
      </StatCard.Settings>
      <StatCard.Body>
        {props.top &&
          props.top.map((h: Highlight, index) => {
            return (
              <div
                className="flex items-center justify-between p-2"
                key={index}
              >
                <div className="">
                  <SkillDescription categories={[]} technologies={[]} {...h} />
                </div>
                <div>{change(h.count, h.prev_count, props.percent)}</div>
              </div>
            );
          })}
      </StatCard.Body>
    </StatCard>
  );
}

function Highlights() {
  const [trendings, setTrendings] = useState<Highlight[]>([]);

  useEffect(() => {
    axios.get('/api/highlights/gainers').then((response) => {
      setTrendings(response.data);
    });
  }, []);

  const iconGainers = (
    <MdOutlineRocketLaunch className="icon-gainers" size={15} />
  );

  return (
    <div className="flex w-full justify-between py-4 text-text">
      {/* <div className='highlights-layout-element'> */}
      {/* <div>{highlights ? <HighlightsCard {...highlights.skills}/> : null}</div> */}
      {/* <div>{highlights ? <HighlightsCard {...highlights.vacancies}/> : null}</div> */}
      {/* </div> */}
      <div className="w-full">
        {trendings ? (
          <TrendingCard
            {...{ top: trendings, title: 'Top Gainers', icon: iconGainers }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Highlights;
