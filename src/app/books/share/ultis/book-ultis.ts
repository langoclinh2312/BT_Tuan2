import { Rating } from "../models/book";

export class BookUtils {
    static formatPrice(price: number): string {
        // Implement logic to format the price (e.g., add currency symbol)
        return `$${price.toFixed(2)}`;
    }

    static calculateAverageRating(ratings: Rating[]): number {
        if (ratings.length === 0) {
        return 0;
        }

        const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
        return totalScore / ratings.length;
    }

    static isBookAvailable(quantity: number): boolean {
        return quantity > 0;
    }
}
  

  