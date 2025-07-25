import { Button, Separator } from '@chakra-ui/react';
import { MdKeyboardDoubleArrowUp } from 'react-icons/md';
import { PiCodeSimpleLight } from 'react-icons/pi';

function Logo() {
  return (
    <div className="flex items-center text-text">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-background-secondary/50 p-1 text-background-accent">
        <PiCodeSimpleLight size={20} />
      </div>
      <div className="mx-2 cursor-pointer font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent">
        KS|DATA
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-background-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-text-secondary">
              KS|DATA provides IT job market analytics, showing which skills are
              needed for professional development
            </p>
            <Button
              size="lg"
              className="flex w-fit gap-1 border border-background-secondary bg-background-primary px-4 text-text-primary hover:bg-background-secondary"
              variant={'outline'}
            >
              <div>
                <MdKeyboardDoubleArrowUp className="p-0" />
              </div>
              <div>Back to top</div>
            </Button>
          </div>

          <div className="flex gap-8 md:gap-16">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-text">
                Navigation
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  'Skills',
                  'Categories',
                  'Domains',
                  'Highlights',
                  'Favourites',
                ].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-text/80 hover:text-background-accent"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-text">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-text-secondary md:flex-row md:justify-between">
          <div className="space-y-1">
            <div>Powered by HeadHunter</div>
            <div>© {new Date().getFullYear()} KS|DATA</div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              className="border border-background-secondary bg-background-primary"
            >
              Language: English
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border border-background-secondary bg-background-primary"
            >
              Currency: USD - $
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
