import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import LoggerMiddleware from './middleware/logger.middleware'
import { CatsController } from './cats/cats.controller'
import { getLoggerMiddleware } from './middleware/getLogger.middleware'

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.GET })
      .forRoutes(CatsController)

    consumer
      .apply(getLoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
  }
}
