import { Button } from '@radix-ui/themes';
import { BsGithub } from 'react-icons/bs';

const openRepo = () => {
  window.open('https://github.com/llmgcc/keyskill-statistics', '_blank');
};

export function GithubRepo() {
  return (
    <Button
      variant="soft"
      className="ml-1 aspect-square size-fit !bg-transparent !p-0"
      title="GitHub"
      onClick={openRepo}
    >
      <BsGithub className="cursor-pointer text-xl text-text transition-colors duration-150 hover:text-background-accent" />
    </Button>
  );
}
