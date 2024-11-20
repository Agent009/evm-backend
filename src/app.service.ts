import { Injectable } from "@nestjs/common";
import { Address, createPublicClient, http, PublicClient, formatEther } from "viem";
import { sepolia } from "viem/chains";
import * as tokenJson from "@assets/BallotToken.json";
import { ConstantsService } from "@lib/constants";

@Injectable()
export class AppService {
  private publicClient: PublicClient;

  constructor(private config: ConstantsService) {
    // console.log("config -> ", this.config.alchemySepolia);
    this.publicClient = createPublicClient({
      chain: sepolia,
      // transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
      transport: http(this.config.alchemySepolia),
    });
  }

  getHello(): string {
    return "Hello World!";
  }

  getContractAddress(): Address {
    return this.config.ballotTokenSepolia;
  }

  async getTokenName(): Promise<string> {
    return (await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "name",
    })) as unknown as string;
  }

  async getTotalSupply(): Promise<string> {
    const symbol = (await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "symbol",
    })) as unknown as string;
    const totalSupply = (await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName: "totalSupply",
    })) as unknown as bigint;
    return `${formatEther(totalSupply)} ${symbol}`;
  }

  async getTokenBalance(address: string): Promise<bigint> {
    return 0n;
  }

  async getTransactionReceipt(hash: string): Promise<Address> {
    return "0x" as Address;
  }
}
