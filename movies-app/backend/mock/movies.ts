import { randomUUID } from 'crypto';
import { IMovieEntity } from 'src/movies/entities/movie.entity';

const movies: Omit<IMovieEntity, 'id'>[] = [
  {
    title: 'Cruella',
    comments: [],
    posterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiMh8qNJzHeSrPDyK09MYfeB7dCfERSb7P1AHmvW-&s',
    youtubeId: 'gmRKv7n2If8',
    ratings: [],
    description:
      'In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs. She befriends a pair of young thieves who appreciate her appetite for mischief, and together they are able to build a life for themselves on the London streets. One day, Estella’s flair for fashion catches the eye of the Baroness von Hellman, a fashion legend who is devastatingly chic and terrifyingly haute. But their relationship sets in motion a course of events and revelations that will cause Estella to embrace her wicked side and become the raucous, fashionable and revenge-bent Cruella.',
  },
  {
    title: 'The Unholy',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZjlhNjU0MzEtOWI0ZC00MDgwLWE3ZTEtZDM3ZWJkNTQ4MzEwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    youtubeId: 'NmQiJPLYzPI',
    ratings: [],
    description:
      'Alice, a young hearing-impaired girl who, after a supposed visitation from the Virgin Mary, is inexplicably able to hear, speak and heal the sick. As word spreads and people from near and far flock to witness her miracles, a disgraced journalist hoping to revive his career visits the small New England town to investigate. When terrifying events begin to happen all around, he starts to question if these phenomena are the works of the Virgin Mary or something much more sinister.',
  },
  {
    title: 'Army of the Dead',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNGY0NzgzYzctYWQwMC00MzM2LThjNGMtZjFjMWUyNzg0ZmM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    youtubeId: 'tI1JGPhYBS8',
    ratings: [],
    description:
      'Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble: venturing into the quarantine zone to pull off the greatest heist ever attempted.',
  },
  {
    title: 'Wrath of Man',
    comments: [],
    posterUrl:
      'https://cdn.shopify.com/s/files/1/0747/3829/products/mL5308_1024x1024.jpg?v=1620815131',
    youtubeId: 'EFYEni2gsK0',
    ratings: [],
    description:
      "A cold and mysterious new security guard for a Los Angeles cash truck company surprises his co-workers when he unleashes precision skills during a heist. The crew is left wondering who he is and where he came from. Soon, the marksman's ultimate motive becomes clear as he takes dramatic and irrevocable steps to settle a score.",
  },
  {
    title: 'Mortal Kombat',
    comments: [],
    posterUrl:
      'https://static.posters.cz/image/750/posters/mortal-kombat-cover-i11058.jpg',
    youtubeId: 'NYH2sLid0Zc',
    ratings: [],
    description:
      "Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.",
  },
  {
    title: 'I Am All Girls',
    comments: [],
    posterUrl:
      'https://www.themoviedb.org/t/p/original/t29EMK5ucDWZSLWqq7Qhbd5MTwl.jpg',
    youtubeId: 'zMPS9JO0p6w',
    ratings: [],
    description:
      'A special crimes investigator forms an unlikely bond with a serial killer to bring down a global child sex trafficking syndicate.',
  },
  {
    title: "Tom Clancy's Without Remorse",
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNzcwYTUxYzctYTQ5My00YzY5LTk3YzItOTliMzRiOTZlMGI3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
    youtubeId: 'e-rw2cxFVLg',
    ratings: [],
    description:
      'An elite Navy SEAL uncovers an international conspiracy while seeking justice for the murder of his pregnant wife.',
  },
  {
    title: 'Godzilla vs. Kong',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMzk2ZmYxNTUtODlhMi00NzE2LTkwMTctYjg0ODQ1ZjkyNzJmXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg',
    youtubeId: 'odM92ap8_c0',
    ratings: [],
    description:
      'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
  },
  {
    title: 'Those Who Wish Me Dead',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDAxMmQ0NTAtNDllNC00ZjE2LTlkNjUtMmExNmY0MmNkMDQ0XkEyXkFqcGdeQXVyNzYyOTM1ODI@._V1_.jpg',
    youtubeId: 'kciXOTguPCs',
    ratings: [],
    description:
      'A young boy finds himself pursued by two assassins in the Montana wilderness with a survival expert determined to protecting him - and a forest fire threatening to consume them all.',
  },
  {
    title: 'The Virtuoso',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNjQ3NjkyNGMtMmVkZS00ZGQ0LTgyMjgtNmY1YTAzN2NlM2EzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg',
    youtubeId: 'fUw8adePeDY',
    ratings: [],
    description:
      "A lonesome stranger with nerves of steel must track down and kill a rogue hitman to satisfy an outstanding debt. But the only information he's been given is a time and location where to find his quarry. No name. No description. Nothing.",
  },
  {
    title: 'Nobody',
    comments: [],
    posterUrl: 'https://m.media-amazon.com/images/I/71J878ENi0S.jpg',
    youtubeId: 'wZti8QKBWPo',
    ratings: [],
    description:
      'Hutch Mansell, a suburban dad, overlooked husband, nothing neighbor — a "nobody." When two thieves break into his home one night, Hutch\'s unknown long-simmering rage is ignited and propels him on a brutal path that will uncover dark secrets he fought to leave behind.',
  },
  {
    title: 'Friends: The Reunion',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BODI0MzdhODAtNDMwNi00NGZlLTg1Y2YtN2M5ZGFmOThkZGM3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    youtubeId: 'LTpmw0Ac6Zs',
    ratings: [],
    description:
      'The cast of Friends reunites for a once-in-a-lifetime celebration of the hit series, an unforgettable evening filled with iconic memories, uncontrollable laughter, happy tears, and special guests.',
  },
  {
    title: 'Vanquish',
    comments: [],
    posterUrl:
      'https://cdn.traileraddict.com/content/lionsgate/vanquish-poster.jpg',
    youtubeId: 'fUElfp3DJ5Y',
    ratings: [],
    description:
      'Victoria is a young mother trying to put her dark past as a Russian drug courier behind her, but retired cop Damon forces Victoria to do his bidding by holding her daughter hostage. Now, Victoria must use guns, guts and a motorcycle to take out a series of violent gangsters—or she may never see her child again.',
  },
  {
    title: 'Ferry',
    comments: [],
    posterUrl: 'https://pics.filmaffinity.com/Ferry-229452109-large.jpg',
    youtubeId: 'MG6U7gduIwA',
    ratings: [],
    description:
      'Before he built a drug empire, Ferry Bouman returns to his hometown on a revenge mission that finds his loyalty tested — and a love that alters his life.',
  },
  {
    title: 'A Quiet Place Part II',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTE2ODU4NDEtNmRjNS00OTk1LTg4NmMtNTAzYzVlNzJmYjgzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    youtubeId: 'BpdDN9d9Jio',
    ratings: [],
    description:
      'Following the events at home, the Abbott family now face the terrors of the outside world. Forced to venture into the unknown, they realize that the creatures that hunt by sound are not the only threats that lurk beyond the sand path.',
  },
  {
    title: 'Monster Pets: A Hotel Transylvania Short',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZjJjOTc4MDMtYWQ0My00ZTNjLWJiMDgtN2M5NDc1MzljMTZhXkEyXkFqcGdeQXVyMTE5MTkxMDI2._V1_FMjpg_UX1000_.jpg',
    youtubeId: 'zZqPA6GfIqQ',
    ratings: [],
    description:
      'Drac tries out some new monster pets to help occupy Tinkles for playtime.',
  },
  {
    title: 'Miraculous World : Shanghai, la légende de Ladydragon',
    comments: [],
    posterUrl:
      'https://www.themoviedb.org/t/p/w500/qQ0VKsGRQ2ofAmswGNzZnvC1xPE.jpg    ',
    youtubeId: 'IQ99Wi5hAxA',
    ratings: [],
    description:
      'On school break, Marinette heads to Shanghai to meet Adrien. But after arriving, Marinette loses all her stuff, including the Miraculous that allows her to turn into Ladybug!',
  },
  {
    title: 'Raya and the Last Dragon',
    comments: [],
    posterUrl:
      'https://static.posters.cz/image/750/posters/raya-and-the-last-dragon-sunset-i103393.jpg',
    youtubeId: '1VIZ89FEjYI',
    ratings: [],
    description:
      'Long ago, in the fantasy world of Kumandra, humans and dragons lived together in harmony. But when an evil force threatened the land, the dragons sacrificed themselves to save humanity. Now, 500 years later, that same evil has returned and it’s up to a lone warrior, Raya, to track down the legendary last dragon to restore the fractured land and its divided people.',
  },
  {
    title: 'OBkyk54X_xg',
    comments: [],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BODI2Y2FkNTAtYTUyMC00MWFhLTg5YzYtNjIwYmY0NmJlMDI3XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg',
    youtubeId: 'OBkyk54X_xg',
    ratings: [],
    description:
      'A former intelligence agent gets involved with the first human clone, Seo Bok, who others seek, causing trouble.',
  },
];

export default movies.map((movie) => ({
  id: randomUUID(),
  ...movie,
})) as IMovieEntity[];
