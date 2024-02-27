import { Injectable } from "@nestjs/common";
import { ProducerService } from "./kafka/producer.service";

@Injectable()
export class AppService {
  constructor(private producerService: ProducerService) {}
  async getHello() {
    await this.producerService.produce({
      topic: "demo_node",
      messages: [
        {
          // When key is specified all messages with same key are stored in the same partition
          key: "Demo",
          value: "Hello World!",
        },
      ],
    });

    return "Hello World!";
  }
}
