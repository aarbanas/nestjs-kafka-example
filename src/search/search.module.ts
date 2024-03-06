import { Module } from "@nestjs/common";
import { OpensearchModule } from "@jporter-dev/nestjs-opensearch";
import { SearchService } from "./search.service";

@Module({
  imports: [
    OpensearchModule.register({
      node: "http://localhost:9200",
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
