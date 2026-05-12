import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type' : 'application/json',
      'orgcode': 'try',
      'appcode': 'practice',
      'sitecode': 'DefaultSiteCode',
      'clientSecret' : "e8a87f57-9ffb-35ee-46c0-f13355b81e40",
      'identifiertype': 'external',
      'apikey' : "eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmM2E0YzgwMi1iMGExLTcwNTEtYmJkZi1kZGI4N2M1YzAzOTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiIwY2Y2MzUxYi1jOTU3LTQ3NTktYTBhYy1lOGVjM2U4MjdmNGYiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiYTg4MzA4OGQtN2UzYS00NTU5LWE3ZGMtY2NjNDY5NmVhZWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Nzg0Njk5MTMsImV4cCI6MTc3ODU1MDI1MywiaWF0IjoxNzc4NDY5OTEzLCJqdGkiOiJiNWM2NzdhZi1hYzU5LTRiYzgtYmQ0YS0wZGZhYTZlNTM1NmIiLCJlbWFpbCI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSJ9.oSJYKe_g-vJNniekHpLlfVSzDVUrEP977AYQ9H5dneVRtzO9JruOgEpn2K1MD0pqH4jXOvLsnVf601_a5D6H8GWyebBQWAfk5wAXCHdosqEm00MzzmN8IhycWSEUgjevcx0Nn552wbCElTikp2rCH9NUsU01qxG3R6vPEqUXTxNMG4lyKWJTc0rbeO_g63n9Mp0hQ2wAKihztfpiR2dGRpDCNB7RvhQB1HUlhxio7-k-t6OMhHKr7aLOnmGAxh1kC3dI0CY1dRGyRwdik1OnbTKxQLmmE9D9-zj7Kv2ELMixPUCGUYwwUf2Game3_z9EZzb3ebDzPTahylAgE3-JdA"
      

    }
  })
  return next(modifiedReq);
};
