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
    imgSrc: "https://placehold.in/600x400?text=Black",
  },
  {
    id: "p2",
    name: "Paw Grip v2 - White",
    description: "Clean look, reliable grip finish.",
    price: 25.0,
    imgSrc: "https://placehold.in/600x400?text=White",
  },
  {
    id: "p3",
    name: "Paw Grip v2 - Orange",
    description: "Soft hue with the same trusted feel.",
    price: 25.0,
    imgSrc: "https://placehold.in/600x400?text=Pink",
  },
  {
    id: "p4",
    name: "Paw Grip v3 - Black",
    description: "Cool tone, steady performance.",
    price: 30.0,
    imgSrc: "https://placehold.in/600x400?text=Blue",
  },
  {
    id: "p5",
    name: "Paw Grip v3 - White",
    description: "Fresh style, consistent traction.",
    price: 30.0,
    imgSrc: "https://placehold.in/600x400?text=Green",
  },
];