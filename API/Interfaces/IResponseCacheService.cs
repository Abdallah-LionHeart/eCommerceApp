using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IResponseCacheService
    {
        Task ResponseCacheAsync(string cacheKey, object response, TimeSpan timeToLive);
        Task<string> GetResponseCacheAsync(string cacheKey);



    }
}