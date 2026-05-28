import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: any = {
    orgcode: 'vikiai-dev',
    appcode: 'theraphy',
    sitecode: 'DefaultSiteCode',
    identifiertype: 'external',
  };

  // Asset API
  if (req.url.includes('getAssestsDetails')) {
    headers = {
      ...headers,
      clientSecret: '16e2f487-a15c-f760-b431-173fa6b0e3c7',
    };
  }

  if (req.url.includes('getLocationDetails')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: '27ee440d-50e1-6667-d83f-55a94d9770f4',
    };
  }

  if (req.url.includes('MapAssetToLocation')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: '9ee1b3de-e1ef-7e46-e91d-35816cd51ff9',
    };
  }
  if (req.url.includes('deleteAssetsService')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: '60a7c123-73f5-c6e6-f039-322c9a936b20',
    };
  }

  const modifiedReq = req.clone({
    setHeaders: headers,
  });
  return next(modifiedReq);
};

/**
 *
 * appCode: demo
 * appCode: externalCoreHelper.getAppCode --> try.demo
 */
