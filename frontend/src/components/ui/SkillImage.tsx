import { Categories, CategoriesStyle } from '@/config/categories';
import { Domains, DomainsStyle } from '@/config/domains';

type SkillImageProps = {
  path?: string;
  domain?: Domains | string;
  category?: Categories | string;
};

function SkillImage({ path, domain, category }: SkillImageProps) {
  function imageLogo() {
    if (path) {
      const url = `http://localhost:8000/static/${path}`;
      return (
        <div className="size-fit">
          <img src={url} alt="" />
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
      className={`flex aspect-square w-full items-center justify-center rounded-md text-xs`}
      style={style ?? undefined}
    >
      <div className="text-white">{imageLogo()}</div>
    </div>
  );
}

export default SkillImage;
