import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Recommendation } from './recommendation';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('recommendations')
	getRecommendations(@Query('sports') sports: string): Recommendation[] {
		//console.log(sports)
		return this.appService.getRecommendations(sports.split(','));
	}

	@Get('most-popular-sports')
	getMostPopularSports(): string[] {
		return [
			'Football',
			'Hockey',
			'Tennis',
			'Volleyball',
			'Table tennis',
			'Basketball',
			'Padel',
			'Athletics',
			'Badminton',
			'Fitness training',
		];
	}

	@Get("health-check")
	getHealthCheck() {
		return true
	}
}
