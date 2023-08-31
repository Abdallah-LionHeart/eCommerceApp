using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Interfaces;
using StackExchange.Redis;

namespace API.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<string> GetResponseCacheAsync(string cacheKey)
        {
            var cacheResponse = await _database.StringGetAsync(cacheKey);
            if (cacheResponse.IsNullOrEmpty)
            {
                return null;
            }
            return cacheResponse;
        }

        public async Task ResponseCacheAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null)
            {
                return;
            }
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialisedResponse = JsonSerializer.Serialize(response, options);
            await _database.StringSetAsync(cacheKey, serialisedResponse, timeToLive);
            // await SetStringWithExpiry(_database, cacheKey, serialisedResponse, timeToLive).ConfigureAwait(false);
        }
    }
}