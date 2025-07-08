import { baseURL } from '@/api/api';
import { memo } from 'react';

import { Categories, CategoriesStyle } from '@/config/categories';
import { Domains, DomainsStyle } from '@/config/domains';

interface SkillImageProps {
  path?: string;
  domain?: Domains | string;
  category?: Categories | string;
}

function _SkillImage({ path, domain, category }: SkillImageProps) {
  function imageLogo() {
    if (path) {
      const url = `${baseURL}/${path}`;
      return (
        <div className="h-full w-full">
          <img src={url} alt="" className="h-full w-full object-contain" />
        </div>
      );
    }
    if (domain && Object.values(Domains).includes(domain as Domains)) {
      return DomainsStyle[domain as Domains].logo;
    }
    if (
      category &&
      Object.values(Categories).includes(category as Categories)
    ) {
      return CategoriesStyle[category as Categories].logo;
    }
    return null;
  }

  function imageColor() {
    if (path) {
      return null;
    }
    if (domain && Object.values(Domains).includes(domain as Domains)) {
      return DomainsStyle[domain as Domains].color;
    }
    if (
      category &&
      Object.values(Categories).includes(category as Categories)
    ) {
      return `${CategoriesStyle[category as Categories].color}`;
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
