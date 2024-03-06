import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { DemoNodeConsumer } from "./kafka/consumers/DemoNodeConsumer";
import { ConfigModule } from "@nestjs/config";
import { WikimediaModule } from "./wikimedia/wikimedia.module";
import { SearchModule } from "./search/search.module";

@Module({
  imports: [KafkaModule, ConfigModule.forRoot(), WikimediaModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
