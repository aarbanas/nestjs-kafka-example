import { Injectable, OnModuleInit } from "@nestjs/common";
import EventSource from "eventsource";
import { ProducerService } from "../kafka/producer.service";
import { raw } from "express";

@Injectable()
export class WikimediaService implements OnModuleInit {
  constructor(private readonly kafkaProducer: ProducerService) {}
  private es = new EventSource(
    "https://stream.wikimedia.org/v2/stream/recentchange",
  );

  onModuleInit() {
    this.es.onmessage = async (evt) => {
      const payload = JSON.parse(evt.data);
      console.log("Received Data: ", payload);

      await this.kafkaProducer.produce({
        topic: "wikimedia.recentchanges",
        messages: [{ value: evt.data }],
      });
    };
  }
}
