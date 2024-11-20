import { Injectable } from "@nestjs/common";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import * as tokenJson from "@assets/BallotToken.json";
import { ConstantsService } from "@lib/constants";

@Injectable()
export class AppService {
  constructor(private config: ConstantsService) {}
  getHello(): string {
    return "Hello World!";
  }

  getContractAddress(): Address {
    return "0x2282A77eC5577365333fc71adE0b4154e25Bb2fa";
  }

  async getTokenName(): Promise<string> {
    // console.log("config -> ", this.config.alchemySepolia);
    const publicClient = createPublicClient({
      chain: sepolia,
      // transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
      transport: http(this.config.alchemySepolia),
    });
    return (await publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "name",
    })) as unknown as string;
  }
}
