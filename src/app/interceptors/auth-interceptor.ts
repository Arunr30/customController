import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let headers: any = {
    'Content-Type': 'application/json',
    orgcode: 'try',
    appcode: 'practice',
    sitecode: 'DefaultSiteCode',
    identifiertype: 'external',
  };

  // Asset API
  if (req.url.includes('getAssestsDetails')) {
    headers = {
      ...headers,
      clientSecret: 'e8a87f57-9ffb-35ee-46c0-f13355b81e40',
      apikey:
        'eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmM2E0YzgwMi1iMGExLTcwNTEtYmJkZi1kZGI4N2M1YzAzOTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiIwY2Y2MzUxYi1jOTU3LTQ3NTktYTBhYy1lOGVjM2U4MjdmNGYiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiYTg4MzA4OGQtN2UzYS00NTU5LWE3ZGMtY2NjNDY5NmVhZWI4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Nzg0Njk5MTMsImV4cCI6MTc3ODU1MDI1MywiaWF0IjoxNzc4NDY5OTEzLCJqdGkiOiJiNWM2NzdhZi1hYzU5LTRiYzgtYmQ0YS0wZGZhYTZlNTM1NmIiLCJlbWFpbCI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSJ9.oSJYKe_g-vJNniekHpLlfVSzDVUrEP977AYQ9H5dneVRtzO9JruOgEpn2K1MD0pqH4jXOvLsnVf601_a5D6H8GWyebBQWAfk5wAXCHdosqEm00MzzmN8IhycWSEUgjevcx0Nn552wbCElTikp2rCH9NUsU01qxG3R6vPEqUXTxNMG4lyKWJTc0rbeO_g63n9Mp0hQ2wAKihztfpiR2dGRpDCNB7RvhQB1HUlhxio7-k-t6OMhHKr7aLOnmGAxh1kC3dI0CY1dRGyRwdik1OnbTKxQLmmE9D9-zj7Kv2ELMixPUCGUYwwUf2Game3_z9EZzb3ebDzPTahylAgE3-JdA',
    };
  }
  if (req.url.includes('getLocationDetails')) {
    console.log(req.url);

    if (req.url.includes('getLocationDetails')) {
      console.log('LOCATION INTERCEPTOR HIT');
    }
    headers = {
      ...headers,
      clientSecret: 'cc02070a-b02d-f782-c750-8f2fef76a2e4',
      apikey:
        'eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmM2E0YzgwMi1iMGExLTcwNTEtYmJkZi1kZGI4N2M1YzAzOTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiJiZDAzY2MyZS04NzRmLTRiNDYtYjUwNC04ODIxM2I2YjA5MmMiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiM2NhMGZmMDgtYWI0Mi00M2Q0LWE1ZGYtNTY3ZmQ2YmZlZDQ1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Nzg1NTc0MzAsImV4cCI6MTc3ODYzNzc3MCwiaWF0IjoxNzc4NTU3NDMwLCJqdGkiOiI0MjhiMzEyMS1jMDk5LTQxMzktYjVhMi02ZmE1ZWYxMDk3MWEiLCJlbWFpbCI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSJ9.ZUwJTriaCqKpnPYITMPq3IMpvlK6rUqeMbmNfnXtN5UzIEQcod8pdbF10QMLbsEjjbPR5-TZ0MUigj4IguvOUboc_WSN83v-0HgCNXhh_ymbv31A2U-8FdC__pgPZVvflcqy9znvw8I9lEz4Gv9G4IkW3dRvKk1OKzn-x-RoU4lawxd9Tui2ngYSmwgv_eoJvplz8PMF9d0QRVnX6YR4EGq-_J7-lZZQn_ObOPrrwsTdz09GPTo0C2eU3m8dzmpU9t7-fURotmuYxZw_J8NvYjccXSkWcS3S8WlBevIB6cA9U27FsFcjufptE-mtY7X0RwB0WIHiCD7wdzLHEUyysw',
    };
  }
   if (req.url.includes('mapAssestsToLocation')) {
    console.log(req.url);

    if (req.url.includes('getLocationDetails')) {
      console.log('LOCATION INTERCEPTOR HIT');
    }
    headers = {
      ...headers,
      clientSecret: 'e2db4b57-4ac8-cc22-8a31-cb86339f1459',
      apikey:
        'eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmM2E0YzgwMi1iMGExLTcwNTEtYmJkZi1kZGI4N2M1YzAzOTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiJiZDAzY2MyZS04NzRmLTRiNDYtYjUwNC04ODIxM2I2YjA5MmMiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiM2NhMGZmMDgtYWI0Mi00M2Q0LWE1ZGYtNTY3ZmQ2YmZlZDQ1IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Nzg1NTc0MzAsImV4cCI6MTc3ODYzNzc3MCwiaWF0IjoxNzc4NTU3NDMwLCJqdGkiOiI0MjhiMzEyMS1jMDk5LTQxMzktYjVhMi02ZmE1ZWYxMDk3MWEiLCJlbWFpbCI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSJ9.ZUwJTriaCqKpnPYITMPq3IMpvlK6rUqeMbmNfnXtN5UzIEQcod8pdbF10QMLbsEjjbPR5-TZ0MUigj4IguvOUboc_WSN83v-0HgCNXhh_ymbv31A2U-8FdC__pgPZVvflcqy9znvw8I9lEz4Gv9G4IkW3dRvKk1OKzn-x-RoU4lawxd9Tui2ngYSmwgv_eoJvplz8PMF9d0QRVnX6YR4EGq-_J7-lZZQn_ObOPrrwsTdz09GPTo0C2eU3m8dzmpU9t7-fURotmuYxZw_J8NvYjccXSkWcS3S8WlBevIB6cA9U27FsFcjufptE-mtY7X0RwB0WIHiCD7wdzLHEUyysw',
    };
  }
  if (req.url.includes('deleteAssetsService')) {
    console.log(req.url);

    if (req.url.includes('deleteAssetsService')) {
      console.log('LOCATION INTERCEPTOR HIT');
    }
    headers = {
      ...headers,
      clientSecret: '334b9aa3-0c56-6ef3-e8c2-880a9eb44b26',
      apikey:
        'eyJraWQiOiJNUUtZMGNhZ1N0Tjl3QXAwTzd3WWZ2MXdTYnVjOFhROHZwbUQ3RXU5b0QwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmM2E0YzgwMi1iMGExLTcwNTEtYmJkZi1kZGI4N2M1YzAzOTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tXC9ldS1jZW50cmFsLTFfSERyTEdkNDFWIiwiY29nbml0bzp1c2VybmFtZSI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSIsIm9yaWdpbl9qdGkiOiJlZmEzZjFlZi01MjRjLTQ5NGQtOTU3YS1kYjIwZGEyMzk1Y2IiLCJhdWQiOiIzdmo1MG5vMTBndGI4Mm81aWpqMmNkdXZ2MCIsImV2ZW50X2lkIjoiOTBkMTJkZTEtY2I1Yi00NzVhLWJmNjYtYjhjNzEwMjYwNWJlIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3Nzg2NDUwNzAsImV4cCI6MTc3ODcyNTQxMCwiaWF0IjoxNzc4NjQ1MDcwLCJqdGkiOiIxMTE4YTVhOC1hZGZiLTQzNDgtYjA3MC0xZGIwNjg3OWVkZGUiLCJlbWFpbCI6ImFydW52YXN1LmFpQGdtYWlsLmNvbSJ9.VjK61piDlF5GKIpbsRT5JcLjB4gu08eQnw8sdBGuApznYbljvCJOsg-qkf9hsKTcV48tPENjB1lGgPzf2TUVj3udwjHEGy1OjxnRZm027-LREJJ2S6aGMv_qv1hYCOk2EfXf5tPR2IAjfUCPVDwd4nzjY3h6gesjrJXxlXkNKWMan0P7LF-uKj_mZ9XFfLDNfroAjtKitkvfFgPGWfDelmaKKuDdqjfGgnjW7FdBEvdJ4UEjl59cjKA4hmmtBozTyaQ_nL__qg_uCLmwc6mgnATGmGValWkfjTSfaJogwnqynczQ5h1JxalHZUJjgsM1qqginKssrcr3iwwymEh86g',
    };
  }

  const modifiedReq = req.clone({
    setHeaders: headers,
  });
  return next(modifiedReq);
};
