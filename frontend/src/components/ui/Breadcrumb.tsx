import { Breadcrumb } from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';

interface BreadcrumbRoute {
  displayName: string;
  url: string;
}

interface AppBreadcrumbPops {
  routes: BreadcrumbRoute[];
}

export function AppBreadcrumb({ routes }: AppBreadcrumbPops) {
  return (
    <Breadcrumb.Root variant={'plain'} className="py-4">
      <Breadcrumb.List>
        {routes.map((route, index) => (
          <Fragment key={route.url}>
            <Breadcrumb.Item>
              {index === routes.length - 1 ? (
                <Breadcrumb.CurrentLink className="text-sm text-text-primary">
                  {route.displayName}
                </Breadcrumb.CurrentLink>
              ) : (
                <Breadcrumb.Link
                  href={route.url}
                  className="text-sm text-text-secondary hover:text-text-primary"
                >
                  {route.displayName}
                </Breadcrumb.Link>
              )}
            </Breadcrumb.Item>
            {index < routes.length - 1 && (
              <Breadcrumb.Separator className="text-text-secondary" />
            )}
          </Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
