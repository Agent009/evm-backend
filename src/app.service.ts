import { Injectable } from "@nestjs/common";
import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import * as tokenJson from "@assets/BallotToken.json";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getContractAddress(): Address {
    return "0x2282A77eC5577365333fc71adE0b4154e25Bb2fa";
  }

  async getTokenName(): Promise<string> {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
    });
    return (await publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "name",
    })) as unknown as string;
  }
}
