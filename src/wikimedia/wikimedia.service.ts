import { Injectable, OnModuleInit } from "@nestjs/common";
import * as EventSource from "eventsource";
import { ProducerService } from "../kafka/services/producer.service";
import { CompressionTypes } from "kafkajs";

@Injectable()
export class WikimediaService implements OnModuleInit {
  constructor(private readonly kafkaProducer: ProducerService) {}

  private es = new EventSource(
    "https://stream.wikimedia.org/v2/stream/recentchange",
  );

  onModuleInit() {
    this.es.onmessage = async (evt) => {
      await this.kafkaProducer.produce({
        topic: "wikimedia.recentchanges",
        messages: [{ value: evt.data }],
      });
    };

    setTimeout(() => {
      this.es.close();
    }, 5 * 1000);
  }
}
