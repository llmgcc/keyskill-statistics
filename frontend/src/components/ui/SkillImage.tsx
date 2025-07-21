import { baseURL } from '@/api/api';
import { memo } from 'react';

import { Categories, CategoriesStyle } from '@/config/categories';
import { Domains, DomainsStyle } from '@/config/domains';

interface SkillImageProps {
  path?: string;
  domains?: Domains | string;
  categories?: Categories | string;
}

function _SkillImage({ path, domains, categories }: SkillImageProps) {
  function imageLogo() {
    if (path) {
      const url = `${baseURL}/${path}`;
      return (
        <div className="h-full w-full">
          <img src={url} alt="" className="h-full w-full object-contain" />
        </div>
      );
    }
    if (domains && Object.values(Domains).includes(domains as Domains)) {
      return DomainsStyle[domains as Domains].logo;
    }
    if (
      categories &&
      Object.values(Categories).includes(categories as Categories)
    ) {
      return CategoriesStyle[categories as Categories].logo;
    }
    return null;
  }

  function imageColor() {
    if (path) {
      return null;
    }
    if (domains && Object.values(Domains).includes(domains as Domains)) {
      return DomainsStyle[domains as Domains].color;
    }
    if (
      categories &&
      Object.values(Categories).includes(categories as Categories)
    ) {
      return `${CategoriesStyle[categories as Categories].color}`;
    }
    return null;
  }

  const color = imageColor();
  const style = color ? { backgroundColor: color } : null;

  return (
    <div
      className={`flex aspect-square h-full w-full items-center justify-center rounded-md text-xs`}
      style={style ?? undefined}
    >
      <div className="flex aspect-square h-full w-full items-center justify-center p-0 text-base text-white">
        {imageLogo()}
      </div>
    </div>
  );
}

export const SkillImage = memo(_SkillImage);
