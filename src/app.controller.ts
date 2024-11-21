import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { AppService } from "@app/app.service";
import { Address } from "viem";
import { ApiOperation } from "@nestjs/swagger";
import { MintTokenDto } from "@dto/mintToken.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("contract-address")
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Get("token-name")
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }

  @Get("total-supply")
  async getTotalSupply() {
    return { result: await this.appService.getTotalSupply() };
  }

  @Get("token-balance/:address")
  async getTokenBalance(@Param("address") address: string) {
    return { result: await this.appService.getTokenBalance(address) };
  }

  /**
   * E.g. 0x6c1ba8cd3b539f477163eb91a78631970fede3b7c1be38718eb0622b422d11c9 on sepolia
   * @param hash
   */
  @Get("transaction-receipt")
  async getTransactionReceipt(@Query("hash") hash: Address) {
    return { result: await this.appService.getTransactionReceipt(hash) };
  }

  @Get("server-wallet-address")
  getServerWalletAddress() {
    return { result: this.appService.getServerWalletAddress() };
  }

  @Get("check-minter-role")
  async checkMinterRole(@Query("address") address: Address) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post("mint-tokens")
  @ApiOperation({ summary: "Mint tokens for a specific address" })
  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       address: {
  //         type: "string",
  //         description: "The address to mint tokens for",
  //         example: "0x1234567890123456789012345678901234567890",
  //       },
  //     },
  //   },
  // })
  // async mintTokens(@Body() body: { address: Address }) {
  async mintTokens(@Body() body: MintTokenDto) {
    return { result: await this.appService.mintTokens(body.address as Address) };
  }
}
