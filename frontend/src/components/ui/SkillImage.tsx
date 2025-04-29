import { Categories, CategoriesStyle } from '@/config/categories';
import { Technologies, TechnologiesStyle } from '@/config/technologies';

type SkillImageProps = {
  path?: string;
  category?: Categories | string;
  technology?: Technologies | string;
};

function SkillImage({ path, category, technology }: SkillImageProps) {
  function imageLogo() {
    if (path) {
      const url = `http://localhost:8000/static/${path}`;
      return (
        <div className="size-fit">
          <img src={url} alt="" />
        </div>
      );
    }
    if (
      category &&
      Object.values(Categories).includes(category as Categories)
    ) {
      return CategoriesStyle[category as Categories].logo;
    }
    if (
      technology &&
      Object.values(Technologies).includes(technology as Technologies)
    ) {
      return TechnologiesStyle[technology as Technologies].logo;
    }
    return null;
  }

  function imageColor() {
    if (path) {
      return null;
    }
    if (
      category &&
      Object.values(Categories).includes(category as Categories)
    ) {
      return `${CategoriesStyle[category as Categories].color}`;
    }
    if (
      technology &&
      Object.values(Technologies).includes(technology as Technologies)
    ) {
      return TechnologiesStyle[technology as Technologies].color;
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
