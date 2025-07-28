import { Link } from '@chakra-ui/react';
import { PiCodeSimpleLight } from 'react-icons/pi';

export const APP_NAME = 'KS|DATA';

export function Logo() {
  return (
    <Link href="/" className="w-fit">
      <div className="flex items-center text-text">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-background-secondary/50 p-1 text-background-accent">
          <PiCodeSimpleLight size={20} />
        </div>
        <div className="mx-2 cursor-pointer font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent">
          {APP_NAME}
        </div>
      </div>
    </Link>
  );
}
