import Vacation from "../models/Vacation";

export const vacations = [
    new Vacation(76, "Amazing views of budapest, with fair prices and gr...",
        "Hungary, Budapest", "budapest.jpg", "2022-12-30", "2023-01-06", 9000, 1),
    new Vacation(77,
        "A great little island in greece where you can enjo...",
        "Greece, Kos", "greece.jpg",
        "2022-12-24", "2023-01-03", 5000, 2),
    new Vacation(78, "Seeing the breath taking views of Peru, eating som...",
        "Peru, Machu Pichu", "peru.jpg"
        , "2023-02-01",
        "2023-02-11"
        , 16000,
        4),
    new Vacation(79, "Never ending horizons, beautiful trails and lakes,...",
        "California, Yosemite", "california.jpg",
        "2023-01-26", "2023-02-04", 19000, 2),
    new Vacation(80, "Great food, clean street, truly incredible views a...",
        "Japan, Tokyo", "tokyo.jpg",
        "2023-03-23", "2023-03-30", 15600, 3),
];