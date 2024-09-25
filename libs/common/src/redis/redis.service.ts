import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  protected readonly logger = new Logger('Redis');

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    try {
      return JSON.parse(await this.cacheManager.get(key));
    } catch (e) {
      console.log({ e });
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      return await this.cacheManager.set(key, value);
    } catch (e) {
      console.log(e);
    }
  }

  async del(key: string): Promise<any> {
    try {
      return await this.cacheManager.del(key);
    } catch (e) {
      console.log(e);
    }
  }
}
