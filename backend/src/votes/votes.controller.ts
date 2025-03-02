import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get('post/:postId/count')
  async getVoteCountByPostId(@Param('postId') postId: number) {
    return await this.votesService.getVoteCountByPostId(postId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createVote(@Body() createVoteDto: CreateVoteDto) {
    return await this.votesService.createVote(createVoteDto);
  }

  @Delete(':id')
  async deleteVote(@Param('id') id: number) {
    return await this.votesService.deleteVote(id);
  }
}
