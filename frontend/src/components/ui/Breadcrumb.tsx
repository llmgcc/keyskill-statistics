import { Breadcrumb } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

interface BreadcrumbRoute {
  displayName: string;
  url: string;
}

interface AppBreadcrumbPops {
  routes: BreadcrumbRoute[];
  className?: string;
}

export function AppBreadcrumb({ routes, className = '' }: AppBreadcrumbPops) {
  return (
    <Breadcrumb.Root variant={'plain'} className={`py-4 ${className}`}>
      <Breadcrumb.List>
        {routes.map((route, index) => (
          <Fragment key={route.url}>
            <Breadcrumb.Item>
              {index === routes.length - 1 ? (
                <Breadcrumb.CurrentLink className="text-sm text-text-primary">
                  {route.displayName}
                </Breadcrumb.CurrentLink>
              ) : (
                <Breadcrumb.Link asChild>
                  <Link to={route.url} className="text-sm text-text-secondary hover:text-text-primary">
                    {route.displayName}
                  </Link>
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
