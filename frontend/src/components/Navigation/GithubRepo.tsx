import { Button } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';

const openRepo = () => {
  window.open('https://github.com/llmgcc/keyskill-statistics', '_blank');
};

export function GithubRepo() {
  return (
    <Button
      variant="ghost"
      className="ml-1 aspect-square size-fit !bg-transparent !p-0"
      title="GitHub"
      onClick={openRepo}
    >
      <BsGithub className="cursor-pointer text-xl text-text transition-colors duration-150 hover:text-background-accent" />
    </Button>
  );
}
