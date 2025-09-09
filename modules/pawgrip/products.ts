export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Paw Grip v2 - Black",
    description: "Matte texture, firm hold for daily use.",
    price: 25.0,
    imgSrc: "./assets/pawgrips/v2-black.jpeg",
  },
  {
    id: "p2",
    name: "Paw Grip v2 - White",
    description: "Clean look, reliable grip finish.",
    price: 25.0,
    imgSrc: "./assets/pawgrips/v2-white.jpeg",
  },
  {
    id: "p3",
    name: "Paw Grip v2 - Orange",
    description: "Soft hue with the same trusted feel.",
    price: 25.0,
    imgSrc: "./assets/pawgrips/v2-orange.jpeg",
  },
  {
    id: "p4",
    name: "Paw Grip v3 - Black",
    description: "Cool tone, steady performance.",
    price: 30.0,
    imgSrc: "./assets/pawgrips/v3-black.jpeg",
  },
  {
    id: "p5",
    name: "Paw Grip v3 - White",
    description: "Fresh style, consistent traction.",
    price: 30.0,
    imgSrc: "./assets/pawgrips/v3-white.jpeg",
  },
];
