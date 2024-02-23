import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KafkaModule } from "./kafka/kafka.module";
import { TestConsumer } from "./TestConsumer";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [KafkaModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
