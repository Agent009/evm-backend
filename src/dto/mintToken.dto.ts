import { ApiProperty } from "@nestjs/swagger";

export class MintTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    default: "0x1234567890123456789012345678901234567890",
    description: "The address to mint tokens for",
  })
  address: string = "0x1234567890123456789012345678901234567890";
}
