import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: any = {
    orgcode: 'winterdev',
    appcode: 'demo',
    sitecode: 'BANG',
    identifiertype: 'external',
  };

  // Asset API
  if (req.url.includes('getAssestsDetails')) {
    headers = {
      ...headers,
      clientSecret: 'e8a87f57-9ffb-35ee-46c0-f13355b81e40',
    };
  }

  
  if (req.url.includes('getLocationDetails')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: 'cc02070a-b02d-f782-c750-8f2fef76a2e4',
    };
  }


   if (req.url.includes('mapAssestsToLocation')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: 'e2db4b57-4ac8-cc22-8a31-cb86339f1459',
    };
  }
  if (req.url.includes('deleteAssetsService')) {
    console.log(req.url);
    headers = {
      ...headers,
      clientSecret: '334b9aa3-0c56-6ef3-e8c2-880a9eb44b26',
    };
  }

  const modifiedReq = req.clone({
    setHeaders: headers,
  });
  return next(modifiedReq);
};


