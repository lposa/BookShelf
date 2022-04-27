const trophies = [
  {
    name: 'Reviewer',
    task: 'Review 5 different items',
    earned: true,
    type: 'bronze',
    img: require('../assets/bronze.png'),
    points: '100',
  },
  {
    name: 'Think like me?',
    task: 'Match with someone for the first time',
    earned: true,
    type: 'gold',
    img: require('../assets/gold.png'),
    points: '300',
  },
  {
    name: 'Collector (haha nope)',
    task: 'Add 5 items to your shelf',
    earned: true,
    type: 'silver',
    img: require('../assets/silver.png'),
    points: '200',
  },
  {
    name: 'Collector (almost)',
    task: 'Add 25 items to your shelf',
    earned: false,
    type: 'silver',
    img: require('../assets/silver.png'),
    points: '200',
  },
];

exports.trophies = trophies;
