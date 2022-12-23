import { Injectable } from '@nestjs/common';
import { Recommendation } from './recommendation';
import data from './data/sports.js';
import * as ContentBasedRecommender from 'content-based-recommender';

@Injectable()
export class AppService {
	private recommender: ContentBasedRecommender;

	constructor() {
		this.recommender = new ContentBasedRecommender({
			minScore: 0.0,
			maxSimilarDocuments: 100,
		});
		this.recommender.train(data);
	}

	getRecommendations(sports: string[]): Recommendation[] {
		let recommendedSports = [];
		sports.forEach((s) => {
			const st = s.split(' ').sort().join(' ');
			recommendedSports = recommendedSports.concat(
				this.recommender.getSimilarDocuments(st, 0, 10),
			);
		});

		console.log("Doc:", JSON.stringify(recommendedSports))

		// 1. Sort on score (DESC)
		// 2. Remove sports that are preferences of the user
		// 3. Remove duplicate sports (keep highest score of sport)
		// 4. Only keep the first 5 recommendations
		// 5. Map each object to a Recommendation class
		return recommendedSports
			.sort((x, y) => y.score - x.score)
			.filter((v) => !sports.includes(v.id))
			.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
			.slice(0, 5)
			.map((doc) => {
				return new Recommendation(
					doc.id,
					(Math.PI - Math.acos(doc.score)) * 100 / Math.PI
				)
			});
	}
}
