/**
 * 009_codewars_style_ranking_system.js
 * https://www.codewars.com/kata/codewars-style-ranking-system/train/javascript
 *
 * @author Tomonori Murakami
 */

/**
 * Write a class called User that is used to calculate the amount that a user will progress through a ranking system similar to the one Codewars uses.
 *
 * Business Rules:
 *
 * A user starts at rank -8 and can progress all the way to 8.
 * There is no 0 (zero) rank. The next rank after -1 is 1.
 * Users will complete activities. These activities also have ranks.
 * Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
 * The progress earned from the completed activity is relative to what the user's current rank is compared to the rank of the activity
 * A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the next level
 * Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8 there is no more progression).
 * A user cannot progress beyond rank 8.
 * The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
 * The progress is scored like so:
 *
 * Completing an activity that is ranked the same as that of the user's will be worth 3 points
 * Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
 * Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
 * Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater the difference between rankings the more the progression will be increased. The formula is 10 * d * d where d equals the difference in ranking between the activity and the user.
 * Logic Examples:
 *
 * If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
 * If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
 * If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
 * If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
 * If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
 * Code Usage Examples:
 *
 * var user = new User()
 * user.rank // => -8
 * user.progress // => 0
 * user.incProgress(-7)
 * user.progress // => 10
 * user.incProgress(-5) // will add 90 progress
 * user.progress # => 0 // progress is now zero
 * user.rank # => -7 // rank was upgraded to -7
 * Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at.
 */

// Solutions.
var ranks = [-8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];
var User = function () {
  this.rank = -8;
  this.progress = 0;
};
User.prototype.incProgress = function (rank) {
  if (ranks.indexOf(rank) != -1) {
    var rankPos = ranks.indexOf(this.rank);
    if (ranks[ranks.length - 1] == this.rank) return;
    var progressPos = ranks.indexOf(rank);
    var gap = progressPos - rankPos;
    switch (gap) {
    case -1:
      this.progress += 1;
      break;
    case 0:
      this.progress += 3;
      break;
    default:
      if (gap > -2) {
        this.progress += (gap * gap * 10);
      }
      break;
    }
    var rankup = Math.floor(this.progress / 100);
    var newRankPos = rankPos + rankup;
    if (ranks.length - 1 <= newRankPos) {
      newRankPos = ranks.length - 1;
      this.progress = 0;
    } else {
      this.progress = this.progress - (rankup * 100);
    }
    this.rank = ranks[newRankPos];
  } else {
    throw new Error(rank + " is not in range");
  }
};


// Tests.
var user = new User();
user.rank; // => -8
user.progress; // => 0
user.incProgress(-7);
user.progress; // => 10
user.incProgress(-5); // will add 90 progress
user.progress; //# => 0 // progress is now zero
user.rank; //# => -7 // rank was upgraded to -7
