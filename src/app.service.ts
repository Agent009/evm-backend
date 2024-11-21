import { Injectable } from "@nestjs/common";
import {
  Address,
  createPublicClient,
  http,
  PublicClient,
  formatEther,
  WalletClient,
  createWalletClient,
  PrivateKeyAccount,
} from "viem";
import { sepolia } from "viem/chains";
import * as tokenJson from "@assets/BallotToken.json";
import { ConstantsService } from "@lib/constants";
import { formatBigInt } from "@lib/utils";
import { privateKeyToAccount } from "viem/accounts";

@Injectable()
export class AppService {
  private readonly deployerAccount: PrivateKeyAccount;
  private publicClient: PublicClient;
  private walletClient: WalletClient;

  constructor(private config: ConstantsService) {
    // console.log("app -> service -> constructor -> config -> ", this.config.alchemySepolia);
    this.publicClient = createPublicClient({
      chain: sepolia,
      // transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
      transport: http(this.config.alchemySepolia),
    });
    this.deployerAccount = privateKeyToAccount(`0x${this.config.deployerPrivateKey}`);
    this.walletClient = this._walletClientFor(this.deployerAccount);
  }

  private _walletClientFor = (account: PrivateKeyAccount) =>
    createWalletClient({
      account: account,
      chain: sepolia,
      transport: http(this.config.alchemySepolia),
    });

  private async _readContract<T>(functionName: string, args?: unknown[]): Promise<T> {
    return (await this.publicClient.readContract({
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName,
      args: args || undefined,
    })) as unknown as T;
  }

  private async _writeContract(functionName: string, args?: unknown[]): Promise<Address> {
    const { request } = await this.publicClient.simulateContract({
      account: this.getServerWalletAddress(),
      address: this.getContractAddress(),
      abi: tokenJson.abi,
      functionName,
      args: args || undefined,
    });
    return await this.walletClient.writeContract(request);
    // return await this.walletClient.writeContract({
    //   chain: sepolia,
    //   account: this.getServerWalletAddress(),
    //   address: this.getContractAddress(),
    //   abi: tokenJson.abi,
    //   functionName,
    //   args: args || undefined,
    // });
  }

  getContractAddress(): Address {
    return this.config.ballotTokenSepolia;
  }

  async getTokenName(): Promise<string> {
    return await this._readContract<string>("name");
  }

  async getTokenSymbol(): Promise<string> {
    return await this._readContract<string>("symbol");
  }

  async getTotalSupply(): Promise<string> {
    const symbol = await this.getTokenSymbol();
    const totalSupply = await this._readContract<bigint>("totalSupply");
    return `${formatEther(totalSupply)} ${symbol}`;
  }

  async getTokenBalance(address: string): Promise<string> {
    const symbol = await this.getTokenSymbol();
    const balance = await this._readContract<bigint>("balanceOf", [address]);
    return `${formatEther(balance)} ${symbol}`;
  }

  async getVotes(address: string): Promise<string> {
    const balance = await this._readContract<bigint>("getVotes", [address]);
    return `${formatEther(balance)}`;
  }

  async getTransactionReceipt(hash: Address): Promise<any> {
    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    console.log("app -> service -> getTransactionReceipt -> receipt", receipt);
    return {
      blockHash: receipt.blockHash,
      blockNumber: "" + receipt.blockNumber,
      from: receipt.from,
      to: receipt.to,
      gasUsed: formatBigInt(receipt.gasUsed),
      gasPrice: formatBigInt(receipt.effectiveGasPrice),
      status: receipt.status,
    };
  }

  getServerWalletAddress(): Address {
    return this.config.deployerAddress as Address;
  }

  async checkMinterRole(address: Address): Promise<boolean> {
    const MINTER_ROLE = await this._readContract<string>("MINTER_ROLE");
    console.log("app -> service -> checkMinterRole -> MINTER_ROLE", MINTER_ROLE);
    return await this._readContract<boolean>("hasRole", [MINTER_ROLE, address]);
  }

  async mintTokens(address: Address): Promise<any> {
    const hasMinterRole = await this.checkMinterRole(address);
    console.log("app -> service -> mintTokens -> address", address, "hasMinterRole", hasMinterRole);

    // Stats before mint
    const [balance0, symbol, votes0] = await Promise.all([
      this.getTokenBalance(address as string),
      this.getTokenSymbol(),
      this.getVotes(address),
    ]);
    console.log(
      `app -> service -> mintTokens -> target had ${balance0} decimal units / ${balance0} ${symbol} BEFORE mint`,
    );
    console.log(`app -> service -> mintTokens -> target had ${votes0} units of voting power BEFORE mint.`);

    // Mint
    const mintTx = await this._writeContract("mint", [address, BigInt("1000000")]);
    const receipt = await this.getTransactionReceipt(mintTx);

    // Stats after mint
    const [balance, votes] = await Promise.all([this.getTokenBalance(address as string), this.getVotes(address)]);
    console.log(
      `app -> service -> mintTokens -> target has ${balance} decimal units / ${balance} ${symbol} AFTER mint`,
    );
    console.log(`app -> service -> mintTokens -> target has ${votes} units of voting power AFTER mint.`);

    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: receipt.status,
      balance0,
      votes0,
      balance,
      votes,
    };
  }
}
