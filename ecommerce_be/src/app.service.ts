import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  puclibPath: string;

  constructor(private readonly configService: ConfigService) {
    this.puclibPath = configService.get('PUBLIC_PATH');
  }

  getHello(): string {
    return 'Welcome to Ecommerce management service';
  }
}
