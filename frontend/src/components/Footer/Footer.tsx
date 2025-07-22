import { Button, Separator } from '@chakra-ui/react';
import { LiaNetworkWiredSolid } from 'react-icons/lia';
import { PiCodeSimpleLight } from 'react-icons/pi';

function Logo() {
  return (
    <div className="flex items-center text-text">
      <div className="flex aspect-square items-center justify-center rounded-lg bg-background-secondary/50 p-1 text-[#5e6c77] text-background-accent">
        <PiCodeSimpleLight size={20} />
      </div>
      <div className="h-100 font-sm text-md mx-1 flex cursor-pointer items-center justify-center font-bold uppercase text-text transition-colors duration-150 hover:text-background-accent">
        KS|DATA
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <div className="mt-4 bg-background-secondary/50 pb-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex">
          <div className="flex flex-[80] flex-col gap-4">
            <Logo />
            <div className="w-[35%] text-sm text-text-secondary">
              KS|DATA provides comprehensive analysis of key skills in the IT
              sector, helping professionals and companies stay informed about
              industry trends.
            </div>
            {/* <p className="mt-8 text-sm text-text/80">
                            © {new Date().getFullYear()} KS|DATA. All rights reserved.
                        </p> */}
            <div>
              <Button
                size={'lg'}
                className="w-[200px] border-[1px] border-background-secondary bg-background-primary text-text-primary"
              >
                Go to top
              </Button>
            </div>
          </div>
          <div className="flex flex-[20] justify-between">
            <div className="">
              <h3 className="mb-4 text-lg font-semibold text-text">Sitemap</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    Domains
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    Highlights
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-text/80 hover:text-background-accent"
                  >
                    Favourites
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-text">Connect</h3>
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

        <Separator size="md" className="mb-4 mt-8" />

        <div className="flex justify-between text-sm text-text-secondary">
          <div className="flex flex-col gap-2">
            <div>
              List of services that we’re using to calculate data: HeadHunter
            </div>
            <div>© {new Date().getFullYear()} KS|DATA</div>
          </div>

          <div className="flex gap-2">
            <Button
              variant={'outline'}
              className="border-[1px] border-background-secondary !bg-background-primary shadow shadow-background-secondary"
            >
              Language English
            </Button>
            <Button
              variant={'outline'}
              className="border-[1px] border-background-secondary !bg-background-primary shadow shadow-background-secondary"
            >
              <span>Currency</span> USD - $
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
